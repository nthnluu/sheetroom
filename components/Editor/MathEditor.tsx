import {EditableMathField, StaticMathField} from "react-mathquill";
import React from "react";

const MathEditor:React.FC<{value; onChange?; staticField?;}> = ({value, onChange, staticField}) => {
    return <div className="border border-gray-200 rounded-lg p-3 pr-8">
        {!staticField ? <EditableMathField config={{
            autoCommands: 'pi theta sqrt sum int',
            substituteTextarea: function () {
                const newSpan = document.createElement('span');
                newSpan.setAttribute("tab-index", "0")
                return document.createElement('textarea');
            }
        }} onChange={onChange} latex={value} className="border-transparent text-xl min-w-full"/> : <StaticMathField className="border-transparent text-xl min-w-full">{value}</StaticMathField>}
        </div>
}

export default MathEditor

