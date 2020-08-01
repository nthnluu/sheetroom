import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import {cloneDeep} from "lodash";


const AnswerChoice = ({active, choice, dragHandler, answerIndex, item, isCorrect}) => {
    const {answerObjects, setItems, setAnswerObjects, items} = useContext(QuizContext);


    const saveChoiceContent = (newValue) => {
        setAnswerObjects(prevState => (
            {...prevState, [choice]: {...prevState[choice], content: newValue}})
        )
    }

    const deleteAnswerChoice = () => {
        setItems(prevState => {
            let newArray = [...prevState[item].answer_objects]
            newArray.splice(answerIndex, 1)
            return ({...prevState, [item]: {...prevState[item], answer_objects: newArray}})
        })

        setAnswerObjects(prevState => {
            const newObject = {...prevState}
            delete newObject[choice]
            return newObject
        })
    }

    const markAsCorrect = () => {
        setItems(prevState => ({...prevState, [item]: {...prevState[item], correct_objects: [choice]}}))
    }

    return (
        <>
            <div
                className={isCorrect ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                {active ? <span
                    className={isCorrect ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </span> : null}

                <span className="table-cell w-full">
                    <RichTextField uniqueId={choice} active={active} value={answerObjects[choice].content}
                                   autofocus={active}
                                   onChangeEvent={(value) => saveChoiceContent(value)}/>
                </span>
                <div className="flex justify-between space-x-3">
                    {(active && !isCorrect) ?
                        <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => deleteAnswerChoice()}><i
                                className={((isCorrect) ? "text-blue-600" : "text-gray-300") + " far fa-trash-alt table-cell"}/>
                            </button>
                        </NewTooltip> : null}
                    {isCorrect ? <i className="fas fa-check table-cell"/> : (active ?
                        <NewTooltip title="Set as correct answer" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => markAsCorrect()}><i
                                className="far fa-circle table-cell text-gray-300"/></button>
                        </NewTooltip> : null)}
                </div>

            </div>
        </>
    )

};

export default AnswerChoice;
