import {EditableMathField, StaticMathField} from "react-mathquill";
import React from "react";

const MathEditor:React.FC<{value; onChange?; staticField?; small?; isCorrect?; isWrong?;}> = ({value, onChange, staticField, small, isCorrect, isWrong}) => {
    return <div className={small ? null : ("border rounded-lg p-3 pr-8 " + (!isCorrect && !isWrong ? "border-gray-200" : (isCorrect ? "border-blue-600" : "border-red-500 text-red-500 ")))}>
        {!staticField ? <EditableMathField config={{
            autoCommands: 'pi theta sqrt sum int',
            substituteTextarea: function () {
                const newSpan = document.createElement('span');
                newSpan.setAttribute("tab-index", "0")
                return document.createElement('textarea');
            }
        }} onChange={onChange} latex={value} className="border-transparent text-xl min-w-full"/> : <StaticMathField className={"border-transparent" + (small ? " text-sm w-auto" : "text-xl min-w-full")}>{value}</StaticMathField>}
        </div>
}

export default MathEditor

