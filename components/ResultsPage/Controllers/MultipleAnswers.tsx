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
                {isCorrect ? <i className="fas fas fa-check-square text-blue-500 table-cell"/> : (isWrong ?
                    <i className="fas fa-minus-square text-red-500 table-cell"/> :
                    <i className="far fa-square table-cell"/>)}
                <span className="table-cell pl-2 w-full">
                    <InactiveQuillEditor value={currentChoice.content}/>
                </span>
            </label>
        </div>
    )

}



const MultipleAnswers:React.FC<{item; data;}> = ({item, data}) => {
    const currentItem = data.content.content.items[item]
    const selected = data.content.content.items[item].student_input
    const rightAnswer = data.answer_key.filter(element => element.id === item)[0].correct_objects

    return (
        <>
            <div className="pt-2 space-y-2">
                {currentItem.answer_objects.map((choice, index) => <AnswerChoice
                    key={choice} choice={choice}
                    data={data}
                    selected={selected.includes(choice)}
                    isWrong={(selected.includes(choice)) && !rightAnswer.includes(choice)}
                    isCorrect={rightAnswer.includes(choice)}
                    item={item}/>)}
            </div>

        </>

    )

}

export default MultipleAnswers
