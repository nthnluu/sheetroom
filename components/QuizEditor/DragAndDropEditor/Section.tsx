import React, {useContext} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {setDocument} = useContext(QuizContext)

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
                                content: "<p><br/></p>"
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
            <div className="mb-4">
                <h1 className="text-2xl text-gray-800 font-semibold ">Section {index + 1}</h1>
            </div>
            <ItemDnd section={section}/>
            <div className="flex justify-between">
                <button type="button" onClick={() => addMcItem()}
                        className="inline-flex items-center px-3 py-2 border-2 border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                    New Item
                </button>
            </div>
        </div>
    )
}
export default Section
