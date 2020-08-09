import React, {useContext, useState} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import AddButton from "../../Editor/AddButton";
import NewTooltip from "../../Misc/Tooltip";

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {setDocument, document, setCurrentItem} = useContext(QuizContext)
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
                                $unshift: [newId]
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
            setCurrentItem(newId)
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
            setCurrentItem(newId)
            return newData
        })
    }

    return (
        <div className="mb-8">
            <div className="mb-4 flex justify-start items-center">
                <h1 className="text-2xl text-gray-800 font-semibold mr-1">Section {index + 1}</h1>
                <span
                    className="text-gray-300 mx-2 space-x-2">
                    <NewTooltip title="Add item" placement="bottom" enterDelay={500}
                                enterNextDelay={500}>
                            <button type="button" onClick={() => addMcItem()}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 6V12M12 12V18M12 12H18M12 12L6 12"
                                        strokeWidth="2" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>
                    {isCollapsed ?
                        <NewTooltip title="Expand" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(false)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 9L12 16L5 9" strokeWidth="2" strokeLinecap="round"
                                          className="stroke-current"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>
                        :
                        <NewTooltip title="Collapse" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(true)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200  focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 15L12 8L19 15" strokeWidth="2" strokeLinecap="round"
                                          className="stroke-current"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>
                    }

                    <NewTooltip title="Options" placement="bottom" enterDelay={500}
                                enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(false)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                                        strokeWidth="2" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>

                </span>


            </div>
            {!isCollapsed ? <ItemDnd section={section} sectionIndex={index}/> : <button onClick={() => toggleIsCollapsed(false)}
                                                                   className="bg-white border border-gray-300 mb-2 px-4 py-4 rounded-lg focus:outline-none w-full text-left">
                <h2 className="text-lg font-semibold text-gray-800">{document.sections[section].items.length} items</h2>
            </button>}
        </div>
    )
}
export default Section
