import CardFrame from "./CardFrame";
import React, {useState} from "react";
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import JsonDebugBox from "../JsonDebugBox";

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


const DragHandle = SortableHandle(() => <i tabIndex="0"
                                           className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const SortableItem = SortableElement(({value, active, setActive, setItems}) =>
    <>
        {active ? <div className="mb-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="w-full text-center z-50"><DragHandle/></div>
            <ActiveCard item={value} index={value.index} setItems={newArray => setItems(newArray)}/>
        </div> : <div className="mb-2 group bg-white rounded-lg border border-gray-200">
            <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle/></div>
            <InactiveCard item={value} setActive={(id) => setActive(id)} index={value.index}
                          setItems={newArray => setItems(newArray)}/>
        </div>}
    </>
);

const SortableList = SortableContainer(({items, selectedItem, setActive, setItems}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} value={value} active={selectedItem === value.id}
                              setActive={() => setActive(value.id)} index={index}
                              setItems={newArray => setItems([...items,])}/>
            ))}
        </ul>
    );
});

const InactiveCard = ({active, setSaveStatus, item, index, setActive, setItems}) => {
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
                       active={active} setItems={newArray => setItems(newArray)}/>
        </button>
    </div>)
};

const ActiveCard = ({setSaveStatus, item, index, setItems}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame setSaveStatus={(status) => setSaveStatus(status)} itemData={item} index={index}
                       active={true} setItems={newArray => setItems(newArray)}/>
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
            <SortableList items={listItems} setItems={newItemArray => setItems(newItemArray)} onSortEnd={onSortEnd}
                          lockAxis="y" useDragHandle selectedItem={selectedItem}
                          setActive={(id) => setSelectedItem(id)}/>
            <JsonDebugBox content={listItems}/>
        </>
    );

};


export default DnDList
