import InactiveQuillEditor from "../Editor/InactiveQuillEditor";
import MultipleChoice from "./Controllers/MultipleChoice";
import {useContext} from "react";
import AssignmentViewerContext from "./AssignmentViewerContext";
import JsonDebugBox from "../JsonDebugBox";

const Controller = ({item}) => {
    const {document} = useContext(AssignmentViewerContext)

    switch(document.items[item].controller_type) {
        case('MC'):
            return <MultipleChoice item={item}/>
        default:
            return <h1>hi</h1>
    }
}

const QuestionCard = ({item}) => {
    const {document} = useContext(AssignmentViewerContext)
    const currentItem = document.items[item]

    return (<div className="border rounded-lg p-8 border-gray-200 shadow-sm bg-white">
        <section className="mb-6">
            <h1 className="font-semibold text-lg">Question 1</h1>
            <InactiveQuillEditor value={currentItem.question}/>
        </section>
        <div>
            <Controller item={item}/>
        </div>
    </div>)
}

export default QuestionCard
