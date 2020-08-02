import React, {useContext} from "react";
import ItemDnd from "./DragAndDrop";
import JsonDebugBox from "../../JsonDebugBox";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {document, setDocument} = useContext(QuizContext)

    const addMcItem = () => {

        setDocument(prevState => {
            const newId = uuidv4()
            const newObjectId = uuidv4()
            const newData = update(prevState, {
                    items: {
                        [newId]: {
                            $set: {
                                content: "<p>Option</p>",
                                controller_type: "MC",
                                answer_objects: [newObjectId],
                                correct_objects: [newObjectId]
                            }
                        }
                    }, sections: {
                        [section]: {
                            items: {
                                $push: [newId]
                            }
                        }
                    },
                    answer_objects: {
                        [newObjectId]: {
                            $set: {
                                content: "<p>Cum!</p>"
                            }
                        }
                    }
                }
            )
            return newData
        })
    }

    return (
        <div className="mb-8">
            <div className="bg-white border px-8 py-6 text-gray-700 rounded-lg mb-2">
                <h1 className="text-xl font-semibold">Section {index + 1}</h1>
            </div>
            <ItemDnd section={section}/>
            <div>
                <button onClick={() => addMcItem()}>New MC Question</button>
            </div>
        </div>
    )
}
export default Section
