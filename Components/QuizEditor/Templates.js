import {v4 as uuidv4} from 'uuid';

export const blankMCItem = (newId, answerId) => ({
    "id": newId,
    "answer_controller": [
        {
            "id": answerId,
            "is_correct": true,
            "content": [{"children": [{"text": "Option 1"}], "type": "paragraph"}]
        }
    ],
    "controller_type": "MC",
    "question": null
})

export const blankMAItem = (newId, answerId) => ({
    "id": newId,
    "answer_controller": [
        {
            "id": answerId,
            "is_correct": true,
            "content": null
        }
    ],
    "controller_type": "MA",
    "question": null
})

export const blankAnswerChoice = (isCorrect, newId) => ({
    is_correct: isCorrect,
    content: null,
    id: newId
})

export const initialDocumentContent = {
    "sections": [
        {
            "items": [
                {
                    "id": uuidv4(),
                    "answer_controller": [
                        {
                            "id": uuidv4(),
                            "is_correct": true,
                            "content": [{"children": [{"text": "Option 1"}], "type": "paragraph"}]
                        }
                    ],
                    "controller_type": "MC",
                    "question": [{"children": [{"text": "Question"}], "type": "paragraph"}]
                }
            ],
        }
    ]
}

export const newInitialDocumentContent = () => {
    const itemId = uuidv4()
    const answerObjectId = uuidv4()
    const sectionId = uuidv4()

    return ({
        config: {
            sections: [sectionId]
        },
        sections: {
            [sectionId]: {
                "items": [itemId]
            }
        },
        items: {
            [itemId]: {
                "answer_objects": [answerObjectId],
                "controller_type": "MC",
                "question": "<p>Cum!</p>",
                "correct_objects": [answerObjectId]
            }
        },
        answer_objects: {
            [answerObjectId]: {
                content: "<p>Cum!</p>"
            }
        }
    })
}


