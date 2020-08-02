import MultipleChoice from "./Controllers/MultipleChoice";
import ShortAnswer from "./Controllers/ShortAnswer";

function Controller({type, item}) {
    //1: multiple choice
    //2: short answer
    switch (type) {
        case("MC"):
            return <section aria-label="Answer Choices"><MultipleChoice choices={item.answer_objectss} itemId={item.id}/>
            </section>;
            break;
        case("SA"):
            return <section aria-label="Response Text Field"><ShortAnswer/></section>;
            break;
        default:
            return <div className="bg-red-100 p-3 rounded text-red-500">
                <h3 className="font-bold text-sm uppercase"><i className="fas fa-exclamation-circle mr-2"/>Incorrectly Configured Question<span className="font-medium normal-case"> — Contact your instructor for help.</span>
                </h3>
            </div>;

    }

}

export default function ({item, index}) {
    return (
        <article>
            <h2 className="font-semibold text-gray-800 text-lg">Question {index + 1}</h2>
            <section className="text-gray-800 sm:text-lg mb-8 mt-3" aria-label="Question Text">
            </section>
            <Controller type={item.type} item={item}/>
        </article>)

}
