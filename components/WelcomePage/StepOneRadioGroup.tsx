import React, {useEffect, useMemo, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';

    const AnswerChoice:React.FC<{title: string; desc: string; onClick: any; radioName: string; selected: any; value: number;}> = ({title, desc, onClick, radioName, selected, value}) => {
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
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0 sr-only" onFocus={() => setFocus(true)}
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



    const StepOneRadioGroup = () => {
    const [selected, setSelected] = useState(null);

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(1)} value={1} selected={selected === 1} title="Student" desc="I plan on joining classes and submitting assignments."/>
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(2)}  value={2} selected={selected === 2} title="Teacher" desc="I plan on writing assignments and managing classes."/>
                    <AnswerChoice radioName="welcome1" onClick={() => setSelected(3)}  value={3} selected={selected === 3} title="Both" desc="I plan on doing all of the above."/>
                </fieldset>
            </form>
        </>

    )

}

export default StepOneRadioGroup;