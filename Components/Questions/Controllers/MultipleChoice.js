import {useState} from "react";

function AnswerChoice({selected, onClick}) {
    return (
        <button onClick={()=>onClick()} className={selected ? 'card selectedCard' : 'card unselectedCard'} role="radio">
            {selected ? <i className="fas fa-check-circle mr-2"/> : <i className="far fa-circle mr-2"/>}
            hello
        </button>
    )

}

export default function ({question}) {
    const [selected, setSelected] = useState();
    return (
        <>
            <label id="mc_instruc" className="font-semibold text-gray-800">Select one:
            </label>
            <div role="radiogroup" aria-labelledby="mc_instruc" className="mt-2">
                <AnswerChoice selected={selected===1} onClick={()=>setSelected(1)}/>
                <AnswerChoice selected={selected===2} onClick={()=>setSelected(2)}/>
                <AnswerChoice selected={selected===3} onClick={()=>setSelected(3)}/>
                <AnswerChoice selected={selected===4} onClick={()=>setSelected(4)}/>
            </div>
        </>

    )

}
