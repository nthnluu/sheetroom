import CardFrame from "../CardFrame";
import React, {useContext, useState} from "react";
import arrayMove from 'array-move';
import QuizContext from "../QuizContext";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ItemCard from "./ItemCard";
import update from "immutability-helper";



interface Props {
    section: string;

}

export const ItemDnd:React.FC<Props> = ({section}) => {
    const {document, setDocument} = useContext(QuizContext)
    const [currentItem, setCurrentItem] = useState(document.config.sections[0]);

    const onSortEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        setDocument(prevState => {
            const newData = update(prevState, {
                    sections: {
                        [section]: {items:
                                {$set: arrayMove(prevState.sections[section].items, result.source.index, result.destination.index)}}
                    }
                }
            )
            return newData
        })

    }


    return (
        <DragDropContext onDragEnd={onSortEnd}>
            <Droppable droppableId={'droppable_' + section}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {document.sections[section].items.map((itemId, index) => <Draggable key={itemId} draggableId={itemId}
                                                                                   index={index}>
                            {(provided, snapshot) => <div ref={provided.innerRef}
                                                          {...provided.draggableProps}>
                                <ItemCard
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

};


export default ItemDnd
