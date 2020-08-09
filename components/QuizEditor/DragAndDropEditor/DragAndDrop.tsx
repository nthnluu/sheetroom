import React, {useContext, useState} from "react";
import arrayMove from 'array-move';
import QuizContext from "../QuizContext";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ItemCard from "./ItemCard";
import update from "immutability-helper";
import JsonDebugBox from "../../JsonDebugBox";


interface Props {
    section: string;
    sectionIndex: any;
    collapseSection: any;
}

export const ItemDnd: React.FC<Props> = ({section, sectionIndex, collapseSection}) => {
        const {document, setDocument, currentItem, setCurrentItem} = useContext(QuizContext)

        const onSortEnd = (result) => {
            const {source, destination} = result;

            // dropped outside the list
            if (!destination) {
                return;
            }

            setDocument(prevState => {
                const newData = update(prevState, {
                        sections: {
                            [section]: {
                                items:
                                    {$set: arrayMove(prevState.sections[section].items, source.index, destination.index)}
                            }
                        }
                    }
                )
                return newData
            })
            // if (source.droppableId === destination.droppableId) {
            //
            // } else {
            //     setDocument(prevState => {
            //             const newData = update(prevState, {
            //                 sections: {
            //                     [destination.droppableId]: {
            //                         items: {
            //                             $splice: [[destination.index, 0, prevState.sections[section].items[source.index]]]
            //                         }
            //                     },
            //                     [section]: {
            //                         items: {
            //                             $set: [[source.index, 1, null]]
            //                         }
            //                     }
            //                 }
            //             })
            //             return newData
            //         }
            //     )
            // }
        }


        return (
            <DragDropContext onDragEnd={onSortEnd}>
                <Droppable droppableId={section}>
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {document.sections[section].items.map((itemId, index) => <Draggable key={itemId}
                                                                                                draggableId={itemId}
                                                                                                index={index}>
                                {(provided, snapshot) => <div ref={provided.innerRef}
                                                              {...provided.draggableProps}>
                                    <ItemCard
                                        collapseSection={collapseSection}
                                        sectionIndex={sectionIndex}
                                        snapshot={snapshot}
                                        section={section}
                                        provided={provided}
                                        active={currentItem === itemId}
                                        itemIndex={index}
                                        setActive={() => setCurrentItem(itemId)}
                                        item={itemId}/></div>}
                            </Draggable>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

    }
;


export default ItemDnd
