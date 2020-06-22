import MultipleChoice from "./Controllers/MultipleChoice";
import ShortAnswer from "./Controllers/ShortAnswer";

function Controller({type, question}) {
    //1: multiple choice
    //2: short answer
    switch (type) {
        case(1):
            return <section aria-label="Answer Choices"><MultipleChoice choices={question.choices} response={question.response}
                                                                        questionId={question.id}/></section>;
            break;
        case(2):
            return <section aria-label="Response Text Field"><ShortAnswer/></section>;
            break;

    }

}

export default function ({question, index}) {
    return (
        <article>
            <h2 className="font-semibold text-gray-800 text-lg">Question {index+1}</h2>
            <section className="text-gray-800 sm:text-lg mb-8 mt-1" aria-label="Question Text"><p>{question.text}</p>
            </section>
            <Controller type={question.type} question={question}/>
        </article>)

}
