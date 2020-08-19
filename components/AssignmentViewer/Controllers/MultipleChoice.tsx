import React, {useContext, useEffect, useMemo, useState} from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";
import AssignmentViewerContext from "../AssignmentViewerContext";
import {nanoid} from "nanoid";
import update from "immutability-helper";


const AnswerChoice: React.FC<{selected: boolean; onClick: any; radioName: string; choice: string; item: string;}> = ({selected, onClick, radioName, choice, item}) => {
    const [focused, setFocus] = useState(false);
    const {document} = useContext(AssignmentViewerContext)
    const currentChoice = document.answer_objects[choice]
    const uniqueId = useMemo(() => ({input: nanoid(5), label: nanoid(4)}), []);

    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <div className="-ml-3">
            <input id={uniqueId.input} aria-labelledby={uniqueId.label} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={choice}
                   onClick={onClick} className="absolute mt-6 ml-5 opacity-0"
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={uniqueId.label} htmlFor={uniqueId.input} onClick={() => onClick()}
                   className={selected ? 'card selectedCard cursor-pointer ' : 'card unselectedCard cursor-pointer ' + checkFocus()} tabIndex={-1}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>
        </div>
    )

}


export default function ({item}) {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const currentItem = document.items[item]
    const selected = document.items[item].student_input

    const setConfigValue = (value) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {
                            student_input: {
                                $splice: [[0, 1, value]]
                            }
                        }
                    }
                }
            )
            return newData
        })
    }


    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {currentItem.answer_objects.map((choice, index) => <AnswerChoice key={choice} choice={choice} selected={selected.includes(choice)} item={item} onClick={() => setConfigValue(choice)} radioName={currentItem.id}/>)}
                </fieldset>
            </form>
        </>

    )

}
