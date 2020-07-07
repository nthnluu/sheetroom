import React from "react";

const ToolbarButton = ({icon, active, color, onMouseDown}) => {
    return (
        <button onClick={() => onMouseDown()} className={"font-bold h-8 w-8 text-base text-"+color+"-500 hover:bg-"+color+"-100 hover:text-"+color+"-600 active:text-"+color+"-700 focus:text-"+color+"-600 rounded focus:bg-"+color+"-100 active:bg-"+color+"-200 focus:outline-none transition-color duration-150"}>
            {icon}</button>
    )
};

export default ToolbarButton
