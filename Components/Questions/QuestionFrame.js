import MultipleChoice from "./Controllers/MultipleChoice";
import ShortAnswer from "./Controllers/ShortAnswer";

function Controller({type, question}) {
    //1: multiple choice
    //2: short answer
    switch (type) {
        case(1):
            return <MultipleChoice choices={question.choices}/>;
            break;
        case(2):
            return <ShortAnswer/>;
            break;

    }

}

export default function ({question}) {
    return (
        <article>
            <p className="text-gray-800 sm:text-lg mb-8">{question.text}</p>
            <Controller type={question.type} question={question}/>
        </article>)

}
