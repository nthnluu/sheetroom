import React, {useContext, useEffect, useState} from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";
import AssignmentViewerContext from "../AssignmentViewerContext";


function AnswerChoice({selected, onClick, value, radioName, choice}) {
    const [focused, setFocus] = useState(false);
    const {document} = useContext(AssignmentViewerContext)
    const currentChoice = document.answer_objects[choice]
    const inputId = 'input-' + choice
    const labelId = 'label-' + choice


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <div className="-ml-3">
            <input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={choice}
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0" onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={labelId} htmlFor={inputId} onClick={() => onClick()} tabIndex={-1}
                   className={selected ? 'card selectedCard cursor-pointer' : 'card unselectedCard cursor-pointer ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>
        </div>
    )

}


export default function ({item}) {
    const {document} = useContext(AssignmentViewerContext)
    const currentItem = document.items[item]
    const [selected, setSelected] = useState();
    const radioName = currentItem.id;




    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {currentItem.answer_objects.map((choice, index) => <AnswerChoice choice={choice} selected={selected === choice} onClick={() => setSelected(choice)} radioName={item}/>)}
                </fieldset>
            </form>
        </>

    )

}
