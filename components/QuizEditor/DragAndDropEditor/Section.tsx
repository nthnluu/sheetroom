import React, {useContext} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import SpeedDials from "../../SpeedDial/SpeedDial";

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
            <div className="flex justify-between mt-4">
                <button type="button" onClick={() => addMcItem()}
                        className="inline-flex items-center border-gray-300 text-lg leading-4 font-medium rounded-md text-gray-500 bg-transparent hover:text-gray-400 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-300 transition ease-in-out duration-150">
                    <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    New Item
                </button>
            </div>
        </div>
    )
}
export default Section
