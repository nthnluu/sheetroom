import React, {useRef, useState} from "react";
import {nanoid} from "nanoid";
import JsonDebugBox from "../JsonDebugBox";

const ToggleRow: React.FC<{label:string; onEnable: any; onDisable: any; value: boolean; desc?: string; proOnly?: boolean; isPro?: boolean;}> = ({label, onEnable, onDisable, value, desc, proOnly, isPro}) => {
    const [uniqueId] = useState(nanoid(4))

    function handleEnable () {
        if (proOnly) {
            if (isPro) {
                onEnable()
            } else {
                onDisable()
            }
        } else {
            onEnable()
        }

    }

    function handleDisable () {
        onDisable()
    }

    function toggleSwitch() {
        if (value) {
            handleDisable()
        } else {
            handleEnable()
        }
    }

    return (<div className="flex justify-between items-center mt-6">
        <div className="text-left">
            <label htmlFor={uniqueId} className="font-medium text-gray-700">{label}</label>
            {proOnly && !isPro ? <span
                className="inline-flex items-center px-1.5 py-0.5 ml-1 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800">
                PRO
</span>  : null}

            <p className="text-gray-400 text-sm">{desc}</p>
        </div>

        {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}

        <span role="checkbox" tabIndex={0} aria-checked={value} id={uniqueId} aria-label={label} onClick={toggleSwitch} onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Spacebar') {
                toggleSwitch()
            }
        }}
              className={"relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline " + (value ? " bg-blue-600 ":" bg-gray-200 ") + (proOnly && !isPro ? " opacity-50 cursor-not-allowed" : null)}>
  {/*// <!-- On: "translate-xx-5", Off: "translate-x-0" -->*/}
            <span aria-hidden="true"
                  className={"inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 " + (value ? "translate-x-5" : "translate-x-0")}/>
            </span>
    </div>)
}

export default ToggleRow
