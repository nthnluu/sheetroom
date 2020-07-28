import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';
import QuizContext from "../../QuizContext";


const AnswerChoice = ({onBlurHandler, active, choice, dragHandler, answerIndex, itemIndex}) => {
    const inputId = 'input-' + choice.id;
    const labelId = 'label-' + choice.id;
    const {quiz, dispatch} = useContext(QuizContext);

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={choice.is_correct ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                <div className={choice.is_correct ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </div>
                <span className="table-cell w-full pointer-events-auto">
                    <RichTextField uniqueId={choice.id} active={active} initialContent={choice.content}
                                   onBlurEvent={(value) => dispatch({type: 'UPDATE-ANSWER-CHOICE-CONTENT', itemIndex: itemIndex, answerIndex: answerIndex, payload: value})}/></span>
                {choice.is_correct ? <i className="fas fa-check table-cell"/> : (active ? <button onClick={() => dispatch({type: 'SET-CORRECT-ANSWER-CHOICE', itemIndex: itemIndex, answerIndex: answerIndex})}><i className="far fa-circle table-cell text-gray-300"/></button>: null)}
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
