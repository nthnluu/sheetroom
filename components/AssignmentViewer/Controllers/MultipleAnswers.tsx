import React, {useContext, useMemo, useState} from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";
import AssignmentViewerContext from "../AssignmentViewerContext";
import {nanoid} from "nanoid";
import update from "immutability-helper";
import NewTooltip from "../../Misc/Tooltip";


const AnswerChoice: React.FC<{ selected: boolean; onClickTrue: any; onClickFalse: any; choice: string; item: string; }> = ({selected, onClickTrue, onClickFalse, choice, item}) => {
    const [focused, setFocus] = useState(false);
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const [eliminated, toggleEliminated] = useState(false)
    const currentChoice = document.answer_objects[choice]
    const uniqueId = useMemo(() => ({input: nanoid(5), label: nanoid(4)}), []);

    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        if (selected) {
            onClickFalse()
        } else {
            onClickTrue()
            toggleEliminated(false)
        }

    }


    return (
        <div className="-ml-3 flex justify-between items-center">
            <input id={uniqueId.input} aria-labelledby={uniqueId.label} aria-selected={selected} type="checkbox"
                   checked={selected} value={choice}
                   onClick={handleClick} className="absolute mt-6 ml-5 opacity-0"
                   onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={uniqueId.label} onClick={handleClick}
                   className={(selected ? 'card selectedCard cursor-pointer ' : (eliminated ? 'card unselectedCard cursor-pointer opacity-25 bg-gray-300 ' : 'card unselectedCard cursor-pointer ')) + checkFocus()}
                   tabIndex={-1}>
                {selected ? <i className="fas fa-check-square table-cell"/> : <i className="far fa-square table-cell"/>}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>
            {selected || eliminated ? null : <NewTooltip title="Eliminate Answer" placement="bottom" enterDelay={500}
                                           enterNextDelay={500}><button onClick={(event) => {event.preventDefault(); toggleEliminated(!eliminated)}}
                                                                      ><svg
                className="text-gray-200 h-6 mr-1" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg></button>

            </NewTooltip>}
        </div>
    )

}


export default function MultipleAnswers({item}) {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const currentItem = document.items[item]
    const selected = document.items[item].student_input

    const setAsIncorrect = (value) => {
        setDocument(prevState => {
            const choiceIndex = prevState.items[item].student_input.findIndex(element => element === value)
            const newData = update(prevState, {
                    items: {
                        [item]: {
                            student_input: {
                                $splice: [[choiceIndex, 1]]
                            }
                        }
                    }
                }
            )
            return newData
        })
    }

    const setAsCorrect = (value) => {
        setDocument(prevState => {
            return update(prevState, {
                    items: {
                        [item]: {
                            student_input: {
                                $push: [value]
                            }
                        }
                    }
                }
            )
        })
    }


    return (
        <>
            <form>
                <fieldset className="pt-2" role="radiogroup">
                    <legend className="font-semibold text-gray-800">Select all correct answers:</legend>
                    {currentItem.answer_objects.map((choice, index) => <AnswerChoice key={choice} choice={choice}
                                                                                     selected={selected.includes(choice)}
                                                                                     item={item}
                                                                                     onClickTrue={() => setAsCorrect(choice)}
                                                                                     onClickFalse={() => setAsIncorrect(choice)}
                    />)}
                </fieldset>
            </form>
        </>

    )

}
