import React, {useState} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import PropTypes from 'prop-types';

const AnswerChoice = ({onBlurHandler, active, choice, dragHandler}) => {
    const inputId = 'input-' + choice.id;
    const labelId = 'label-' + choice.id;

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
                                   onBlurEvent={(value) => onBlurHandler(value)}/></span>
                {choice.is_correct ? <i className="fas fa-check table-cell"/> : (active ? <i className="far fa-circle table-cell text-gray-300"/>: null)}
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
