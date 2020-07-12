import React, {useEffect, useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_NEW_CHOICE, UPDATE_CHOICE_CONTENT} from "../../../gql/assignmentAutosave";
import gql from "graphql-tag";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const NEW_ANSWER_CHOICE = gql`
 mutation CreateNewAnswerChoice($itemId: uuid!, $isCorrect: Boolean!, $index: Int!, $content: json!) {
  insert_assignments_answer_choice(objects: {item: $itemId, is_correct: $isCorrect, index: $index, content: $content}) {
    returning {
      id
      is_correct
      content
    }
  }
}
`;

const mutationSaveChoices = (choices) => {
    const mutations = choices.map((choice, index) => `choice${index}: update_assignments_answer_choice_by_pk(pk_columns: {id: "${choice.id}"}, _set: {index: ${index}}) {
    index
  }`);

    const newMutation = `mutation {
     ${mutations.join(" ")}
  }
`;
    return newMutation
};

const mutationSaveNewChoicesOrder = (choices) => {
    const mutations = choices.map((choice, index) => `choice${index}: update_assignments_answer_choice_by_pk(pk_columns: {id: "${choice.id}"}, _set: {index: ${index}}) {
    index
  }`);
    const newMutation = `mutation {
     ${mutations.join(" ")}
  }
`;
    return newMutation
};

const url = "/api/token";
const opts = (choices) => ({
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({query: mutationSaveNewChoicesOrder(choices)}),
});

function AnswerChoice({selected, onBlurHandler, isNew, text, radioName, questionId, index, active, content, choiceId, setSaveStatus, editable, dragHandler}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;
    const [updateItem, {choiceData}] = useMutation(UPDATE_CHOICE_CONTENT);
    const [isVisible, setIsVisible] = useState(true);


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={selected ? 'editor-card editor-selectedCard cursor-pointer flex-grow ' : 'flex-grow editor-card bg-white editor-unselectedCard ' + checkFocus()}
            >
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full pointer-events-auto">
                    <RichTextField uniqueId={choiceId} active={active} initialContent={content}
                                   onBlurEvent={(value) => onBlurHandler(value)}/></span>
                {dragHandler}
            </div>
        </>
    )

};


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const Display = ({text}) => {
    return <p>{JSON.stringify(text)}</p>
};

export const MultipleChoiceController = ({isSelected, active, choices, setSaveStatus, itemId}) => {
    const [answerChoices, setAnswerChoices] = useState(choices);
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        setSaveStatus(1);
        const newItems = reorder(
            answerChoices,
            result.source.index,
            result.destination.index
        );
        setAnswerChoices(newItems);
        // fetch(url, opts(newItems))
        //     .then(res => console.log(res))
        //     .then(() => setSaveStatus(0))
        //     .catch(() => console.log(error))
        //     .catch(() => setSaveStatus(2));
    };

    useEffect(() => {
        // Update the document title using the browser API
        setAnswerChoices(choices)
    }, [choices]);

    const refreshState = (value, choice) => {
        let newArray = answerChoices;
        newArray.splice(choice.index, 1, {
            "id": choice.id,
            "is_correct": choice.is_correct,
            "index": choice.index,
            "content": value
        });

        setAnswerChoices(newArray);
    };


    return (
        <>
            <p>{JSON.stringify(answerChoices)}</p>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={itemId + "_droppable"}>
                        {(dropProvided, dropSnapshot) => (
                            <div
                                {...dropProvided.droppableProps}
                                ref={dropProvided.innerRef}
                                className="w-full"
                            >
                                {answerChoices ? answerChoices.map((choice, index) => (
                                    <Draggable key={choice.id} draggableId={choice.id}
                                               index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={"flex justify-between mb-4 " + (snapshot.isDragging ? "my-0" : null)}
                                                ref={provided.innerRef}  {...provided.draggableProps}>
                                                <AnswerChoice choiceId={choice.id} active={active}
                                                              answerChoices={answerChoices}
                                                              questionId={itemId}
                                                              onBlurHandler={(value) => refreshState(value, choice)}
                                                              index={choice.index}
                                                              setSaveStatus={status => setSaveStatus(status)}
                                                              key={choice.id}
                                                              content={choice.content}
                                                              selected={choice.is_correct}
                                                              dragHandler={<i {...provided.dragHandleProps}
                                                                              className={(answerChoices.length > 1) ? ("fas fa-grip-lines text-center py-4" + (choice.is_correct ? " active:text-white text-blue-200" : " active:text-blue-400 text-gray-300")) : "invisible"}/>}
                                                />
                                            </div>

                                        )}
                                    </Draggable>
                                )) : null}
                                <div className="w-10">
                                    {dropProvided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div> : <div className="space-y-4">
                {answerChoices.map((choice, index) => <AnswerChoice choiceId={choice.id} active={false}
                                                                    setSaveStatus={status => setSaveStatus(status)}
                                                                    key={choice.id}
                                                                    content={choice.content}
                                                                    selected={choice.is_correct}/>)}
            </div>}
        </>

    )
};

export default MultipleChoiceController
