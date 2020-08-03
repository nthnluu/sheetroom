import CardFrame from "../CardFrame";
import React from "react";

interface Props {
    item: string;
    itemIndex: number;
    section: string;
}

const ActiveContent: React.FC<Props> = ({item, itemIndex, section}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame itemIndex={itemIndex} section={section}
                       active={true} item={item}/>
        </div>
    )
};

export default ActiveContent
