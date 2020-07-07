import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import CardFrame from "./CardFrame";
import React, {Component} from "react";

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

const getListStyle = isDraggingOver => ({
    padding: grid,
    width: '100%'
});


const DnDCard = ({item, index, setActive}) => {
    return (<Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided, snapshot) => (
            <div className={snapshot.isDragging ? "flex justify-between rounded-lg shadow-outline border border-gray-200":"flex border border-gray-200 justify-between rounded-lg mb-4 shadow-sm hover:shadow-lg transition-shadow duration-200"}
                ref={provided.innerRef}
                {...provided.draggableProps}
            >
                <div className="p-2 text-gray-400 rounded-l-lg bg-white">
                    <div className="py-1">
                        <button className="w-full active:text-blue-500 transition-all duration-100"><i className="fas fa-chevron-up"/></button>
                        <i {...provided.dragHandleProps}  className="fas fa-grip-lines w-full text-center active:text-blue-500 transition-all duration-100"></i>
                        <button className="w-full active:text-blue-500 transition-all duration-100"><i className="fas fa-chevron-down"/></button>
                    </div>
                    <button className="w-full p-2 mt-2 hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-50 rounded-full active:text-red-500 transition-all duration-100"><i className="far fa-trash-alt"/></button>
                </div>
                <CardFrame item={item}/>
            </div>
        )}
    </Draggable>)
}

const DnDContainer = ({provided, snapshot, items, setActive}) => {
    return (<div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
    >
        {items.map((item, index) => (
            <DnDCard setActive={(index) => setActive(index)} item={item} index={index}/>
        ))}
        {provided.placeholder}
    </div>)
}


class DnDList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <DnDContainer provided={provided} snapshot={snapshot} items={this.state.items}/>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default DnDList
