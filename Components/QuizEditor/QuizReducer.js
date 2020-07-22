import {useReducer} from 'react';

function quizReducer(state, action) {
    switch(action.type) {
        case 'saveTitle': {
            return {}
        }
        case 'UPDATE-ITEM-CONTENT': {
            //Updates the content of an item
            //requires an index and the new content value
            return state.splice(action.index, 1, {...state[action.index], content: value});
        }
        case 'addItem': {
            return [...state, action.value]
        }
    }
}
