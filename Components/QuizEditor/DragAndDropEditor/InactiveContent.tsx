import CardFrame from "../CardFrame";
import React from "react";

interface Props {
    item: string;
    setActive: any;
    itemIndex: number;
}

const InactiveContent: React.FC<Props> = ({item, setActive, itemIndex}) => {
    return (<div onClick={(e) => {
        setActive(item)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <button onClick={() => {
            setActive(item)
        }}
                className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame itemIndex={itemIndex} active={false} item={item}/>
        </button>
    </div>)
};

export default InactiveContent
