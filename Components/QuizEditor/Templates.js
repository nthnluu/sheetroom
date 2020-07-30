import {nanoid} from "nanoid";

export const blankMCItem = (newId, answerId) => ({
    "id": newId,
    "answer_controller": [
        {
            "id": answerId,
            "is_correct": true,
            "content": null
        }
    ],
    "controller_type": "MC",
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
                    "id": nanoid(),
                    "answer_controller": [
                        {
                            "id": nanoid(),
                            "is_correct": true,
                            "content": null
                        }
                    ],
                    "controller_type": "MC",
                    "question": null
                }
            ],
        }
    ]
}


