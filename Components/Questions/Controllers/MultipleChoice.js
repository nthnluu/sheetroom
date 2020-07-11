import React, {useRef, useState} from "react";
import {ReadOnlyEditor} from "../../Editor/SlateEditor";

function AnswerChoice({selected, onClick, text, radioName, questionId, index}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            <input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={text}
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0" onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={labelId} htmlFor={inputId} onClick={() => onClick()}
                   className={selected ? 'card selectedCard cursor-pointer' : 'card unselectedCard cursor-pointer ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full"><ReadOnlyEditor content={text}/></span>
            </label>
        </>
    )

}


export default function ({choices, questionId}) {
    const [selected, setSelected] = useState();
    const radioName = questionId;

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {choices.map((choice, index) => (choice.content != null && JSON.stringify(choice.content) !== `[{"children":[{"text":""}],"type":"paragraph"}]`) ? <AnswerChoice index={index} selected={selected === choice.id}
                                                                  questionId={questionId}
                                                                  onClick={() => setSelected(choice.id)} key={choice.id}
                                                                  text={choice.content} radioName={radioName}/> : null)}
                </fieldset>
            </form>
        </>

    )

}
