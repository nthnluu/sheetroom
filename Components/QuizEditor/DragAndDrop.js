import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardFrame from "./CardFrame";
import React, {Component, useEffect, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_INDEX} from "../../gql/assignmentAutosave";
import gql from "graphql-tag";

const mutationSaveNewListOrder = (items) => {
    const mutations = items.map((item, index) => `item${index}: update_assignments_item_by_pk(pk_columns: {id: "${item.id}"}, _set: {index: ${index}}) {
    index
  }`);

    const newMutation = `mutation {
     ${mutations.join("")}
  }
`;
    return newMutation
};


const url = "/api/token";
const opts = (items) => ({
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({query: mutationSaveNewListOrder(items)}),
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    padding: grid,
    width: '100%'
});

const InactiveCard = ({isDragging, active, provided, setSaveStatus, item, index, setActive}) => {
    return (<div onClick={(e) => {
        setActive(item.id)
    }}
                    className={isDragging ? "flex justify-between rounded-lg w-full block shadow-outline border border-gray-200 z-50 text-left" : "flex border border-gray-200 w-full block justify-between rounded-lg text-left mb-4 shadow-sm transition-shadow duration-200 z-50 hover:border-gray-300 active:border-gray-400 "}
    >
        <div
            className={active ? "p-2 text-gray-400 rounded-l-lg bg-white h-96" : "p-2 text-gray-400 rounded-l-lg bg-white"}>
            <div className="py-1">
                <button className="w-full active:text-blue-500 transition-all duration-100"><i
                    className="fas fa-chevron-up"/></button>
                <i {...provided.dragHandleProps}
                   className="fas fa-grip-lines w-full text-center active:text-blue-500 transition-all duration-100"></i>
                <button className="w-full active:text-blue-500 transition-all duration-100"><i
                    className="fas fa-chevron-down"/></button>
            </div>
        </div>
        <button onClick={(e) => {
            setActive(item.id)
        }} className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none rounded-r">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} index={index}
                       active={active}/>
        </button>
    </div>)
};

const ActiveCard = ({isDragging, active, provided, setSaveStatus, item, index}) => {
    return (<div
        className={isDragging ? "flex justify-between rounded-lg shadow-outline flex-grow-0 border border-gray-200 z-50 text-left" : ("flex border border-gray-200 flex-grow-0 justify-between rounded-lg text-left mb-4 shadow-sm z-50 " + (active ? "shadow-xl border-4 border-gray-400" : null))}>
        <div
            className="p-2 text-gray-400 rounded-l-lg bg-white">
            <div className="py-1">
                <button className="w-full active:text-blue-500 transition-all duration-100"><i
                    className="fas fa-chevron-up"/></button>
                <i {...provided.dragHandleProps}
                   className="fas fa-grip-lines w-full text-center active:text-blue-500 transition-all duration-100"></i>
                <button className="w-full active:text-blue-500 transition-all duration-100"><i
                    className="fas fa-chevron-down"/></button>
            </div>
            <button
                className="w-full p-2 mt-2 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-50 focus:outline-none active:outline-none rounded-full active:text-red-500 transition-all duration-100">
                <i className="far fa-trash-alt"/></button>
        </div>
        <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} index={index}
                   active={true}/>
    </div>)
};


const DnDCard = ({item, index, setActive, active, setSaveStatus}) => {
    return (<Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
            <div ref={provided.innerRef}
                 {...provided.draggableProps}>
                {active ? <ActiveCard isDragging={snapshot.isDragging} active={active} provided={provided}
                                      setSaveStatus={status => setSaveStatus(status)} item={item} index={index}/> :
                    <InactiveCard setActive={id => setActive(id)} isDragging={snapshot.isDragging} active={active}
                                  provided={provided} setSaveStatus={status => setSaveStatus(status)} item={item}
                                  index={index}/>}
            </div>

        )}
    </Draggable>)
};

const DnDContainer = ({provided, snapshot, items, setActive, currentItem, setItem, setSaveStatus}) => {
    return (<div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
    >
        {items ? items.map((item, index) => (
            <DnDCard key={item.id} setActive={() => setItem(item.id)} active={currentItem === item.id} item={item}
                     index={index} setSaveStatus={status => setSaveStatus(status)}/>
        )) : null}
        {provided.placeholder}
    </div>)
};


export const DnDList = ({items, setItem, currentItem, setSaveStatus}) => {
    const [listData, setListData] = useState(items);
    const [listItemIterator, setListItemIterator] = useState(0);
    const [updateItemIndex, {data}] = useMutation(UPDATE_ITEM_INDEX);

    useEffect(() => {
        if (items !== listData) {
            setListData(items)
        }
    }, [items]);

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        setSaveStatus(1);
        const newItems = reorder(
            listData,
            result.source.index,
            result.destination.index
        );
        setListData(newItems);
        fetch(url, opts(newItems))
            .then(res => res.json())
            .then(() => setSaveStatus(0))
            .catch(() => console.error)
            .catch(() => setSaveStatus(2));


        if (listItemIterator === 1) {
            setSaveStatus(0);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <DnDContainer provided={provided} snapshot={snapshot} setItem={(id) => setItem(id)}
                                  currentItem={currentItem} items={listData}
                                  setSaveStatus={saveStatus => setSaveStatus(saveStatus)}/>
                )}
            </Droppable>
        </DragDropContext>
    );

};

export default DnDList
