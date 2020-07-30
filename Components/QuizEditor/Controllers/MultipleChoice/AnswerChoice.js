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
        const newQuestionValue = JSON.stringify(newValue)
        setSaveStatus(1)

        const newDoc = Automerge.change(assignment, 'Update Item Content', doc => {
            doc.sections[0].items[itemIndex].answer_controller[answerIndex].content = JSON.parse(newQuestionValue);
        })
        setAssignment(newDoc)
    }

    const deleteAnswerChoice = () => {
        setSaveStatus(1)
        const newDoc = Automerge.change(assignment, 'Delete Answer  Choice', doc => {
            doc.sections[0].items[itemIndex].answer_controller.deleteAt(answerIndex)
        })
        setAssignment(newDoc)
    }

    const markAsCorrect = () => {
        setSaveStatus(1)
        const newDoc = Automerge.change(assignment, 'Set Correct Answer Choice', doc => {
            const found = doc.sections[0].items[itemIndex].answer_controller.findIndex(element => element.is_correct)
            if (found !== -1) {
                doc.sections[0].items[itemIndex].answer_controller[found].is_correct = false

            }
            doc.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct = true
        })
        setAssignment(newDoc)
    }

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={choice.is_correct ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                <div tabIndex="0" className={choice.is_correct ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </div>
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
