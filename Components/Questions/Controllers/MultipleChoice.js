import React, {useRef, useState} from "react";

function AnswerChoice({selected, onClick, text, radioName, questionId, index}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {
            return;
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
                <span className="table-cell pl-2 w-full">{text}</span>
            </label>
        </>
    )

}


export default function ({choices, questionId, response}) {
    const [selected, setSelected] = useState(response);
    const radioName = questionId;

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {choices.map((choice, index) => <AnswerChoice index={index} selected={selected === choice}
                                                                  questionId={questionId}
                                                                  onClick={() => setSelected(choice)} key={index}
                                                                  text={choice} radioName={radioName}/>)}
                </fieldset>
            </form>
        </>

    )

}
