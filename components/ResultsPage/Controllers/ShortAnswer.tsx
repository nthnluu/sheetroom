import React from "react";





export default function ShortAnswer({item, data}) {
    const selected = data.content.content.items[item].student_input[0]
    const isCorrect = data.content.content.items[item].answer_objects.includes(selected)

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
