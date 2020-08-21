import React, {useContext} from "react";
import QuizContext from "../../QuizContext";
import NewTooltip from "../../../Misc/Tooltip";
import update from "immutability-helper";


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
            key={choice}
            className='mb-2 bg-white '
        >
            <div className="flex justify-start items-center h-full">
                <div className="w-full">
                    <label htmlFor="answer_choice" className="sr-only">Acceptable Answer {answerIndex + 1}</label>
                    <div className="relative rounded-md shadow-sm">
                        <input id="answer_choice" className={"border rounded-lg pl-4 focus:outline-none focus:shadow-outline focus:border-blue-400 block p-3 w-full sm:text-lg sm:leading-5 placeholder-gray-200 text-gray-700 " + (active ? "border-gray-200" : "border-gray-100")}
                               placeholder="Acceptable answer" autoComplete="none" onChange={event => saveChoiceContent(event.target.value)} value={currentChoice.content}/>
                    </div>
                </div>

                <div className="-ml-6 z-50">
                    {(active && document.items[item].answer_objects.length > 1) ?
                        <NewTooltip title="Delete answer choice" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button onClick={() => deleteAnswerChoice()}><i
                                className="far fa-trash-alt text-gray-300 table-cell"/>
                            </button>
                        </NewTooltip> : null}
                </div>
            </div>

        </div>

    )

};

export default AnswerObject;
