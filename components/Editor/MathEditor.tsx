import {EditableMathField} from "react-mathquill";
import React from "react";

const MathEditor = ({value, onChange}) => {
    return <div className="border border-gray-200 rounded-lg p-3 pr-8"><EditableMathField config={{
        autoCommands: 'pi theta sqrt sum int',
        substituteTextarea: function () {
            const newSpan = document.createElement('span');
            newSpan.setAttribute("tab-index", "0")
            return document.createElement('textarea');
        }
    }} onChange={onChange} latex={value} className="border-transparent text-xl min-w-full"/></div>
}

export default MathEditor

