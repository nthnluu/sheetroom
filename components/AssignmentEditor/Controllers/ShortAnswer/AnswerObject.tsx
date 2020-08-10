import React, {useContext} from "react";
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import update from "immutability-helper";
import QuillEditor from "../../../Editor/QuillEditor";


const AnswerObject = ({active, choice, answerIndex, item}) => {
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

    return (

        <div
            key={"key1" + choice}
            className='flex-grow editor-card mb-2 bg-white editor-unselectedCard '
        >
                <span className={"table-cell w-full pointer-events-auto " + (active ? "p-2" : "p-1")}>
                    <input value={currentChoice.content} onChange={(e) => saveChoiceContent(e.target.value)} placeholder="Option" className="text-gray-700 focus:outline-none w-full"/>
                </span>
            <div className="flex justify-between space-x-3">
                {(active && document.items[item].answer_objects.length > 1) ?
                    <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}
                                enterNextDelay={500}>
                        <button onClick={() => deleteAnswerChoice()}><i
                            className="far fa-trash-alt text-gray-300 table-cell"/>
                        </button>
                    </NewTooltip> : null}
            </div>
        </div>

    )

};

export default AnswerObject;
