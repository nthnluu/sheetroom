import React, {useEffect, useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_CHOICE_CONTENT} from "../../../gql/assignmentAutosave";
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

function AnswerChoice({selected, onClick, text, radioName, questionId, index, active, content, choiceId, setSaveStatus, answerChoices, editable, dragHandler}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;
    const [updateItem, {choiceData}] = useMutation(UPDATE_CHOICE_CONTENT);


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
                 onFocus={() => console.log('focus')} onBlur={() => console.log('blur')}
            >
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full pointer-events-auto"><RichTextField uniqueId={choiceId}
                                                                                            active={active}
                                                                                            initialContent={content}
                                                                                            onBlurEvent={(value) => {
                                                                                                if (value != content) {
                                                                                                    setSaveStatus(1);
                                                                                                    updateItem({
                                                                                                        variables: {
                                                                                                            pk: choiceId,
                                                                                                            content: value
                                                                                                        }
                                                                                                    })
                                                                                                        .then((result) => setSaveStatus(0))
                                                                                                        .catch(error => setSaveStatus(2));
                                                                                                }
                                                                                            }}/></span>
                {dragHandler}
            </div>

        </>
    )

};


const AddNewQuestion = ({itemId, choicesLength, setSaveStatus, setProvisionalChoice}) => {

    const [createAnswerChoice, {choiceData}] = useMutation(NEW_ANSWER_CHOICE);
    const NewButton = ({label}) => {
        const [isLoading, toggleLoading] = useState(false);


        return (<button type="button" onClick={() => {
            setSaveStatus(1);
            console.log(choiceData);

            createAnswerChoice({variables: {itemId: itemId, isCorrect: false, index: choicesLength}})
                .then(() => setSaveStatus(0))
        }}
                        className="inline-flex relative w-full sm:w-auto items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
            {label}
        </button>)
    }

    return (
        <>
            {/*<div className="mt-4 w-full space-y-2 sm:space-y-0 sm:space-x-2 z-0">*/}
            {/*    <NewButton label="Text"/>*/}
            {/*    <NewButton label="Math"/>*/}
            {/*    <NewButton label="All of the above"/>*/}
            {/*    <NewButton label="None of the above"/>*/}
            {/*</div>*/}
        </>)
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


export const MultipleChoiceController = ({isSelected, active, choices, setSaveStatus, itemId}) => {
    const [answerChoices, setAnswerChoices] = useState(choices);

    useEffect(() => {
        setAnswerChoices(choices);
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
        fetch(url, opts(newItems))
            .then(res => console.log(res))
            .then(() => setSaveStatus(0))
            .catch(() => console.log(error))
            .catch(() => setSaveStatus(2));
    };


    return (
        <>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppaasdble">
                        {(dropProvided, dropSnapshot) => (
                            <div
                                {...dropProvided.droppableProps}
                                ref={dropProvided.innerRef}
                                className="w-full"
                            >
                                {answerChoices ? answerChoices.map((choice, index) => (
                                    <Draggable key={choice.id} draggableId={choice.id} index={choice.index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={"flex justify-between mb-4 " + (snapshot.isDragging ? "my-0" : null)}
                                                ref={provided.innerRef}  {...provided.draggableProps}>
                                                <AnswerChoice choiceId={choice.id} active={active}
                                                              answerChoices={answerChoices}
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


            <div className="spacing-y-4">
                {/*{answerChoices.map(choice => <AnswerChoice choiceId={choice.id} active={active}*/}
                {/*                                           setSaveStatus={status => setSaveStatus(status)}*/}
                {/*                                           key={choice.id}*/}
                {/*                                           content={choice.content} selected={choice.is_correct}/>)}*/}
            </div>
            {active ? <AddNewQuestion setChoices={newValue => setAnswerChoices(value)} itemId={itemId}
                                      setSaveStatus={status => setSaveStatus(status)}
                                      choicesLength={choices.length}/> : null}
        </>

    )
};

export default MultipleChoiceController
