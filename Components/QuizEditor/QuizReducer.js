import {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function quizReducer(state, action) {
    switch (action.type) {
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
            let newSectionsArray = [...state.sections]
            newSectionsArray[0].items = action.payload
            return {...state, sections: newSectionsArray}
        }
        case 'UPDATE-ANSWER-CHOICE-ARRAY': {
            let updatedItem = state.sections[0].items[action.index]
            updatedItem.answer_controller = action.payload

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.index, 1, updatedItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'UPDATE-ITEM-CONTENT': {
            let newItem = state.sections[0].items[action.index]
            newItem.content = action.payload

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.index, 1, newItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'UPDATE-ANSWER-CHOICE-CONTENT': {
            let newAnswerObject = state.sections[0].items[action.itemIndex].answer_controller[action.answerIndex]
            newAnswerObject.content = action.payload

            let newAnswerObjectArray = [...state.sections[0].items[action.itemIndex].answer_controller]
            newAnswerObjectArray.splice(action.answerIndex, 1, newAnswerObject)

            let newItem = {...state.sections[0].items[action.itemIndex]}
            newItem.answer_controller = newAnswerObjectArray

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.itemIndex, 1, newItem)

            let newSection = {...state.sections[0]}
            newSection.items = newItemArray

            let newArray = [...state.sections]
            newArray.splice(0, 1, newSection)

            return {...state, sections: newArray}
        }
        case 'SET-CORRECT-ANSWER-CHOICE': {
            let newAnswerObject = [...state.sections[0].items[action.itemIndex].answer_controller]
            const found = newAnswerObject.findIndex(element => element.is_correct)
            newAnswerObject[found].is_correct = false;
            newAnswerObject[action.answerIndex].is_correct = true;

            let newItem = {...state.sections[0].items[action.itemIndex]}
            newItem.answer_controller = newAnswerObject

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.itemIndex, 1, newItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {id: state.sections[0].id, items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'CREATE-NEW-ANSWER-OBJECT': {
            let newAnswerObject = {
                "id": uuidv4(),
                "item": action.itemId,
                "is_correct": state.sections[0].items[action.itemIndex].answer_controller ? state.sections[0].items[action.itemIndex].answer_controller.length === 0 : true,
                "index": state.sections[0].items[action.itemIndex].answer_controller ? state.sections[0].items[action.itemIndex].answer_controller.length : 0,
                "content": [
                    {
                        "children": [
                            {
                                "text": "Answer Choice"
                            }
                        ],
                        "type": "paragraph"
                    }
                ],
                "__typename": "assignments_answer_object"
            }

            let newAnswerArray = [...state.sections[0].items[action.itemIndex].answer_controller, newAnswerObject]

            let newItem = {...state.sections[0].items[action.itemIndex]}
            newItem.answer_controller = newAnswerArray

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.itemIndex, 1, newItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {id: state.sections[0].id, items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'DELETE-ANSWER-OBJECT': {

            let newAnswerArray = [...state.sections[0].items[action.itemIndex].answer_controller]
            newAnswerArray.splice(action.answerIndex, 1)

            let newItem = {...state.sections[0].items[action.itemIndex]}
            newItem.answer_controller = newAnswerArray

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.itemIndex, 1, newItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {id: state.sections[0].id, items: newItemArray})

            return {...state, sections: newArray}
        }
        case 'UPDATE-QUIZ-TITLE': {
            return {...state, title: action.value}
        }
    }
}

