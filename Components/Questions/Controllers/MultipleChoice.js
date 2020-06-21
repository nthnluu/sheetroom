import React, {useRef, useState} from "react";

function checkSelect({selected}) {
    if (selected) {
        return 'card selectedCard';
    } else {
        return 'card unselectedCard';
    }
}


function AnswerChoice({selected, onClick, text, radioName, questionId, index}) {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {
            return;
        }
    }

    return (
        <>
            <input id={inputId} aria-label={text} aria-labelledby={labelId} aria-selected={selected} type="radio" defaultChecked={selected} name={radioName} value={text}
                   onClick={() => onClick()} className="absolute mt-6 ml-5 opacity-0" onFocus={() => setFocus(true)}
                   onBlur={() => setFocus(false)}/>
            <label id={labelId} htmlFor={inputId} onClick={() => onClick()}
                   className={selected ? 'card selectedCard' : 'card unselectedCard' + checkFocus()}>
                {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
                <span className="table-cell pl-2 w-full">{text}</span>
            </label>
        </>
    )

}


export default function ({choices, questionId}) {
    const [selected, setSelected] = useState(null);
    const choiceRef = useRef(null);
    const radioName = questionId;

    return (
        <>
            <form>
                <fieldset className="pt-2">
                    <legend className="font-semibold text-gray-800">Select one:</legend>
                    {choices.map((choice, index) => <AnswerChoice index={index} selected={selected === choice} questionId={questionId}
                                                                  onClick={() => setSelected(choice)} key={index}
                                                                  text={choice} radioName={radioName}/>)}
                </fieldset>
            </form>
        </>

    )

}


// class AnswerChoiceNew extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSelected: props.selected
//         };
//
//         this.text = props.text;
//         this.index = props.index;
//         this.myRef = React.createRef();
//     }
//     render() {
//         return <button ref={this.myRef} onClick={()=>this.props.onClick(this.index)} className={(this.props.isSelected === this.index) ? 'card selectedCard' : 'card unselectedCard'} id={this.index} aria-checked={this.state.isSelected} tabIndex={(this.index===0) ? 0 : -1} role="radio">
//             {(this.props.isSelected === this.index)  ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
//             <span className="table-cell pl-2">{this.text}</span>
//         </button>;  }
// }
