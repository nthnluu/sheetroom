function AnswerChoice() {
    return (
        <button className="card unselectedCard" role="radio">
            hello
        </button>
    )

}

export default function () {
    return (
        <>
            <label id="mc_instruc" className="font-semibold text-gray-800 mb-1">Select one:
            </label>
            <div role="radiogroup" aria-labelledby="mc_instruc">
                <AnswerChoice/>
                <AnswerChoice/>
                <AnswerChoice/>
                <AnswerChoice/>
            </div>
        </>

    )

}
