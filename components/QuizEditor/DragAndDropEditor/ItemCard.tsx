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
                    <ActiveContent item={item} itemIndex={itemIndex} section={section} condensed={snapshot.isDragging} sectionIndex={sectionIndex}/>
                </div> : <div className="group bg-white rounded-lg border border-gray-200 pt-4 md:pt-0">
                    <div className="w-full mx-auto text-center z-50 invisible group-hover:visible hidden md:block">
                        <DragHandle
                            provided={provided}/></div>
                    <InactiveContent item={item} setActive={(id) => setActive(id)}
                                     itemIndex={itemIndex} condensed={snapshot.isDragging}/>
                </div>}
            </motion.div>
            {active ? <div className="pb-6"><div
                className="w-full bg-white rounded-lg shadow-md z-50 px-6 sm:px-6 py-3 flex justify-between md:max-w-sm md:space-x-4">


                <NewTooltip title="Multiple Choice" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100"
                            onClick={() => addMcItem()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <g data-name="Rectangle 1" transform="translate(53)" fill="#707070" stroke="#707070">
                                    <rect width="47" height="47" rx="23.5" stroke="none"/>
                                    <rect x=".5" y=".5" width="46" height="46" rx="23" fill="none"/>
                                </g>
                                <g data-name="Rectangle 2" transform="translate(53 53)" fill="#707070" stroke="#707070" strokeWidth="7">
                                    <rect width="47" height="47" rx="23.5" stroke="none"/>
                                    <rect x="3.5" y="3.5" width="40" height="40" rx="20" fill="none"/>
                                </g>
                                <g data-name="Rectangle 3" transform="translate(0 53)" fill="#707070" stroke="#707070">
                                    <rect width="47" height="47" rx="23.5" stroke="none"/>
                                    <rect x=".5" y=".5" width="46" height="46" rx="23" fill="none"/>
                                </g>
                                <g data-name="Rectangle 4" fill="none" stroke="#707070" strokeWidth="7">
                                    <rect width="47" height="47" rx="23.5" stroke="none"/>
                                    <rect x="3.5" y="3.5" width="40" height="40" rx="20"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </NewTooltip>

                <NewTooltip title="Multiple Answers" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <g data-name="Rectangle 1" transform="translate(53)" fill="#707070" stroke="#707070">
                                    <rect width="47" height="47" rx="13" stroke="none"/>
                                    <rect x=".5" y=".5" width="46" height="46" rx="12.5" fill="none"/>
                                </g>
                                <g data-name="Rectangle 2" transform="translate(53 53)" fill="none" stroke="#707070" strokeWidth="7">
                                    <rect width="47" height="47" rx="13" stroke="none"/>
                                    <rect x="3.5" y="3.5" width="40" height="40" rx="9.5"/>
                                </g>
                                <g data-name="Rectangle 3" transform="translate(0 53)" fill="#707070" stroke="#707070">
                                    <rect width="47" height="47" rx="13" stroke="none"/>
                                    <rect x=".5" y=".5" width="46" height="46" rx="12.5" fill="none"/>
                                </g>
                                <g data-name="Rectangle 4" fill="none" stroke="#707070" strokeWidth="7">
                                    <rect width="47" height="47" rx="13" stroke="none"/>
                                    <rect x="3.5" y="3.5" width="40" height="40" rx="9.5"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </NewTooltip>

                <NewTooltip title="Short Answer" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <g data-name="Rectangle 4" fill="none" stroke="#707070" strokeWidth="8">
                                    <rect width="100" height="100" rx="13" stroke="none"/>
                                    <rect x="4" y="4" width="92" height="92" rx="9"/>
                                </g>
                                <text transform="translate(16 66)" fill="#707070" fontSize="52" fontFamily="AdellePE-Bold, Adelle PE" fontWeight="700">
                                    <tspan x="0" y="0">Aa</tspan>
                                </text>
                            </g>
                        </svg>
                    </button>
                </NewTooltip>

                <NewTooltip title="Paragraph" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <g data-name="Rectangle 4" fill="none" stroke="#707070" strokeWidth="8">
                                    <rect width="100" height="100" rx="13" stroke="none"/>
                                    <rect x="4" y="4" width="92" height="92" rx="9"/>
                                </g>
                                <text transform="translate(13 48)" fill="#707070" fontSize="38" fontFamily="AdellePE-Bold, Adelle PE" fontWeight="700">
                                    <tspan x="0" y="0">T</tspan>
                                </text>
                                <path data-name="Line 1" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="7" d="M82.5 23.5h-37"/>
                                <path data-name="Line 2" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="7" d="M82.5 41.5h-37"/>
                                <path data-name="Line 4" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="7" d="M82.5 59.5h-65"/>
                                <path data-name="Line 5" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="7" d="M82.5 77.5h-65"/>
                            </g>
                        </svg>
                    </button>
                </NewTooltip>

                <NewTooltip title="Math" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <g data-name="Rectangle 4" fill="none" stroke="#707070" strokeWidth="8">
                                    <rect width="100" height="100" rx="13" stroke="none"/>
                                    <rect x="4" y="4" width="92" height="92" rx="9"/>
                                </g>
                                <text data-name="f(x)" transform="translate(17 60)" fill="#707070" fontSize="38" fontFamily="AdellePE-BoldItalic, Adelle PE" fontWeight="700" fontStyle="italic">
                                    <tspan x="0" y="0">f(x)</tspan>
                                </text>
                            </g>
                        </svg>

                    </button>
                </NewTooltip>

                <NewTooltip title="Section" placement="bottom" enterDelay={100}
                            enterNextDelay={100}>
                    <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100"
                            onClick={() => addSection()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-6">
                            <defs>
                                <clipPath id="a">
                                    <path d="M0 0h100v100H0z"/>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)">
                                <path fill="#fff" d="M0 0h100v100H0z"/>
                                <path d="M81.479 45.819H17.92m63.559 0a9.08 9.08 0 019.08 9.08v27.24a9.08 9.08 0 01-9.08 9.08H17.92a9.08 9.08 0 01-9.08-9.08V54.9a9.08 9.08 0 019.08-9.08m63.559 0v-9.08a9.08 9.08 0 00-9.08-9.08M17.92 45.819V36.74A9.08 9.08 0 0127 27.66m0 0v-9.08a9.08 9.08 0 019.08-9.08h27.24a9.08 9.08 0 019.08 9.08v9.08m-45.4 0h45.4" fill="none" stroke="#707070" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"/>
                            </g>
                        </svg>

                    </button>
                </NewTooltip>
            </div></div> : null}
        </div>
    )
}

export default ItemCard
