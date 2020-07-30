import {nanoid} from "nanoid";

export const blankMCItem = {
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

export const blankAnswerChoice = (isCorrect) => ({
    is_correct: isCorrect,
    content: null,
    id: nanoid()
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


