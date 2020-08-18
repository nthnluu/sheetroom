import {nanoid} from "nanoid";

export const newInitialDocumentContent = () => {
    const itemId = nanoid(6)
    const answerObjectId = nanoid(6)
    const sectionId = nanoid(6)

    return ({
        config: {
            sections: [sectionId],
            timing: 0,
            calculator: 0
        },
        sections: {
            [sectionId]: {
                "title": "Untitled Section",
                "items": [itemId],
                "config": {
                    timing: undefined
                }
            }
        },
        items: {
            [itemId]: {
                "answer_objects": [answerObjectId],
                "controller_type": "MC",
                "question": "<p>Question</p>",
                "correct_objects": [answerObjectId],
                "config": {
                    points: 10
                }
            }
        },
        answer_objects: {
            [answerObjectId]: {
                content: "<p>Option</p>"
            }
        }
    })
}


