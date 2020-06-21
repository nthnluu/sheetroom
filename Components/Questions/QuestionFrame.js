import MultipleChoice from "./Controllers/MultipleChoice";
import ShortAnswer from "./Controllers/ShortAnswer";

function Controller({type, question}) {
    //1: multiple choice
    //2: short answer
    switch (type) {
        case(1):
            return <MultipleChoice choices={question.choices} questionId={question.id}/>;
            break;
        case(2):
            return <ShortAnswer/>;
            break;

    }

}

export default function ({question}) {
    return (
        <article>
            <article className="text-gray-800 sm:text-lg mb-8">{question.text}</article>
            <Controller type={question.type} question={question}/>
        </article>)

}
