import {useReducer} from 'react';

export default function quizReducer(state, action) {
    switch(action.type) {
        case 'UPDATE-ITEM-FIELD': {
            //Updates the CONTENT of an ITEM
            //requires an INDEX and the new CONTENT value
            let newArray = [...state]
            newArray.splice(action.index, 1, {...state[action.index], [action.fieldName]: action.payload})
            return newArray;
        }
        case 'addItem': {
            return [...state, action.value]
        }
    }
}

