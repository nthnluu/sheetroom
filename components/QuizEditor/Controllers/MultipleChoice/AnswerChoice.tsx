import React, {useContext} from "react";
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import update from "immutability-helper";
import QuillEditor from "../../../Editor/QuillEditor";


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
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        answer_objects: {$splice: [[answerIndex, 1]]}
                    }
                },

            })
            return newData
        })

    }

    const markAsCorrect = () => {
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        correct_objects: {$set: [choice]}
                    }
                }
            })
            return newData
        })

    }


    return (
        <>
            <div
                key={"key1" + choice}
                className={isCorrect ? 'editor-card editor-unselectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard '}
            >
                {active ? <span
                    className="text-gray-200 active:text-blue-400 mr-2">
                    {dragHandler}
                </span> : null}

                <span className={"table-cell w-full pointer-events-auto " + (active ? "p-2" : "p-1")}>
                    <QuillEditor uniqueKey={choice} onChange={(value) => saveChoiceContent(value)}
                                 value={document.answer_objects[choice].content} active={active} placeholder="Option"/>
                </span>
                <div className="flex justify-between space-x-3">
                    {(active && !isCorrect && document.items[item].answer_objects.length > 1) ?
                        <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => deleteAnswerChoice()}><i
                                className={((isCorrect) ? "text-blue-600" : "text-gray-300") + " far fa-trash-alt table-cell"}/>
                            </button>
                        </NewTooltip> : null}

                    {isCorrect ? <i
                        className="fas fa-check-circle text-lg table-cell"/> : (active ?
                        <NewTooltip title="Set as correct answer" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => markAsCorrect()}><i
                                className="far fa-circle table-cell text-xl text-gray-300"/></button>
                        </NewTooltip> : null)}
                </div>

            </div>
        </>
    )

};

export default AnswerChoice;
