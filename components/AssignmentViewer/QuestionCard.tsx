import InactiveQuillEditor from "../Editor/InactiveQuillEditor";
import MultipleChoice from "./Controllers/MultipleChoice";
import {useContext} from "react";
import AssignmentViewerContext from "./AssignmentViewerContext";
import MultipleAnswers from "./Controllers/MultipleAnswers";
import ShortAnswer from "./Controllers/ShortAnswer";
import Math from "./Controllers/Math";

const Controller = ({item}) => {
    const {document} = useContext(AssignmentViewerContext)

    switch(document.items[item].controller_type) {
        case('MC'):
            return <MultipleChoice item={item}/>
        case('MA'):
            return <MultipleAnswers item={item}/>
        case('SA'):
            return <ShortAnswer item={item}/>
        case('MT'):
            return <Math item={item}/>
        default:
            return <h1>hi</h1>
    }
}

const QuestionCard = ({item}) => {
    const {document} = useContext(AssignmentViewerContext)
    const currentItem = document.items[item]

    const allItemsArray = document.config.sections.map(section => document.sections[section].items).flat()
    const itemNumber = (itemId) => {
        const itemIndex = allItemsArray.findIndex(element => element === itemId)
        return itemIndex + 1
    }

    return (<div className={(document.config.disableTextSelect ? "select-none" : "") + " border rounded-lg p-8 border-gray-200 shadow-sm bg-white"}>
        <section className="mb-8">
            {document.config['item_numbers'] ?  <h1 className="font-semibold text-xs text-gray-400 uppercase mb-2">Question {itemNumber(item)}</h1> : null}
            {/*@ts-ignore*/}
            <InactiveQuillEditor value={currentItem.question}/>
        </section>
        <div>
            <Controller item={item}/>
        </div>
    </div>)
}

export default QuestionCard
