import React, {useEffect, useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_NEW_CHOICE, UPDATE_CHOICE_CONTENT} from "../../../gql/assignmentAutosave";
import gql from "graphql-tag";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

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

const UPSERT_CHOICE_CONTENT = gql`
mutation UpsertChoiceContent($itemId: uuid!, $content: json!, $choiceId: uuid!, $index: Int!, $isCorrect: Boolean!) {
  insert_assignments_answer_choice(on_conflict: {constraint: answer_choice_pkey, update_columns: [content, index]}, objects: {item: $itemId, content: $content, id: $choiceId, index: $index, is_correct: $isCorrect}) {
    affected_rows
  }
}
`;

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


const saveOpts = (choices) => ({
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

export const MultipleChoiceController = ({isSelected, active, choices, setSaveStatus, itemId}) => {
    const [answerChoices, setAnswerChoices] = useState(choices);
    const [updateChoice, {updatedChoiceData}] = useMutation(UPSERT_CHOICE_CONTENT);
    useEffect(() => {
        // Update the document title using the browser API
        // setAnswerChoices(choices);

        const newAnswerChoices = answerChoices;
        choices.forEach(choice => {
            const found = answerChoices.findIndex(element => element.id === choice.id);
            if (found === -1) {
                //choice didnt previously exist, add it
                newAnswerChoices.push(choice);
            } else {
                newAnswerChoices.splice(found, 1, choice);
            }
        });
        setAnswerChoices([...newAnswerChoices]);


    }, [choices]);

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
        fetch(url, saveOpts(newItems))
            .then(res => console.log(res))
            .then(() => setSaveStatus(0))
            .catch(() => console.log(error))
            .catch(() => setSaveStatus(2));
    };

    const refreshState = (value, choice, index) => {
        if (value === choice.content || value === null || JSON.stringify(value) === '[{"children":[{"text":""}],"type":"paragraph"}]') {
            return;
        } else {
            setSaveStatus(1);
            let newArray = answerChoices;
            newArray.splice(choice.index, 1, {
                "id": choice.id,
                "is_correct": choice.is_correct,
                "index": index,
                "content": value,
                "item": choice.item
            });
            setAnswerChoices([...newArray]);
            updateChoice({variables: {itemId: choice.item, content: value, choiceId: choice.id, index: index, isCorrect: choice.is_correct}})
                .then(() => setSaveStatus(0))
                .catch(error => console.log(error))
                .catch(() => setSaveStatus(2));
        }
    };


    return (
        <>
            {active ? <div key={itemId}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={"edfweofweofinwef11"}>
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
                                                className={"group mb-4 " + (snapshot.isDragging ? "my-0 opacity-75" : null)}
                                                ref={provided.innerRef}  {...provided.draggableProps}>
                                                <AnswerChoice choiceId={choice.id} active={active}
                                                              answerChoices={answerChoices}
                                                              questionId={itemId}
                                                              onBlurHandler={(value) => refreshState(value, choice, index)}
                                                              index={choice.index}
                                                              setSaveStatus={status => setSaveStatus(status)}
                                                              key={choice.id}
                                                              content={choice.content}
                                                              selected={choice.is_correct}
                                                              dragHandler={<i {...provided.dragHandleProps}
                                                                              className={(answerChoices.length > 1) ? ("fas fa-grip-lines text-center py-4 invisible group-hover:visible" + (choice.is_correct ? " active:text-blue-700 focus:text-blue-500 hover:text-blue-500 text-blue-600" : " active:text-blue-400 text-gray-300")) : "invisible"}/>}
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
                <div className="space-x-2">
                    <button type="button" onClick={() => {
                        const newOption = {"id":uuidv4(),"item":itemId,"is_correct":(answerChoices.length <= 0),"index":answerChoices.length,"content":[{"children":[{"text":""}],"type":"paragraph"}],"__typename":"assignments_answer_choice"};
                        setAnswerChoices([...answerChoices, newOption]);
                    }}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        Add option
                    </button>
                </div>
            </div> : <div className="space-y-4">
                {answerChoices.map((choice, index) => <AnswerChoice choiceId={choice.id} active={false}
                                                                    setSaveStatus={status => setSaveStatus(status)}
                                                                    key={choice.id + "_inactive"}
                                                                    content={choice.content}
                                                                    selected={choice.is_correct}/>)}
            </div>}
        </>

    )
};

export default MultipleChoiceController
