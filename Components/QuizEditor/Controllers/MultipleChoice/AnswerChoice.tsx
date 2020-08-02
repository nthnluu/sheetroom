import React, {useContext} from "react";
import {RichTextField} from "../../../Editor/SlateEditor";
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import update from "immutability-helper";
import arrayMove from "array-move";
import QuillEditor from "../../../Editor/QuillEditor";
import JsonDebugBox from "../../../JsonDebugBox";


const AnswerChoice = ({active, choice, dragHandler, answerIndex, item, isCorrect}) => {
    const {document, setDocument} = useContext(QuizContext);
    const currentChoice = document.answer_objects[choice]


    const saveChoiceContent = (newValue) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                answer_objects: {
                    [choice]: {
                        content: {$set: newValue}
                    }
                }
            })
            return newData
        })
    }

    const deleteAnswerChoice = () => {

    }

    const markAsCorrect = () => {

    }


    return (
        <>
            <div
                key={"key1" + choice}
                className={isCorrect ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                {active ? <span
                    className={isCorrect ? "text-blue-500" : "text-gray-200 active:text-blue-400"}>
                    {dragHandler}
                </span> : null}

                <span className="table-cell w-full pointer-events-auto">
<QuillEditor uniqueKey={choice} onChange={(value) => saveChoiceContent(value)}
             value={document.answer_objects[choice].content} active={true} placeholder="Question"/>
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
