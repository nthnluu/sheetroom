import React, {useContext, useState} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import AddButton from "../../Editor/AddButton";
import NewTooltip from "../../Misc/Tooltip";
import SectionOptionsModal from "../../Modals/SectionOptionsModal";

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {setDocument, document, setCurrentItem} = useContext(QuizContext)
    const [isCollapsed, toggleIsCollapsed] = useState(false);
    const [settingsOpen, toggleSettingsOpen] = useState(false);

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
            <SectionOptionsModal isOpen={settingsOpen} onCancel={() => toggleSettingsOpen(false)}/>
            <div className="mb-4 flex justify-start items-center">
                <h1 className="text-2xl text-gray-800 font-semibold mr-1">Section {index + 1}</h1>
                <span
                    className="text-gray-300 mx-2 space-x-2">

                    {isCollapsed ?
                        <NewTooltip title="Expand" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(false)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H14C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H8C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M13 16C13 16.5523 13.4477 17 14 17C14.5523 17 15 16.5523 15 16L15 10.4142L16.2929 11.7071C16.6834 12.0976 17.3166 12.0976 17.7071 11.7071C18.0976 11.3166 18.0976 10.6834 17.7071 10.2929L14.7071 7.29289C14.5196 7.10536 14.2652 7 14 7C13.7348 7 13.4804 7.10536 13.2929 7.29289L10.2929 10.2929C9.90237 10.6834 9.90237 11.3166 10.2929 11.7071C10.6834 12.0976 11.3166 12.0976 11.7071 11.7071L13 10.4142L13 16Z"
                                        fill="currentColor"/>
                                </svg>
                            </button>
                        </NewTooltip>
                        :
                        <NewTooltip title="Collapse" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(true)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200  focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H14C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H3Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44771 13 8L13 13.5858L11.7071 12.2929C11.3166 11.9024 10.6834 11.9024 10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071L13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17C14.2652 17 14.5196 16.8946 14.7071 16.7071L17.7071 13.7071C18.0976 13.3166 18.0976 12.6834 17.7071 12.2929C17.3166 11.9024 16.6834 11.9024 16.2929 12.2929L15 13.5858L15 8Z"
                                        fill="currentColor"/>
                                </svg>
                            </button>
                        </NewTooltip>
                    }

                    <NewTooltip title="Section options" placement="bottom" enterDelay={500}
                                enterNextDelay={500}>
                            <button type="button" onClick={() => toggleSettingsOpen(true)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                        strokeWidth="1.75" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        strokeWidth="2" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>
                </span>


            </div>
            {!isCollapsed ?
                <ItemDnd section={section} sectionIndex={index} collapseSection={() => toggleIsCollapsed(true)}/> :
                <button onClick={() => toggleIsCollapsed(false)}
                        className="bg-white border border-gray-300 mb-2 px-4 py-4 rounded-lg focus:outline-none w-full text-left">
                    <h2 className="text-lg font-semibold text-gray-800">{document.sections[section].items.length} items</h2>
                </button>}
        </div>
    )
}
export default Section
