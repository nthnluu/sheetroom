import InactiveQuillEditor from "../Editor/InactiveQuillEditor";
import JsonDebugBox from "../JsonDebugBox";
import MultipleChoice from "./Controllers/MultipleChoice";
import {useContext} from "react";
import MultipleAnswers from "./Controllers/MultipleAnswers";
import ShortAnswer from "./Controllers/ShortAnswer";
import Math from "./Controllers/Math";

const Controller = ({item, data}) => {

    switch(data.content.content.items[item].controller_type) {
        case('MC'):
            return <MultipleChoice item={item} data={data}/>
        case('MA'):
            return <MultipleAnswers item={item} data={data}/>
        case('SA'):
            return <ShortAnswer item={item} data={data}/>
        case('MT'):
            return <Math item={item} data={data}/>
        default:
            return <p className="p-2 rounded-lg border border-red-500 text-red-500">There was a problem loading your responses.</p>
    }
}

const ItemCard = ({data, item}) => {

    const currentItem = data.content.content.items[item]

    return (<div className="border rounded-lg p-8 border-gray-200 shadow-sm bg-white">
        <section className="mb-8">
            {/*@ts-ignore*/}
            <InactiveQuillEditor value={currentItem.question}/>
        </section>
        <div>
            <Controller item={item} data={data}/>
        </div>
    </div>)
}

export default ItemCard
