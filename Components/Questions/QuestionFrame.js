import MultipleChoice from "./Controllers/MultipleChoice";

function Controller({type, question}) {
    //1: multiple choice
    switch (type) {
        case(1):
            return <MultipleChoice/>;
            break;

    }

}

export default function ({question}) {
    return (
        <article>
            <p className="text-gray-800 text-lg mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                adipisci dicta dolor eligendi, illo illum itaque magni officia perferendis, possimus quam repellendus
                rerum, similique sint suscipit. Delectus dicta dolore et!</p>
            <Controller type={1}/>
        </article>)

}
