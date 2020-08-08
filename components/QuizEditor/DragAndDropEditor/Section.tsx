import React, {useContext, useState} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import AddButton from "../../Editor/AddButton";

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {setDocument, document} = useContext(QuizContext)
    const [isCollapsed, toggleIsCollapsed] = useState(false);

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

    const addSection = () => {

        setDocument(prevState => {
            const newSectionId = uuidv4()
            const newId = uuidv4()
            const newObjectId = uuidv4()
            const newData = update(prevState, {
                config: {
                    sections: {
                        $splice: [[index + 1, 0, newSectionId]]
                    }

                },
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
                        [newSectionId]: {
                            $set: {
                                title: prevState.sections.length + 1,
                                items: [newId]
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
        <div className="mb-8 group">
            <div className="mb-4">
                <h1 className="text-2xl text-gray-800 font-semibold ">Section {index + 1}<span
                    className="text-gray-300 mx-2">
                    <button className="focus:outline-none"><i
                        className="fas fa-sliders-h mx-2 hover:text-gray-400 focus:text-gray-400 active:text-gray-500 transition-color duration-150"/></button>
                    {isCollapsed ?
                        <button className="focus:outline-none" onClick={() => toggleIsCollapsed(false)}><i
                            className="far fa-caret-square-down mx-2 hover:text-gray-400 focus:text-gray-400 active:text-gray-500 transition-color duration-150"/>
                        </button>
                        :
                        <button className="focus:outline-none" onClick={() => toggleIsCollapsed(true)}><i
                            className="far fa-caret-square-up mx-2 hover:text-gray-400 focus:text-gray-400 active:text-gray-500 transition-color duration-150"/>
                        </button>
                    }

                </span></h1>


            </div>
            {!isCollapsed ? <ItemDnd section={section}/> : <button onClick={() => toggleIsCollapsed(false)}
                                                                   className="bg-white border border-gray-300 px-4 py-4 rounded-lg focus:outline-none w-full text-left">
                <h2 className="text-lg font-semibold text-gray-800">{document.sections[section].items.length} items</h2>
            </button>}

            <div className="flex justify-between mt-4 invisible group-hover:visible ">
                <button type="button" onClick={() => addSection()}
                        className="inline-flex items-center border-gray-300 text-lg leading-4 font-medium rounded-md text-gray-300 bg-transparent hover:text-gray-400 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-300 transition ease-in-out duration-150">
                    <svg width="32" height="32" viewBox="0 0 24 24" className="mr-2" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 9V12M12 12V15M12 12H15M12 12H9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    New Section
                </button>
            </div>
        </div>
    )
}
export default Section
