import React, {useContext} from "react";
import QuizContext from "../QuizContext";
import {Draggable, Droppable} from 'react-beautiful-dnd';
import ItemCard from "./ItemCard";


interface Props {
    section: string;
    sectionIndex: any;
    collapseSection: any;
}

export const ItemDnd: React.FC<Props> = ({section, sectionIndex, collapseSection}) => {
        const {document, currentItem, setCurrentItem} = useContext(QuizContext)




        return (
            <Droppable droppableId={section}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {document.sections[section].items.map((itemId, index) => <Draggable key={itemId}
                                                                                            draggableId={itemId} index={index}>
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

        );

    }
;


export default ItemDnd
