import {useState} from "react";

function AnswerChoice({selected, onClick, text, index}) {
    return (
        <button focused onClick={()=>onClick()} className={selected ? 'card selectedCard' : 'card unselectedCard'} id={index} aria-checked={selected} tabIndex={(index===0) ? 0 : -1} role="radio">
            {selected ? <i className="fas fa-check-circle table-cell"/> : <i className="far fa-circle table-cell"/>}
            <span className="table-cell pl-2">{text}</span>
        </button>
    )

}


export default function ({choices}) {
    const [selected, setSelected] = useState();
    return (
        <>
            <label id="mc_instruc" className="font-semibold text-gray-800">Select one:
            </label>
            <div role="radiogroup" aria-activedescendant={selected} aria-labelledby="mc_instruc" className="mt-2">
                {choices.map((choice, index) => <AnswerChoice index={index} selected={selected===index} onClick={()=>setSelected(index)} key={index} text={choice}/>)}
            </div>
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
