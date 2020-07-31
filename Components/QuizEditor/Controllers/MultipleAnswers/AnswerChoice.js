import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";
import Tooltip from "@material-ui/core/Tooltip";
import NewTooltip from "../../../Misc/Tooltip";
import JsonDebugBox from "../../../JsonDebugBox";
import Automerge from "automerge";


const AnswerChoice = ({active, choice, dragHandler, answerIndex, itemIndex}) => {
    const inputId = 'input-' + choice.id;
    const labelId = 'label-' + choice.id;
    const {quiz, dispatch, setAssignment, assignment, setSaveStatus} = useContext(QuizContext);

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
        newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct = !newDocument.sections[0].items[itemIndex].answer_controller[answerIndex].is_correct
        setAssignment(newDocument)
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
                    <RichTextField autoFocus={active} uniqueId={choice.id} active={active} initialContent={choice.content}
                                   onBlurEvent={(value) => saveChoiceContent(value)}/></span>
                <div className="flex justify-between space-x-3">
                    {(active) ? <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}  enterNextDelay={500}>
                        <button onClick={() => deleteAnswerChoice()}><i className={((choice.is_correct) ? "text-blue-600": "text-gray-300") + " far fa-trash-alt table-cell"}/></button>
                    </NewTooltip>: null}
                    {active ? <NewTooltip title="Mark as correct" placement="bottom" enterDelay={500}  enterNextDelay={500}>
                        <button onClick={() => markAsCorrect()}><i className={choice.is_correct ? "fas fa-check-square table-cell" : "far fa-square table-cell text-gray-300"}/></button>
                    </NewTooltip>: <i className={choice.is_correct ? "fas fa-check-square table-cell" : "hidden"}/>}
                </div>

            </div>
        </>
    )

};

AnswerChoice.propTypes = {
    active: PropTypes.bool,
    choice:  PropTypes.object.isRequired,
    dragHandler: PropTypes.element,
    answerIndex: PropTypes.number,
    itemIndex: PropTypes.number
};

export default AnswerChoice;
