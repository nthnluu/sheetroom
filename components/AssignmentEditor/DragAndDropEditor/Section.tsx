import React, {useContext, useState} from "react";
import ItemDnd from "./DragAndDrop";
import QuizContext from "../QuizContext";
import update from "immutability-helper";
import NewTooltip from "../../Misc/Tooltip";
import SectionOptionsModal from "../../Modals/SectionOptionsModal";

interface Props {
    section: string;
    index: number;
}

const Section: React.FC<Props> = ({section, index}) => {
    const {setDocument, document} = useContext(QuizContext)
    const [isCollapsed, toggleIsCollapsed] = useState(false);
    const [settingsOpen, toggleSettingsOpen] = useState(false);


    return (
        <div className="mb-12">
            <SectionOptionsModal isOpen={settingsOpen} onCancel={() => toggleSettingsOpen(false)}/>
            <div
                className="mb-2 flex justify-start items-center bg-white border border-gray-100 shadow-sm rounded-lg p-4">
                <div className="w-full">
                    <span
                        className="px-2 py-1 text-sm uppercase rounded-full font-semibold text-blue-500 bg-blue-50">Section {index + 1} of {document.config.sections.length}</span>
                    <div className="my-2 w-full">
                        <label htmlFor="title" className="sr-only">Section Title</label>
                        <div className="relative w-full">
                            <input id="title"
                                   className="rounded-lg border border-transparent w-full font-semibold text-gray-800 hover:border-gray-200 focus:border-blue-500 transition-all duration-150 focus:outline-none p-2 bg-transparent block w-full text-xl sm:leading-5"
                                   placeholder="Untitled Section" value={document.sections[section].title}
                                   onChange={event =>{
                                       const newValue = event.target.value
                                       setDocument(prevState => {
                                           return update(prevState, {
                                               sections: {
                                                   [section]: {
                                                       title: {
                                                           $set: newValue
                                                       }
                                                   }
                                               }

                                           })
                                       })
                                   }}/>
                        </div>
                    </div>
                    <span
                        className="text-gray-300 mx-2 space-x-2">
                    {isCollapsed ?
                        <NewTooltip title="Expand" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <button type="button" onClick={() => toggleIsCollapsed(false)}
                                    className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 4H16M3 8H12M3 12H12M17 8V20M17 20L13 16M17 20L21 16"
                                          stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
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
                                    <path d="M3 4H16M3 8H12M3 12H9M13 12L17 8M17 8L21 12M17 8V20" stroke="currentColor"
                                          strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
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
                                        strokeWidth="1.75" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </NewTooltip>
                </span>

                </div>


            </div>
            {!isCollapsed ?
                <ItemDnd section={section} sectionIndex={index} collapseSection={() => toggleIsCollapsed(true)}/>
                :
                <button onClick={() => toggleIsCollapsed(false)}
                        className="bg-gray-200 opacity-50 mb-2 px-6 py-2 rounded-lg focus:outline-none w-full text-left">
                    <h2 className="font-medium text-black">{document.sections[section].items.length} items</h2>
                </button>}
        </div>
    )
}
export default Section
