import React, {useEffect, useState} from "react";


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
                <span className="table-cell pl-2 w-full"></span>
            </label>
        </>
    )

}


const ChoiceItems = ({shuffled, choices}) => {
    const [items, setItems] = useState(choices);
    useEffect(() => {
        if (shuffled) {
            setItems(shuffle(choices))
        }
    }, [choices, shuffled]);
    return items
};

export default function ({choices, questionId}) {
    const [selected, setSelected] = useState();
    const radioName = questionId;

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
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {choices.map((choice, index) => <AnswerChoice selected={selected === choice.id} onClick={() => setSelected(choice.id)}
                                                                              text={choice.content} radioName={radioName} questionId={questionId} index={index}/>)}
                </fieldset>
            </form>
        </>

    )

}
