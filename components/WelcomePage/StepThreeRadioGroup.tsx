import React, {useEffect, useMemo, useRef, useState} from "react";
import JsonDebugBox from "../JsonDebugBox";
import {v4 as uuidv4} from 'uuid';

function AnswerChoice({title, desc, onClick, radioName, selected, value}) {
    const [focused, setFocus] = useState(false);


    const uniqueId = useMemo(() => uuidv4(), [])
    const inputId = 'input-' + uniqueId;
    const labelId = 'label-' + uniqueId;


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            <input id={inputId} aria-labelledby={labelId} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={value}
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0" onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={labelId} htmlFor={inputId} onClick={() => onClick(value)}
                   className={selected ? 'card selectedCard cursor-pointer' : 'card unselectedCard cursor-pointer ' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full"><h3 className="font-semibold text-lg">{title}</h3>
                <p className={"text-sm " + (selected ? "text-blue-600" : "text-gray-500")}>{desc}</p></span>
            </label>
        </>
    )

}



export default function StepThreeRadioGroup () {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(1)} value={1} selected={selected === 1} title="Email" desc="Receive reminders through the email you signed up with."/>
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(2)}  value={2} selected={selected === 2} title="Text Message" desc="Receive reminders through SMS."/>
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(3)}  value={3} selected={selected === 3} title="None" desc="I don't want to receive notifications."/>
                </fieldset>
            </form>
        </>

    )

}
