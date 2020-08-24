import React, {useState} from "react";

function AnswerChoice({title, desc, onClick, radioName, selected, value}) {
    const [focused, setFocus] = useState(false);

    const inputId = 'input-' + radioName;
    const labelId = 'label-' + radioName;


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
                   className={(selected ? 'card selectedCard cursor-pointer' : 'card unselectedCard cursor-pointer ') + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full"><h3 className="font-semibold text-lg">{title}</h3>
                <p className={"text-sm " + (selected ? "text-blue-600" : "text-gray-500")}>{desc}</p></span>
            </label>
        </>
    )

}



export default function StepOneRadioGroup ({onChange, value}) {

    return (
        <>
            <div>
                <fieldset className="pt-2" role="radiogroup">
                    <AnswerChoice radioName="welcome1" onClick={() => onChange("student")} value={"student"} selected={value === "student"} title="Student" desc="I plan on joining classes and submitting assignments."/>
                    <AnswerChoice radioName="welcome2" onClick={() => onChange("teacher")}  value={"teacher"} selected={value === "teacher"} title="Teacher" desc="I plan on writing assignments and managing classes."/>
                    <AnswerChoice radioName="welcome3" onClick={() => onChange("both")}  value={"both"} selected={value === "both"} title="Both" desc="I plan on doing all of the above."/>
                </fieldset>
            </div>
        </>

    )

}
