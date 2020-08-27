import React from "react";
import InactiveQuillEditor from "../../Editor/InactiveQuillEditor";


const AnswerChoice: React.FC<{ data; choice: string; item: string; isCorrect; isWrong; selected; }> = ({isCorrect, data, isWrong, choice, item, selected}) => {
    const currentChoice = data.content.content.answer_objects[choice]
    return (
        <div className="-ml-3">
            {selected ? <p className={(isWrong ? "text-red-500" : "text-blue-500")+" text-xs uppercase font-medium mb-1"}>Your answer</p> : null}
            <label
                className={(isCorrect ? 'table rounded-lg mb-1 p-3 transition-all duration-100 w-full text-left text-lg border border-blue-200 ' : (isWrong ? 'table rounded-lg mb-1 p-3 transition-all duration-100 w-full text-left text-lg border border-red-400 ' : 'table rounded-lg mb-1 p-3 transition-all duration-100 w-full text-left text-lg '))}
            >
                {isCorrect ? <i className="fas fa-check-circle text-blue-500 table-cell"/> : (isWrong ?
                    <i className="fas fa-minus-circle text-red-500 table-cell"/> :
                    <i className="far fa-circle table-cell"/>)}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>
        </div>
    )

}


export default function ShortAnswer({item, data}) {
    const currentItem = data.content.content.items[item]
    const selected = data.content.content.items[item].student_input[0]
    const rightAnswer = data.answer_key.filter(element => element.id === item)[0].correct_objects[0]

    return (
        <>
            <div className="pt-2">
                <input id={"response_"+item} className="form-input block w-full text-gray-800 placeholder-gray-300 rounded-lg -ml-3 text-sm md:text-lg p-2 md:p-3 sm:leading-5"
                       placeholder="Start typing..." value={selected} readOnly/>
            </div>

        </>

    )

}
