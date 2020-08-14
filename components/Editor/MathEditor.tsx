import {EditableMathField} from "react-mathquill";
import React from "react";

const MathEditor = ({value, onChange}) => {
    return <div className="border border-gray-200 rounded-lg p-3 pr-8"><EditableMathField onChange={onChange} latex={value} className="border-transparent text-xl min-w-full"/></div>
}

export default MathEditor

