import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import Automerge from "automerge";
import { nanoid } from 'nanoid'


const AnswerChoice = ({active, choice, dragHandler, answerIndex, itemIndex}) => {
    const inputId = 'input-' + choice.id;
    const labelId = 'label-' + choice.id;
    const {assignment, setSaveStatus, setAssignment, doc1} = useContext(QuizContext);


    const saveChoiceContent = (newValue) => {
        const newDocument = {...assignment}
        newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].content = newValue
        setAssignment(newDocument)
    }

    const deleteAnswerChoice = () => {
        const newDocument = {...assignment}
        newDocument.sections[0].items[itemIndex].answer_controller.splice(answerIndex, 1)
        setAssignment(newDocument)
    }

    const markAsCorrect = () => {
        const newDocument = {...assignment}
        const found = newDocument.sections[0].items[itemIndex].answer_controller.findIndex(element => element.is_correct)
        if (found !== -1) {
            newDocument.sections[0].items[itemIndex].answer_controller[found].is_correct = false
        }
        newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct = true
        setAssignment(newDocument)
    }

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={choice.is_correct ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                {active ? <span className={choice.is_correct ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </span> : null}

                <span className="table-cell w-full pointer-events-auto">
                    <RichTextField uniqueId={choice.id} active={active} initialContent={choice.content}
                                   onBlurEvent={(value) => saveChoiceContent(value)}/></span>
                <div className="flex justify-between space-x-3">
                    {(active && !choice.is_correct) ?
                        <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => deleteAnswerChoice()}><i
                                className={((choice.is_correct) ? "text-blue-600" : "text-gray-300") + " far fa-trash-alt table-cell"}/>
                            </button>
                        </NewTooltip> : null}
                    {choice.is_correct ? <i className="fas fa-check table-cell"/> : (active ?
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

AnswerChoice.propTypes = {
    active: PropTypes.bool,
    choice: PropTypes.object.isRequired,
    dragHandler: PropTypes.element,
    itemIndex: PropTypes.number

};

export default AnswerChoice;
