import React from "react";
import MathField from "../../Editor/MathField";





export default function ShortAnswer({item, data}) {
    const selected = data.content.content.items[item].student_input[0]

    const isCorrect = data.content.content.items[item].answer_objects.includes(selected)
    return (
        <>
            <div className="pt-2">
                <p className={(!isCorrect ? "text-red-500" : "text-blue-500")+" text-xs uppercase font-medium mb-1"}>Your answer</p>
                <MathField value={selected} staticField isWrong={!isCorrect} isCorrect={isCorrect}/>
                <div className="text-sm">
                    <h2 className="uppercase text-sm text-gray-400 mt-2">Acceptable Answers</h2>
                    <div className="flex justify-start">
                        {data.content.content.items[item].answer_objects.map(answerObject => <span key={answerObject} className="mr-2"><MathField value={data.content.content.answer_objects[answerObject].content} staticField small/></span>)}
                    </div>

                </div>
            </div>

        </>

    )

}
