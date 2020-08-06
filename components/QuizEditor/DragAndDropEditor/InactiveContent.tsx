import CardFrame from "../CardFrame";
import React from "react";

interface Props {
    item: string;
    setActive: any;
    itemIndex: number;
    condensed: boolean
}

const InactiveContent: React.FC<Props> = ({item, setActive, itemIndex, condensed}) => {
    return (<div role="button" onClick={(e) => {
        setActive(item)
    }}
                 className="flex justify-between w-full block active:shadow-outline text-left z-40"
    >
        <div className="text-left block w-full active:outline-none focus:shadow-outline focus:outline-none overflow-hidden">
            <CardFrame itemIndex={itemIndex} active={false} item={item} condensed={false}/>
        </div>
    </div>)
};

export default InactiveContent
