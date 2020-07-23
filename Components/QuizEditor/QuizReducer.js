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
        case 'UPDATE-QUIZ-TITLE': {
            return {...state, title: action.value}
        }
    }
}

