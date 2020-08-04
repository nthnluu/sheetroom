import CardFrame from "../CardFrame";
import React from "react";

interface Props {
    item: string;
    setActive: any;
    itemIndex: number;
}

const InactiveContent: React.FC<Props> = ({item, setActive, itemIndex}) => {
    return (<div role="button" onClick={(e) => {
        setActive(item)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <div className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame itemIndex={itemIndex} active={false} item={item}/>
        </div>
    </div>)
};

export default InactiveContent
