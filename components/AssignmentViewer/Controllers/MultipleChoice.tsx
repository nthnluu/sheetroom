import React, {useContext, useEffect, useMemo, useState} from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";
import AssignmentViewerContext from "../AssignmentViewerContext";
import {nanoid} from "nanoid";
import update from "immutability-helper";
import NewTooltip from "../../Misc/Tooltip";
import JsonDebugBox from "../../JsonDebugBox";
import shuffleArray from "../../../lib/shuffleArray";



const AnswerChoice: React.FC<{ selected: boolean; onClick: any; radioName: string; choice: string; item: string; }> = ({selected, onClick, radioName, choice, item}) => {
    const [focused, setFocus] = useState(false);
    const {document} = useContext(AssignmentViewerContext)
    const [eliminated, toggleEliminated] = useState(false)
    const currentChoice = document.answer_objects[choice]
    const uniqueId = useMemo(() => ({input: nanoid(5), label: nanoid(4)}), []);

    function checkFocus() {
        if (focused) {
            return ' shadow-outline-blue';
        } else {

        }
    }


    return (
        <div className="-ml-3 flex justify-between items-center">
            <input id={uniqueId.input} aria-labelledby={uniqueId.label} aria-selected={selected} type="radio"
                   defaultChecked={selected} name={radioName} value={choice}
                   onClick={onClick} className="absolute mt-6 ml-5 opacity-0"
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={uniqueId.label} htmlFor={uniqueId.input} onClick={() => {
                toggleEliminated(false);
                onClick()
            }}
                   className={(selected ? 'card selectedCard cursor-pointer ' : (eliminated ? 'card unselectedCard cursor-pointer opacity-25 bg-gray-300 ' : 'card unselectedCard cursor-pointer ')) + checkFocus()}
                   tabIndex={-1}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>

            {selected || eliminated ? null : <NewTooltip title="Eliminate Answer" placement="bottom" enterDelay={500}
                                                         enterNextDelay={500}>
                <button onClick={(event) => {
                    event.preventDefault();
                    toggleEliminated(!eliminated)
                }}
                >
                    <svg
                        className="text-gray-200 h-6 mr-1" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

            </NewTooltip>}
        </div>
    )

}


export default function MultipleChoice({item}) {
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

    const [shuffledArray] = useState(shuffleArray(currentItem.answer_objects))
    const itemsArray = document.items[item].config.shuffle ? shuffledArray : currentItem.answer_objects

    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {itemsArray.map((choice, index) => <AnswerChoice key={choice} choice={choice}
                                                                                     selected={selected.includes(choice)}
                                                                                     item={item}
                                                                                     onClick={() => setConfigValue(choice)}
                                                                                     radioName={currentItem.id}/>)}
                </fieldset>
            </form>
        </>

    )

}
