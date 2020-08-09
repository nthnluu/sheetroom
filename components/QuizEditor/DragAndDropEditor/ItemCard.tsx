import React, {useContext} from "react";
import ActiveContent from "./ActiveContent";
import InactiveContent from "./InactiveContent";
import {motion} from "framer-motion"
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import QuizContext from "../QuizContext";
import NewTooltip from "../../Misc/Tooltip";

interface Props {
    item: string;
    active: boolean;
    provided: object;
    itemIndex: number;
    setActive: any
    section: string;
    snapshot: any;
    sectionIndex: any;
    collapseSection: any;
}

const DragHandle = ({provided}) => (<i {...provided.dragHandleProps}
                                       className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const ItemCard: React.FC<Props> = ({setActive, item, active, provided, itemIndex, section, snapshot, sectionIndex, collapseSection}) => {

    const {setDocument, document, setCurrentItem} = useContext(QuizContext)
    const addSection = () => {

        setDocument(prevState => {
            const newSectionId = uuidv4()
            const newId = uuidv4()
            const newObjectId = uuidv4()
            const newData = update(prevState, {
                    config: {
                        sections: {
                            $splice: [[sectionIndex + 1, 0, newSectionId]]
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
            collapseSection()
            return newData
        })
    }
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
                                $splice: [[itemIndex + 1, 0, newId]]
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
        <div className="relative">
            <motion.div whileTap={!active ? {scale: 0.98} : null} className="pb-2 relative" key={item}>
                {active ? <div className="bg-white rounded-lg border border-gray-200 shadow pt-2 md:pt-0 relative">
                    <div className="w-full text-center z-50 hidden md:block"><DragHandle provided={provided}/></div>
                    <ActiveContent item={item} itemIndex={itemIndex} section={section} condensed={snapshot.isDragging}
                                   sectionIndex={sectionIndex}/>
                </div> : <div className="group bg-white rounded-lg border border-gray-200 pt-4 md:pt-0">
                    <div className="w-full mx-auto text-center z-50 invisible group-hover:visible hidden md:block">
                        <DragHandle
                            provided={provided}/></div>
                    <InactiveContent item={item} setActive={(id) => setActive(id)}
                                     itemIndex={itemIndex} condensed={snapshot.isDragging}/>
                </div>}
            </motion.div>
            {active ? <div className="pb-6">
                <div
                    className="w-full bg-white rounded-lg shadow-md z-50 px-6 sm:px-6 py-3 flex justify-between md:max-w-sm md:space-x-4">


                    <NewTooltip title="Multiple Choice" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100"
                                onClick={() => addMcItem()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <g data-name="Rectangle 1" transform="translate(53)" fill="currentColor"
                                       stroke="currentColor">
                                        <rect width="47" height="47" rx="23.5" stroke="none"/>
                                        <rect x=".5" y=".5" width="46" height="46" rx="23" fill="none"/>
                                    </g>
                                    <g data-name="Rectangle 2" transform="translate(53 53)" fill="currentColor"
                                       stroke="currentColor" strokeWidth="7">
                                        <rect width="47" height="47" rx="23.5" stroke="none"/>
                                        <rect x="3.5" y="3.5" width="40" height="40" rx="20" fill="none"/>
                                    </g>
                                    <g data-name="Rectangle 3" transform="translate(0 53)" fill="currentColor"
                                       stroke="currentColor">
                                        <rect width="47" height="47" rx="23.5" stroke="none"/>
                                        <rect x=".5" y=".5" width="46" height="46" rx="23" fill="none"/>
                                    </g>
                                    <g data-name="Rectangle 4" fill="none" stroke="currentColor" strokeWidth="7">
                                        <rect width="47" height="47" rx="23.5" stroke="none"/>
                                        <rect x="3.5" y="3.5" width="40" height="40" rx="20"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </NewTooltip>

                    <NewTooltip title="Multiple Answers" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <g data-name="Rectangle 1" transform="translate(53)" fill="currentColor"
                                       stroke="currentColor">
                                        <rect width="47" height="47" rx="13" stroke="none"/>
                                        <rect x=".5" y=".5" width="46" height="46" rx="12.5" fill="none"/>
                                    </g>
                                    <g data-name="Rectangle 2" transform="translate(53 53)" fill="none" stroke="currentColor"
                                       strokeWidth="7">
                                        <rect width="47" height="47" rx="13" stroke="none"/>
                                        <rect x="3.5" y="3.5" width="40" height="40" rx="9.5"/>
                                    </g>
                                    <g data-name="Rectangle 3" transform="translate(0 53)" fill="currentColor"
                                       stroke="currentColor">
                                        <rect width="47" height="47" rx="13" stroke="none"/>
                                        <rect x=".5" y=".5" width="46" height="46" rx="12.5" fill="none"/>
                                    </g>
                                    <g data-name="Rectangle 4" fill="none" stroke="currentColor" strokeWidth="7">
                                        <rect width="47" height="47" rx="13" stroke="none"/>
                                        <rect x="3.5" y="3.5" width="40" height="40" rx="9.5"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </NewTooltip>

                    <NewTooltip title="Short Answer" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                                <defs>
                                    <clipPath id="a">
                                        <path fill="none" d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <g fill="none">
                                        <rect width="100" height="100" rx="13"/>
                                        <rect x="4" y="4" width="92" height="92" rx="9" stroke="currentColor" strokeWidth="8"/>
                                    </g>
                                    <g fill="currentColor">
                                        <path d="M38.88 66v-4.06l4.27-.46-1.88-5.41H28.38l-1.82 5.41 4.1.46V66h-14.5v-4.06l2.28-.57c.63-.15 1.1-.36 1.3-1l11.39-32h9.21l11.33 32.12c.21.62.63.73 1.25.88l2.39.57V66zm-3.8-29.69h-.31L30 50.45h9.72zM74.29 66l-.52-2.81h-.26a11.72 11.72 0 01-8.73 3.48c-6.56 0-7.6-4.47-7.6-7.69 0-5.2 3.23-7.59 9.73-8l6-.42v-2.92c0-2.44-.26-4.1-3.49-4.1-2.49 0-3.79.36-3.79 3.48l-7.33-.62c0-7 6.39-8 11.18-8 7.9 0 11.07 2.13 11.07 9.41v12.63c0 .83 0 .93.83 1l2.5.41V66zm-1.4-11.18l-3.54.26c-3.07.21-4.16 1-4.16 3.07s1.25 2.86 3 2.86a8.6 8.6 0 004.73-1.87z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </NewTooltip>

                    <NewTooltip title="Paragraph" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 100 100">
                                <defs>
                                    <clipPath id="a">
                                        <path fill="none" d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <g fill="none">
                                        <rect width="100" height="100" rx="13"/>
                                        <rect x="4" y="4" width="92" height="92" rx="9" stroke="currentColor" strokeWidth="8"/>
                                    </g>
                                    <g>
                                        <path d="M18.74 48v-3l3.91-.27c.53 0 .61-.19.61-.76V24.63h-3.91c-.42 0-.54 0-.61.42l-.61 3.12-4.13.19v-7.87h24.42v7.87l-4.14-.19-.61-3.12c-.08-.38-.19-.42-.61-.42h-3.91V44c0 .53 0 .69.61.72l4.18.31v3z" fill="currentColor"/>
                                    </g>
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="7" d="M82.5 23.5h-37M82.5 41.5h-37M82.5 59.5h-65M82.5 77.5h-65"/>
                                </g>
                            </svg>
                        </button>
                    </NewTooltip>

                    <NewTooltip title="Math" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                                <defs>
                                    <clipPath id="a">
                                        <path fill="none" d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <g fill="none">
                                        <rect width="100" height="100" rx="13"/>
                                        <rect x="4" y="4" width="92" height="92" rx="9" stroke="currentColor" stroke-width="8"/>
                                    </g>
                                    <g fill="currentColor">
                                        <path d="M18.52 68.05l3.38-23.67c0-.22 0-.38-.26-.38h-2.47l.49-3.79h2.81l.34-2.44c.73-5.09 3.54-6.91 7.68-6.91a11.79 11.79 0 016.53 2l-2.09 3.54A7.78 7.78 0 0031.1 35c-1.64 0-2.44.87-2.66 2.54l-.31 2.25c0 .26 0 .38.27.38h5.85L33.72 44h-6.16l-3.38 24zM39.53 66.57a28.64 28.64 0 01-4-14.4c0-8.32 4.3-15 9.27-20.44l3.88 2.55c-5 6.27-7.11 11.51-7.11 18.31a26 26 0 002.7 11.51zM61.69 60l-.42-.34-1.71-3.16-2.05-3.5-3.46 3.87 2 .35-.29 2.78h-8.89l.3-2.74 1.67-.3a1.63 1.63 0 001.07-.65l5.58-6.11-3.84-6.2a1 1 0 00-.75-.64l-1.49-.35.46-2.84h6l.38.3 1.79 3.42 1.67 2.81 3.3-3.46-1.82-.24.5-2.81h8.62L69.93 43l-1.67.38c-.46.07-.65.26-1.06.72l-5.44 5.47 4.14 6.65c.27.42.42.61.84.68l1.94.31-.46 2.79zM68.79 64c5.09-6.27 7.11-11.52 7.11-18.32a26.59 26.59 0 00-2.66-11.48L78 31.73a28.31 28.31 0 014 14.44c0 8.28-4.29 14.93-9.23 20.4z"/>
                                    </g>
                                </g>
                            </svg>


                        </button>
                    </NewTooltip>

                    <NewTooltip title="Section" placement="bottom" enterDelay={100}
                                enterNextDelay={100}>
                        <button className="text-gray-500 hover:text-gray-400 focus:text-gray-400 transition-color duration-100"
                                onClick={() => addSection()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                                <defs>
                                    <clipPath id="a">
                                        <path d="M0 0h100v100H0z"/>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)">
                                    <path fill="#fff" d="M0 0h100v100H0z"/>
                                    <path
                                        d="M81.479 45.819H17.92m63.559 0a9.08 9.08 0 019.08 9.08v27.24a9.08 9.08 0 01-9.08 9.08H17.92a9.08 9.08 0 01-9.08-9.08V54.9a9.08 9.08 0 019.08-9.08m63.559 0v-9.08a9.08 9.08 0 00-9.08-9.08M17.92 45.819V36.74A9.08 9.08 0 0127 27.66m0 0v-9.08a9.08 9.08 0 019.08-9.08h27.24a9.08 9.08 0 019.08 9.08v9.08m-45.4 0h45.4"
                                        fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="8"/>
                                </g>
                            </svg>

                        </button>
                    </NewTooltip>
                </div>
            </div> : null}
        </div>
    )
}

export default ItemCard
