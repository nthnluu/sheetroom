import {useContext, useEffect, useState} from "react";
import RichTextField from "../Editor/SlateEditor";
import MultipleChoiceController from "./Controllers/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import JsonDebugBox from "../JsonDebugBox";


const CardFrame = ({active, setSaveStatus, itemIndex, item}) => {
    const {quiz, dispatch} = useContext(QuizContext);

    const Controller = ({item, itemIndex, setSaveStatus, active}) => {
        switch (item.type) {
            case("MC"):
                return <MultipleChoiceController itemId={item.id} itemIndex={itemIndex} setSaveStatus={status => setSaveStatus(status)} active={active} answerChoices={item.answer_controller}/>
            case("MA"):
                return <MultipleChoiceController itemId={item.id} itemIndex={itemIndex} setSaveStatus={status => setSaveStatus(status)} active={active} answerChoices={item.answer_controller}/>
        }
    }
    return (
        <div className="bg-white focus:shadow-outline w-full pt-2 pb-8 px-8 focus:outline-none rounded-lg">
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-r border-transparent md:border-gray-200 md:pr-4 md:mr-4 pr-0 mr-0">
                    <div className="mb-8">
                        <h2 className="font-semibold text-gray-800 text-lg mb-3">Question {itemIndex + 1}</h2>
                        <RichTextField border active={active} initialContent={item.content} autofocus
                                       onBlurEvent={(value) => dispatch({type: 'UPDATE-ITEM-CONTENT', index: itemIndex, payload: value})} uniqueId={item.id}/>
                    </div>
                    <Controller active={active} setSaveStatus={(status) => setSaveStatus(status)} item={item} itemIndex={itemIndex}/>


                </div>
                <div className="w-full md:w-64 mx-auto mt-4 md:mt-0">
                    <QuestionCardDropdown active={active}/>
                </div>
            </div>
        </div>
    )
};

export default CardFrame
