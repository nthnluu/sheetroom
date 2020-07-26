import {useContext, useEffect, useState} from "react";
import RichTextField from "../Editor/SlateEditor";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_CONTENT} from "../../gql/assignmentAutosave";
import MultipleChoiceController from "./Controllers/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import arrayMove from "array-move";
import QuizReducer from "./QuizReducer";


const CardFrame = ({itemData, setItems, active, setSaveStatus, itemIndex, item}) => {


    return (
        <div className="bg-white focus:shadow-outline w-full pt-2 pb-8 px-8 focus:outline-none rounded-lg">
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-r border-transparent md:border-gray-200 md:pr-4 md:mr-4 pr-0 mr-0">
                    <div className="mb-8">
                        <h2 className="font-semibold text-gray-800 text-lg mb-3">Question {itemIndex + 1}</h2>
                        <RichTextField border active={active} initialContent={item.content}
                                       onBlurEvent={(value) => dispatch({type: 'UPDATE-ITEM-FIELD', index: itemIndex, fieldName: 'content', payload: value})} uniqueId={item.id}/>
                    </div>
                    <MultipleChoiceController itemId={item.id} itemIndex={itemIndex} setSaveStatus={status => setSaveStatus(status)} active={active} setAnswerChoices={newArray => setItemData([...listItems, ])} answerChoices={item.answer_objects}/>

                </div>
                <div className="w-full md:w-64 mx-auto mt-4 md:mt-0">
                    <QuestionCardDropdown active={active}/>
                </div>
            </div>
        </div>
    )
};

export default CardFrame
