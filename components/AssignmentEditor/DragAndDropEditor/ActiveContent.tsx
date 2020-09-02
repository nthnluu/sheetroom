import CardFrame from "../CardFrame";
import React, {useState} from "react";
import ItemOptionsModal from "../../Modals/ItemOptionsModal";


interface Props {
    item: string;
    itemIndex: number;
    section: string;
    condensed: boolean;
    sectionIndex?: number;
    profileData: any;
}

const ActiveContent: React.FC<Props> = ({item, itemIndex, section, condensed, sectionIndex, profileData}) => {

    return (
        <div
            className="flex flex-grow-0 justify-between text-left z-40">
            <CardFrame itemIndex={itemIndex} section={section} condensed={false} profileData={profileData}
                       active={true} item={item} sectionIndex={sectionIndex}/>
        </div>
    )
};

export default ActiveContent
