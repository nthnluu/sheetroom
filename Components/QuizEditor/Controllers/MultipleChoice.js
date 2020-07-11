import React, {useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_CHOICE_CONTENT} from "../../../gql/assignmentAutosave";

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
                <span className="table-cell pl-2 w-full pointer-events-auto"><RichTextField active={active} initialContent={content} onBlurEvent={(value) => {
                    if (value != content) {
                        setSaveStatus(1);
                        updateItem({variables: {pk: choiceId, content: value}})
                            .then((result) =>setSaveStatus(0))
                            .catch(error => setSaveStatus(2));
                    }}}/></span>
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

export const MultipleChoiceController = ({isSelected, active, choices, setSaveStatus}) => {
    return (
        <div className="spacing-y-4">
            {choices.map(choice =>  <AnswerChoice choiceId={choice.id} active={active} setSaveStatus={status => setSaveStatus(status)} key={choice.id} content={choice.content} selected={choice.is_correct}/>)}
        </div>

    )
};

export default MultipleChoiceController
