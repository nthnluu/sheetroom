import CardFrame from "./CardFrame";
import React, {useContext} from "react";
import arrayMove from 'array-move';
import QuizContext from "./QuizContext";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';


const ItemCard = ({active, item, setActive, provided, setSaveStatus, itemIndex}) => (
    <div className="pb-4" key={item}>
        {active ? <div className="bg-white rounded-lg border border-gray-300 shadow-xl">
            <div className="w-full text-center z-50"><DragHandle provided={provided}/></div>
            <ActiveCard item={item} setSaveStatus={status => setSaveStatus(status)} itemIndex={itemIndex}/>
        </div> : <div className="group bg-white rounded-lg border border-gray-200">
            <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle
                provided={provided}/></div>
            <InactiveCard item={item} setActive={(id) => setActive(id)}
                          setSaveStatus={status => setSaveStatus(status)} itemIndex={itemIndex}/>
        </div>}
    </div>
)

const DragHandle = ({provided}) => (<div tabIndex="0" {...provided.dragHandleProps}
                                       className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const InactiveCard = ({active, setSaveStatus, item, setActive, itemIndex}) => {
    return (<div onClick={(e) => {
        setActive(item.id)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <button onClick={() => {
            setActive(item.id)
        }}
                className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemIndex={itemIndex}
                       active={active} item={item}/>
        </button>
    </div>)
};

const ActiveCard = ({setSaveStatus, item, itemIndex}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemIndex={itemIndex}
                       active={true} item={item}/>
        </div>
    )
};


export const DnDList = ({currentItem, setCurrentItem}) => {
    const {setAssignment, assignment, items, setSections, document, sections} = useContext(QuizContext);
    const sectionId = document.config.sections[0]

    const onSortEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        setSections(prevState => ({...prevState, [sectionId]: {items: arrayMove(items, result.source.index, result.destination.index)}}))

    }


    return (
        <DragDropContext onDragEnd={onSortEnd}>
            <Droppable droppableId={'_droppable'}>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {sections[sectionId].items.map((itemId, index) => <Draggable key={itemId} draggableId={itemId}
                                                                                 index={index}>
                            {(provided, snapshot) => <div ref={provided.innerRef}
                                                          {...provided.draggableProps}>
                                <ItemCard
                                    setSaveStatus={status => setSaveStatus(status)}
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


export default DnDList
