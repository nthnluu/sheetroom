import React, {useContext, useState} from "react";
import RichTextField from "../Editor/SlateEditor";
import MultipleChoiceController from "./Controllers/MultipleChoice/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import MultipleAnswersController from "./Controllers/MultipleAnswers/MultipleAnswers";
import QuillEditor from "../Editor/QuillEditor";
import JsonDebugBox from "../JsonDebugBox";


interface Props {
    active: boolean;
    item: string;
    itemIndex: number;
}

const CardFrame: React.FC<Props> = ({active, item, itemIndex}) => {
    const {assignment, setAssignment, setSaveStatus, items} = useContext(QuizContext);

    const currentItem = items[item];
    const [quillValue, setQuillValue] = useState();

    const Controller = () => {
        switch (currentItem.controller_type) {
            case("MC"):
                return <MultipleChoiceController item={item} active={active}/>
            case("MA"):
                return <MultipleAnswersController active={active} item={item}/>
            default:
                return <p className="w-full p-3 text-red-600 border border-red-600 rounded-lg"><i
                    className="fas fa-exclamation-circle mr-2"/>Something went wrong rendering this item. Contact
                    support if this error persists.</p>
        }
    }

    // Logic for AUTOSAVING the ITEM CONTENT
    const saveItemContent = (newValue) => {
        // const newDocument = {...assignment}
        // newDocument.sections[0].items[itemIndex].question = newValue
        // setAssignment(newDocument)
    }


    const deleteItem = () => {
        // const newDocument = {...assignment}
        // newDocument.sections[0].items.splice(itemIndex, 1)
        // setAssignment(newDocument)
    }

    // Logic for AUTOSAVING the ITEM TYPE
    const saveItemType = (newTypeValue) => {
        // const newDocument = {...assignment}
        // const correctItemIndex = newDocument.sections[0].items[itemIndex].answer_controller.findIndex(element => element.is_correct);
        // newDocument.sections[0].items[itemIndex].answer_controller.forEach((element, index) => {
        //     element.is_correct = false
        // })
        // if (correctItemIndex === -1) {
        //     newDocument.sections[0].items[itemIndex].answer_controller[0].is_correct = true
        // } else {
        //     newDocument.sections[0].items[itemIndex].answer_controller[correctItemIndex].is_correct = true
        // }
        // newDocument.sections[0].items[itemIndex].controller_type = newTypeValue
        //
        // setAssignment(newDocument)
    }

    return (
        <div
            className={"bg-white focus:shadow-outline w-full pt-2 px-8 focus:outline-none rounded-lg " + (!active ? ' pb-8' : null)}>
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-transparent pb-3">
                    <div className="mb-8">
                        <h2 className="font-semibold text-gray-800 text-lg mb-3">Question {itemIndex + 1}</h2>
                        <RichTextField border active={active} value={currentItem.question} autofocus={active}
                                       onChangeEvent={(newValue) => saveItemContent(newValue)} uniqueId={item}/>
                                       <JsonDebugBox content={quillValue} title="Quill Value"/>
                                       <QuillEditor onChange={(value) => setQuillValue(value)} value={quillValue} active={true}/>
                    </div>
                    <Controller/>
                </div>
            </div>
            {active ? <div className="flex justify-between border-t items-center w-full border-gray-200 py-3">
                <div className="max-w-2xl">
                    <QuestionCardDropdown active={active} value={currentItem.controller_type}
                                          saveType={value => saveItemType(value)} item={item}/>
                </div>
                <button type="button" onClick={() => deleteItem()}
                        className="inline-flex text-center items-center h-10 w-10 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                    <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" className="stroke-current" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div> : null}

        </div>
    )
};

export default CardFrame
