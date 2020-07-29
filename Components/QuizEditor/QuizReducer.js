import {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';

export default function quizReducer(state, action) {
    switch (action.type) {
        case 'REFRESH-QUIZ': {
            //Replaces a FIELD (fieldName) of an ITEM with PAYLOAD
            //requires an INDEX, the FIELDNAME and the new PAYLOAD
            let newArray = action.quiz
            return newArray;
        }
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
        case 'UPDATE-ITEM-TYPE': {
            let newItem = state.sections[0].items[action.index]

            let newAnswerObject = [...state.sections[0].items[action.index].answer_controller]
            const result = newAnswerObject.filter((element, index) => element.is_correct === true);
            if (newAnswerObject.length === 0) {
                let newAnsObject = {
                    "id": uuidv4(),
                    "item": action.itemId,
                    "is_correct": true,
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
                newAnswerObject = [...newAnswerObject, newAnsObject]
            } else {
                if (result.length > 1) {
                    newAnswerObject.forEach((element, index) => {
                        if (index === 0) {
                            element.is_correct = true;
                        } else {
                            element.is_correct = false;
                        }
                    })
                } else {
                    if (result.length === 0) {
                        newAnswerObject[0].is_correct = true;
                    }
                }
            }

            newItem.controller_type = action.controller_type
            newItem.answer_controller = newAnswerObject

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
        case 'SET-CORRECT-CHECK-ANSWER-CHOICE': {
            let newAnswerObject = [...state.sections[0].items[action.itemIndex].answer_controller]
            newAnswerObject[action.answerIndex].is_correct = !newAnswerObject[action.answerIndex].is_correct;

            let newItem = {...state.sections[0].items[action.itemIndex]}
            newItem.answer_controller = newAnswerObject

            let newItemArray = [...state.sections[0].items]
            newItemArray.splice(action.itemIndex, 1, newItem)

            let newArray = [...state.sections]
            newArray.splice(0, 1, {id: state.sections[0].id, items: newItemArray})

            return {...state, sections: newArray}
        }

    }


}

