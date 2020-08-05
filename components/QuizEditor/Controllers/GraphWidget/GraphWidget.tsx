
import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import update from "immutability-helper";
import arrayMove from "array-move";
import DotRow from "./DotRow";

const GraphWidget = () => {


    return (<div className="bg-white border-2 border-black w-96 h-96 rounded-lg relative p-2">
        <DotRow/>
        <DotRow/>
        <DotRow/>
        <DotRow/>
        <DotRow/>
        <DotRow/>
    </div>)
}

export default GraphWidget
