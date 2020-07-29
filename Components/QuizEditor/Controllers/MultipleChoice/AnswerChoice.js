import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";
import Tooltip from "@material-ui/core/Tooltip";
import NewTooltip from "../../../Misc/Tooltip";
import JsonDebugBox from "../../../JsonDebugBox";


const AnswerChoice = ({active, choice, dragHandler, answerIndex, itemIndex}) => {
    const inputId = 'input-' + choice.id;
    const labelId = 'label-' + choice.id;
    const {quiz, dispatch} = useContext(QuizContext);

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={choice.is_correct ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                <button className={choice.is_correct ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </button>
                <span className="table-cell w-full pointer-events-auto">
                    <RichTextField uniqueId={choice.id} active={active} initialContent={choice.content}
                                   onBlurEvent={(value) => dispatch({type: 'UPDATE-ANSWER-CHOICE-CONTENT', itemIndex: itemIndex, answerIndex: answerIndex, payload: value})}/></span>
                <div className="flex justify-between space-x-3">
                    {(active && !choice.is_correct) ? <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}  enterNextDelay={500}>
                        <button onClick={() => dispatch({type: 'DELETE-ANSWER-OBJECT', itemIndex: itemIndex, answerIndex: answerIndex})}><i className={((choice.is_correct) ? "text-blue-600": "text-gray-300") + " far fa-trash-alt table-cell"}/></button>
                    </NewTooltip>: null}
                    {choice.is_correct ? <i className="fas fa-check table-cell"/> : (active ? <NewTooltip title="Set as correct answer" placement="bottom" enterDelay={500}  enterNextDelay={500}>
                        <button onClick={() => dispatch({type: 'SET-CORRECT-ANSWER-CHOICE', itemIndex: itemIndex, answerIndex: answerIndex})}><i className="far fa-circle table-cell text-gray-300"/></button>
                    </NewTooltip>: null)}
                </div>

            </div>
        </>
    )

};

AnswerChoice.propTypes = {
    onBlurHandler: PropTypes.func.isRequired,
    active: PropTypes.bool,
    choice:  PropTypes.object.isRequired,
    dragHandler: PropTypes.element

};

export default AnswerChoice;
