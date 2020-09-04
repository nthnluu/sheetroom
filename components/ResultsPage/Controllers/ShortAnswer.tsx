import React from "react";
import getEditDistance from "../../../lib/getEditDistance";




export default function ShortAnswer({item, data}) {
    const allAnswerContents = data.content.content.items[item].answer_objects.map(answerObj => {
        const newObjContent = data.content.content.answer_objects[answerObj].content
        if (data.content.content.items[item].config.case_sensitive) {
            return newObjContent
        } else {
            return newObjContent.toUpperCase()
        }
    })

    const studentContent = data.content.content.items[item].student_input[0]
    const selected = data.content.content.items[item].config.case_sensitive ? studentContent :  studentContent.toUpperCase()
    const allowedDistances = data.content.content.items[item].answer_objects.map(answer => data.content.content.answer_objects[answer].content.length * 0.2)
    const levDistances = data.content.content.items[item].answer_objects.map(answer => getEditDistance((data.content.content.items[item].config.case_sensitive ? data.content.content.answer_objects[answer].content : data.content.content.answer_objects[answer].content.toUpperCase()), selected))
    const isCorrect = data.content.content.items[item].config.tolerate_typos ? levDistances.some(element => allowedDistances.some(allowedDistance => element <= allowedDistance)) : allAnswerContents.includes(selected)


    return (
        <>
            <div className="pt-2">
                <p className={(!isCorrect ? "text-red-500" : "text-blue-500")+" text-xs uppercase font-medium mb-1 -ml-3"}>Your answer</p>
                <input id={"response_"+item} className={"form-input block w-full placeholder-gray-300 rounded-lg -ml-3 text-sm md:text-lg p-2 md:p-3 sm:leading-5 " + (isCorrect ? "border-blue-500 text-gray-500  placeholder-blue-300" : 'border-red-400 text-gray-400 placeholder-red-300')}
                       placeholder="No response" value={selected} readOnly/>
                <div className="text-sm  -ml-3">
                    <h2 className="uppercase text-sm text-gray-400 mt-2">Acceptable Answers</h2>
                    <div className="flex justify-start">
                        {data.content.content.items[item].answer_objects.map(answerObject => <span key={answerObject} className="mr-2">{data.content.content.answer_objects[answerObject].content}</span>)}
                    </div>

                </div>
            </div>

        </>

    )

}
