import {useReducer} from 'react';

export default function quizReducer(state, action) {
    switch(action.type) {
        case 'UPDATE-ITEM-FIELD': {
            //Replaces a FIELD (fieldName) of an ITEM with PAYLOAD
            //requires an INDEX, the FIELDNAME and the new PAYLOAD
            let newArray = [...state]
            newArray.splice(action.index, 1, {...state[action.index], [action.fieldName]: action.payload})
            return newArray;
        }
        case 'addItem': {
            return [...state, action.value]
        }
        case 'UPDATE-ITEM-ARRAY': {
            return {...state, sections: [{items: [...action.payload]}]}
        }
        case 'UPDATE-ANSWER-CHOICE-ARRAY': {

            let updatedItem = state.sections[0].items[action.index]
            updatedItem.answer_choices = action.payload

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.index, 1, updatedItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'UPDATE-QUIZ-TITLE': {
            return {...state, title: action.value}
        }
    }
}

