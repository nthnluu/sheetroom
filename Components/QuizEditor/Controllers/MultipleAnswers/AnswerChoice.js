import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";


const AnswerChoice = ({active, choice, dragHandler, answerIndex, item, isCorrect}) => {
    const inputId = 'input-' + choice;
    const labelId = 'label-' + choice;
    const {setAnswerObjects, answerObjects, setItems} = useContext(QuizContext);
    const answerChoice = answerObjects[choice]

    const saveChoiceContent = (newValue) => {
        setAnswerObjects(prevState => (
            {...prevState, [choice]: {...prevState[choice], content: newValue}})
        )
    }

    const deleteAnswerChoice = () => {
        console.log('hi')
        setItems(prevState => {
            let newArray = [...prevState[item].answer_objects]
            console.log(newArray)
            newArray.splice(answerIndex, 1)
            return ({...prevState, [item]: {...prevState[item], answer_objects: newArray}})})

        setAnswerObjects(prevState => {
            const newObject = {...prevState}
            delete newObject[choice]
            return newObject
        })
    }

    const markAsCorrect = () => {
        // const newDocument = {...assignment}
        // newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct = !newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct
        // setAssignment(newDocument)
    }

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={answerChoice.is_correct ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                <div className={answerChoice.is_correct ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </div>
                <span className="table-cell w-full">
                    <RichTextField uniqueId={choice} active={active}
                                   initialContent={answerChoice.content}
                                   onBlurEvent={(value) => saveChoiceContent(value)}
                                   onChangeEvent={(value) => saveChoiceContent(value)}/></span>
                <div className="flex justify-between space-x-3">
                    {(active) ?
                        <button onClick={() => deleteAnswerChoice()}><i
                            className={((answerChoice.is_correct) ? "text-blue-600" : "text-gray-300") + " far fa-trash-alt table-cell"}/>
                        </button>
                        : null}
                    {active ?
                        <button onClick={() => markAsCorrect()}><i
                            className={answerChoice.is_correct ? "fas fa-check-square table-cell" : "far fa-square table-cell text-gray-300"}/>
                        </button>
                        : <i className={answerChoice.is_correct ? "fas fa-check-square table-cell" : "hidden"}/>}
                </div>

            </div>
        </>
    )

};


export default AnswerChoice;
