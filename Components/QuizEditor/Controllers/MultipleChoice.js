import React, {useEffect, useState} from "react";
import {RichTextField} from "../../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {v4 as uuidv4} from 'uuid';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

// const NEW_ANSWER_CHOICE = gql`
//  mutation CreateNewAnswerChoice($itemId: uuid!, $isCorrect: Boolean!, $index: Int!, $content: json!) {
//   insert_assignments_answer_choice(objects: {item: $itemId, is_correct: $isCorrect, index: $index, content: $content}) {
//     returning {
//       id
//       is_correct
//       content
//     }
//   }
// }
// `;
// const UPSERT_CHOICE_CONTENT = gql`
// mutation UpsertChoiceContent($itemId: uuid!, $content: json!, $choiceId: uuid!, $index: Int!, $isCorrect: Boolean!) {
//   insert_assignments_answer_choice(on_conflict: {constraint: answer_choice_pkey, update_columns: [content, index]}, objects: {item: $itemId, content: $content, id: $choiceId, index: $index, is_correct: $isCorrect}) {
//     affected_rows
//   }
// }
// `;
// const mutationSaveNewChoicesOrder = (choices) => {
//     const mutations = choices.map((choice, index) => `choice${index}: update_assignments_answer_choice_by_pk(pk_columns: {id: "${choice.id}"}, _set: {index: ${index}}) {
//     index
//   }`);
//     const newMutation = `mutation {
//      ${mutations.join(" ")}
//   }
// `;
//     return newMutation
// };
// const url = "/api/token";
// const opts = (choices) => ({
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({query: mutationSaveNewChoicesOrder(choices)}),
// });

const AnswerChoice = ({selected, onBlurHandler, questionId, index, active, content, choiceId, dragHandler}) => {
    const [focused, setFocus] = useState(false);
    const inputId = 'input-' + questionId + index;
    const labelId = 'label-' + questionId + index;


    function checkFocus() {
        if (focused) {
            return ' shadow-outline';
        } else {

        }
    }

    return (
        <>
            <div id={labelId} htmlFor={inputId}
                 className={selected ? 'editor-card editor-selectedCard cursor-pointer flex-grow bg-white ' : 'flex-grow editor-card bg-white editor-unselectedCard ' + checkFocus()}
            >
                {dragHandler}
                <span className="table-cell w-full pointer-events-auto">
                    <RichTextField uniqueId={choiceId} active={active} initialContent={content}
                                   onBlurEvent={(value) => onBlurHandler(value)}/></span>
                {selected ? <i className="fas fa-check table-cell"/> : (active ? <i className="far fa-circle table-cell text-gray-300"/>: null)}
            </div>
        </>
    )

};

const DragHandle = SortableHandle(() => <i
    className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const SortableItem = SortableElement(({value, active, setActive}) =>
    <div>
        <div className="flex justify-between">
            <AnswerChoice content={value.content} active={active} selected={value.is_correct} dragHandler={active ? <DragHandle/> : null}/>
        </div>
    </div>
);

const SortableList = SortableContainer(({items, selectedItem, setActive, active}) => {
    return (
        <ul className="space-y-4 mb-4">
            {items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} value={value} index={index} active={active}/>
            ))}
        </ul>
    );
});


export const MultipleChoiceController = ({isSelected, active, choices, setSaveStatus, itemId}) => {
    const [answerChoices, setAnswerChoices] = useState(choices);


    const onSortEnd = ({oldIndex, newIndex}) => {
        setAnswerChoices(arrayMove(answerChoices, oldIndex, newIndex));
    };


    return (
        <>
            {active ? <div key={itemId}>
                <SortableList items={answerChoices} onSortEnd={onSortEnd} useDragHandle active={active} lockAxis="y"
                              lockToContainerEdges/>
                <div className="space-x-2">
                    <button type="button" onClick={() => {
                        const newOption = {
                            "id": uuidv4(),
                            "item": itemId,
                            "is_correct": (answerChoices.length <= 0),
                            "index": answerChoices.length,
                            "content": [{"children": [{"text": ""}], "type": "paragraph"}],
                            "__typename": "assignments_answer_choice"
                        };
                        setAnswerChoices([...answerChoices, newOption]);
                    }}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        Add option
                    </button>
                </div>
            </div> : <div className="space-y-4">
                {answerChoices.map((choice, index) => <AnswerChoice choiceId={choice.id} active={false}
                                                                    setSaveStatus={status => setSaveStatus(status)}
                                                                    key={choice.id + "_inactive"}
                                                                    content={choice.content}
                                                                    selected={choice.is_correct}/>)}
            </div>}
        </>

    )
};

export default MultipleChoiceController
