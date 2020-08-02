import CardFrame from "../CardFrame";
import React from "react";

interface Props {
    item: string;
    itemIndex: number;
}

const ActiveContent: React.FC<Props> = ({item, itemIndex}) => {
    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame itemIndex={itemIndex}
                       active={true} item={item}/>
        </div>
    )
};

export default ActiveContent
