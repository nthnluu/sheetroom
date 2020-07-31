import CardFrame from "./CardFrame";
import React, {useContext} from "react";
import arrayMove from 'array-move';
import QuizContext from "./QuizContext";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Automerge from "automerge";



const ItemCard = ({active, itemIndex, item, setActive, provided, setSaveStatus}) => (
    <div className="pb-4">
            {active ? <div className="bg-white rounded-lg border border-gray-300 shadow-xl">
                <div className="w-full text-center z-50"><DragHandle provided={provided}/></div>
                <ActiveCard item={item} itemIndex={itemIndex} setSaveStatus={status => setSaveStatus(status)}/>
            </div> : <div className="group bg-white rounded-lg border border-gray-200">
                <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle
                    provided={provided}/></div>
                <InactiveCard item={item} setActive={(id) => setActive(id)} itemIndex={itemIndex} setSaveStatus={status => setSaveStatus(status)}/>
            </div>}
    </div>
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
        </div>
    )
};


export const DnDList = ({items, setSaveStatus, currentItem, setCurrentItem}) => {
    const {setAssignment, assignment} = useContext(QuizContext);

    const onSortEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newQuestionValue = JSON.stringify(arrayMove(assignment.sections[0].items, result.source.index, result.destination.index))

        const newDoc = Automerge.change(assignment, 'Reorder Items', doc => {
            doc.sections[0].items = JSON.parse(newQuestionValue);
        })
        setAssignment(newDoc)
    }


    return (
        <DragDropContext onDragEnd={onSortEnd}>
            <Droppable droppableId={'droppable'}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.sections[0].items.map((item, index) => <Draggable key={item.id} draggableId={item.id}
                                                                                index={index}>
                            {(provided, snapshot) => <div ref={provided.innerRef}
                                                          {...provided.draggableProps}>
                                <ItemCard
                                    setSaveStatus={status => setSaveStatus(status)}
                                    provided={provided}
                                    active={currentItem === item.id}
                                    itemIndex={index}
                                    setActive={() => setCurrentItem(item.id)}
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
