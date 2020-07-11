import React, {useEffect, useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_CHOICE_CONTENT} from "../../../gql/assignmentAutosave";
import gql from "graphql-tag";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardFrame from "../CardFrame";

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

function AnswerChoice({selected, onClick, text, radioName, questionId, index, active, content, choiceId, setSaveStatus}) {
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
            {/*<input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"*/}
            {/*       defaultChecked={selected} name={radioName} value={text} onClick={()=>console.log('hi')}*/}
            {/*       className="absolute mt-6 ml-5 opacity-75" onFocus={() => setFocus(true)}*/}
            {/*        onBlur={() => setFocus(false)}/>*/}
            <div id={labelId} htmlFor={inputId}
                 className={selected ? 'editor-card editor-selectedCard cursor-pointer ' : 'pointer-events-none editor-card editor-unselectedCard ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full pointer-events-auto"><RichTextField active={active}
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
            </div>
        </>
    )

}

function ProvisionalAnswerChoice({selected, onClick, text, radioName, questionId, index, active, content, itemId, setSaveStatus, choicesLength}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;
    const [createAnswerChoice, {choiceData}] = useMutation(NEW_ANSWER_CHOICE);


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            {/*<input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"*/}
            {/*       defaultChecked={selected} name={radioName} value={text} onClick={()=>console.log('hi')}*/}
            {/*       className="absolute mt-6 ml-5 opacity-75" onFocus={() => setFocus(true)}*/}
            {/*        onBlur={() => setFocus(false)}/>*/}
            <div id={labelId} htmlFor={inputId}
                 className={selected ? 'editor-card editor-selectedCard cursor-pointer ' : 'pointer-events-none editor-card editor-unselectedCard ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full pointer-events-auto"><RichTextField active={active}
                                                                                            initialContent={content}
                                                                                            onBlurEvent={(value) => {
                                                                                                setSaveStatus(1);
                                                                                                createAnswerChoice({
                                                                                                    variables: {
                                                                                                        itemId: itemId,
                                                                                                        isCorrect: false,
                                                                                                        index: choicesLength,
                                                                                                        content: value
                                                                                                    }
                                                                                                })
                                                                                                    .then(() => setSaveStatus(0))
                                                                                                    .catch(error => {
                                                                                                        console.log(error);
                                                                                                        setSaveStatus(2)
                                                                                                    })

                                                                                            }}/></span>
            </div>
        </>
    )

}

function Grid({choices, questionId}) {
    const [selected, setSelected] = useState();
    const radioName = questionId;

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {choices.map((choice, index) => <AnswerChoice index={index} selected={selected === choice.id}
                                                                  questionId={questionId}
                                                                  choideId={choice.id}
                                                                  onClick={() => setSelected(choice.id)} key={choice.id}
                                                                  text={choice.content} radioName={radioName}/>)}
                </fieldset>
            </form>
        </>

    )

}

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
            <div className="mt-4 w-full space-y-2 sm:space-y-0 sm:space-x-2 z-0">
                <NewButton label="Text"/>
                <NewButton label="Math"/>
                <NewButton label="All of the above"/>
                <NewButton label="None of the above"/>
            </div>
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
        console.log(newItems);
    };

    useEffect(() => {
        setAnswerChoices(choices);
    }, [choices]);

    return (
        <>
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppaasdble">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {answerChoices ? answerChoices.map((choice, index) => (
                                    <Draggable key={choice.id} draggableId={choice.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                                 {...provided.draggableProps}>
                                                <div className="flex justify-between">
                                                    {(active && answerChoices.length > 1) ? <i {...provided.dragHandleProps}
                                                                 className="fas fa-grip-lines absolute -ml-10 text-gray-300 w-12 text-center active:text-blue-500 transition-all duration-100"/> : null}
                                                    <AnswerChoice choiceId={choice.id} active={active}
                                                                  setSaveStatus={status => setSaveStatus(status)}
                                                                  key={choice.id}
                                                                  content={choice.content}
                                                                  selected={choice.is_correct}/>
                                                </div>
                                            </div>

                                        )}
                                    </Draggable>
                                )) : null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
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
