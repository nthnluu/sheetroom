import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import arrayMove from "array-move";
import exp from "constants";
import {v4 as uuidv4} from 'uuid';

const DotRow = () => {
    const [currentState, setCurrentState] = useState(["hello","hasdello","headllo","hellweo","h qwello","wehello"])
    const newId = uuidv4()
    const [objectId] = useState(newId)

    const onSortEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newArray = arrayMove(currentState, result.source.index, result.destination.index)
        // @ts-ignore
        setCurrentState(newArray)

    }


    return (<DragDropContext onDragEnd={onSortEnd}>
        <Droppable droppableId={"droppable"} direction="horizontal">
            {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex justify-between w-full">
                    {currentState.map((item, index) => <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => <div ref={provided.innerRef}
                                                      {...provided.draggableProps}>
                            <div className="p-8">
                                <div className="bg-red-400 h-2 w-2" {...provided.dragHandleProps}/>
                            </div>
                        </div>}
                    </Draggable>)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DragDropContext>)
}
export default DotRow
