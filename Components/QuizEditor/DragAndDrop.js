import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardFrame from "./CardFrame";
import React, {Component, useEffect, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_INDEX} from "../../gql/assignmentAutosave";
import gql from "graphql-tag";

//new imports
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';

// const mutationSaveNewListOrder = (items) => {
//     const mutations = items.map((item, index) => `item${index}: update_assignments_item_by_pk(pk_columns: {id: "${item.id}"}, _set: {index: ${index}}) {
//     index
//   }`);
//
//     const newMutation = `mutation {
//      ${mutations.join("")}
//   }
// `;
//     return newMutation
// };
//
// const url = "/api/token";
// const opts = (items) => ({
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({query: mutationSaveNewListOrder(items)}),
// });


const DragHandle = SortableHandle(() => <i className="fas fa-grip-lines text-center text-gray-400 inline-block z-50"/>);

const SortableItem = SortableElement(({value, active, setActive}) =>
    <>

        {active ? <div className="mb-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="w-full text-center z-50"><DragHandle/></div>
            <ActiveCard item={value}/>
        </div> : <div className="mb-2 group bg-white rounded-lg border border-gray-200">
            <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle/></div>
            <InactiveCard item={value} setActive={(id) => setActive(id)}/>
        </div>}
    </>
);

const SortableList = SortableContainer(({items, selectedItem, setActive}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} index={index} value={value} active={selectedItem === value.id}
                              setActive={() => setActive(value.id)}/>
            ))}
        </ul>
    );
});

const InactiveCard = ({isDragging, active, setSaveStatus, item, index, setActive, dragHandle}) => {
    return (<div onClick={(e) => {
        setActive(item.id)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <button onClick={() => {
            setActive(item.id)
        }}
                className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} index={index}
                       active={active}/>
        </button>
    </div>)
};

const ActiveCard = ({isDragging, active, setSaveStatus, item, index, dragHandle}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} index={index}
                       active={true}/>
        </div>)
};


export const DnDList = ({items, setSaveStatus}) => {
    const [listItems, setItems] = useState(items);
    const [selectedItem, setSelectedItem] = useState('');

    const onSortEnd = ({oldIndex, newIndex}) => {
        setItems(arrayMove(listItems, oldIndex, newIndex));
    };


    return (
        <>
            <SortableList items={listItems} onSortEnd={onSortEnd} useDragHandle selectedItem={selectedItem}
                          setActive={(id) => setSelectedItem(id)}/>
        </>
    );

};


export default DnDList
