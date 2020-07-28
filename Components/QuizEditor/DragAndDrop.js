import CardFrame from "./CardFrame";
import React, {useContext, useState} from "react";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import JsonDebugBox from "../JsonDebugBox";
import QuizContext from "./QuizContext";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const ItemCard = ({active, itemIndex, item, setActive, provided}) => (
    <>
        {active ? <div className="mb-2 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="w-full text-center z-50"><DragHandle provided={provided}/></div>
            <ActiveCard item={item} itemIndex={itemIndex}/>
        </div> : <div className="mb-2 group bg-white rounded-lg border border-gray-200">
            <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle
                provided={provided}/></div>
            <InactiveCard item={item} setActive={(id) => setActive(id)} itemIndex={itemIndex}/>
        </div>}
    </>
)

const DragHandle = ({provided}) => (<i tabIndex="0" {...provided.dragHandleProps}
                                       className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const InactiveCard = ({active, setSaveStatus, item, itemIndex, setActive}) => {
    return (<div onClick={(e) => {
        setActive(item.id)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <button onClick={() => {
            setActive(item.id)
        }}
                className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} itemIndex={itemIndex}
                       active={active} item={item}/>
        </button>
    </div>)
};

const ActiveCard = ({setSaveStatus, item, itemIndex}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} itemIndex={itemIndex}
                       active={true} item={item}/>
        </div>)
};


export const DnDList = ({items, setSaveStatus}) => {
    const [selectedItem, setSelectedItem] = useState('');
    const {quiz, dispatch} = useContext(QuizContext);

    const onSortEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        dispatch({
            type: 'UPDATE-ITEM-ARRAY',
            payload: arrayMove(quiz.sections[0].items, result.source.index, result.destination.index)
        })
    };


    return (
        <DragDropContext onDragEnd={onSortEnd}>
            <Droppable droppableId={quiz.sections[0].id}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {quiz.sections[0].items.map((item, index) => <Draggable key={item.id} draggableId={item.id}
                                                                                index={index}>
                            {(provided, snapshot) => <div ref={provided.innerRef}
                                                          {...provided.draggableProps}>
                                <ItemCard
                                    provided={provided}
                                    active={selectedItem === item.id}
                                    itemIndex={index}
                                    setActive={() => setSelectedItem(item.id)}
                                    item={item}/></div>}
                        </Draggable>)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

};


export default DnDList
