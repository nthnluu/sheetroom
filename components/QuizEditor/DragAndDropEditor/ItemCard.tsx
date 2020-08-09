import React, {useContext} from "react";
import ActiveContent from "./ActiveContent";
import InactiveContent from "./InactiveContent";
import {motion} from "framer-motion"
import update from "immutability-helper";
import {v4 as uuidv4} from 'uuid';
import QuizContext from "../QuizContext";

interface Props {
    item: string;
    active: boolean;
    provided: object;
    itemIndex: number;
    setActive: any
    section: string;
    snapshot: any;
}

const DragHandle = ({provided}) => (<i {...provided.dragHandleProps}
                                       className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const ItemCard: React.FC<Props> = ({setActive, item, active, provided, itemIndex, section, snapshot, sectionIndex}) => {

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
                    <ActiveContent item={item} itemIndex={itemIndex} section={section} condensed={snapshot.isDragging}/>
                </div> : <div className="group bg-white rounded-lg border border-gray-200 pt-4 md:pt-0">
                    <div className="w-full mx-auto text-center z-50 invisible group-hover:visible hidden md:block">
                        <DragHandle
                            provided={provided}/></div>
                    <InactiveContent item={item} setActive={(id) => setActive(id)}
                                     itemIndex={itemIndex} condensed={snapshot.isDragging}/>
                </div>}
            </motion.div>
            {active ? <div className="w-full bg-white rounded-md shadow-md z-50 px-6 sm:px-6 py-3 mb-8 flex justify-between md:justify-start md:space-x-6">
                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100" onClick={() => addMcItem()}>
                    <img src="/question_icons/MultipleChoice.jpg" className="h-6"/>
                </button>

                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                    <img src="/question_icons/MultipleAnswers.jpg" className="h-6"/>
                </button>

                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                    <img src="/question_icons/ShortAnswer.jpg" className="h-6"/>
                </button>

                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                    <img src="/question_icons/Paragraph.jpg" className="h-6"/>
                </button>

                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100">
                    <img src="/question_icons/Math.jpg" className="h-6"/>
                </button>
                <button className="hover:opacity-75 focus:opacity-75 transition-opacity duration-100" onClick={()=>addSection()}>
                    <img src="/question_icons/Section.jpg" className="h-6"/>
                </button>
            </div>:null}
        </div>
    )
}

export default ItemCard
