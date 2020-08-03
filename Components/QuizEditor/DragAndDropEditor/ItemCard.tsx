import React, {useContext} from "react";
import QuizContext from "../QuizContext";
import ActiveContent from "./ActiveContent";
import InactiveContent from "./InactiveContent";

interface Props {
    item: string;
    active: boolean;
    provided: object;
    itemIndex: number;
    setActive: any
    section: string;
}

const DragHandle = ({provided}) => (<div tabIndex="0" {...provided.dragHandleProps}
                                         className="fas fa-grip-lines text-center text-gray-200 inline-block z-50 cursor-move active:text-blue-400"/>);

const ItemCard: React.FC<Props> = ({setActive, item, active, provided, itemIndex, section}) => {
    const {document, setDocument} = useContext(QuizContext)

    return (
        <div className="pb-4" key={item}>
            {active ? <div className="bg-white rounded-lg border border-gray-300 shadow-xl">
                <div className="w-full text-center z-50"><DragHandle provided={provided}/></div>
                <ActiveContent item={item} itemIndex={itemIndex} section={section}/>
            </div> : <div className="group bg-white rounded-lg border border-gray-200">
                <div className="mb-1 w-full mx-auto text-center z-50 invisible group-hover:visible"><DragHandle
                    provided={provided}/></div>
                <InactiveContent item={item} setActive={(id) => setActive(id)}
                                 itemIndex={itemIndex}/>
            </div>}
        </div>
    )
}

export default ItemCard
