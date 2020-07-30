import React, {useContext, useEffect, useState} from "react";
import RichTextField from "../Editor/SlateEditor";
import MultipleChoiceController from "./Controllers/MultipleChoice/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import JsonDebugBox from "../JsonDebugBox";
import MultipleAnswersController from "./Controllers/MultipleAnswers/MultipleAnswers";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_CONTENT, UPDATE_ITEM_TYPE} from "../../gql/assignmentAutosave";
import Automerge from 'automerge'
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import NewTooltip from "../Misc/Tooltip";


const CardFrame = ({active, setSaveStatus, itemIndex, item}) => {
    const {quiz, dispatch, doc, assignment, setAssignment, doc1} = useContext(QuizContext);
    const [mutateItemContent] = useMutation(UPDATE_ITEM_CONTENT)
    const [mutateItemType] = useMutation(UPDATE_ITEM_TYPE)

    const Controller = ({item, itemIndex, setSaveStatus, active}) => {
        switch (item.controller_type) {
            case("MC"):
                return <MultipleChoiceController itemId={item.id} itemIndex={itemIndex}
                                                 setSaveStatus={status => setSaveStatus(status)} active={active}
                                                 answerChoices={item.answer_controller}/>
            case("MA"):
                return <MultipleAnswersController itemId={item.id} itemIndex={itemIndex}
                                                  setSaveStatus={status => setSaveStatus(status)} active={active}
                                                  answerChoices={item.answer_controller}/>
            default:
                return <p className="w-full p-3 text-red-600 border border-red-600 rounded-lg"><i
                    className="fas fa-exclamation-circle mr-2"/>Something went wrong rendering this item. Contact
                    support if this error persists.</p>
        }
    }

    // Logic for AUTOSAVING the ITEM CONTENT
    const saveItemContent = (newValue) => {
        const newQuestionValue = JSON.stringify(newValue)
        setSaveStatus(1)
        const newDoc = Automerge.change(assignment, 'Update Item Content', doc => {
            doc.sections[0].items[itemIndex].question = JSON.parse(newQuestionValue);
        })
        setAssignment(newDoc)
    }

    function getAllIndexes(arr, val) {
        let indexes = [], i = -1;
        while ((i = arr.indexOf(val, i + 1)) !== -1) {
            indexes.push(i);
        }
        return indexes;
    }

    const deleteItem = () => {
        setSaveStatus(1)
        const newDoc = Automerge.change(assignment, 'Delete Item', doc => {
            doc.sections[0].items.deleteAt(itemIndex)
        })
        setAssignment(newDoc)
    }

    // Logic for AUTOSAVING the ITEM TYPE
    const saveItemType = (newTypeValue) => {
        setSaveStatus(1)
        const newDoc = Automerge.change(assignment, 'Update item type', doc => {
            const correctItemIndex = doc.sections[0].items[itemIndex].answer_controller.findIndex(element => element.is_correct);
            doc.sections[0].items[itemIndex].answer_controller.forEach((element, index) => {
                doc.sections[0].items[itemIndex].answer_controller[index].is_correct = false
            })
            if (correctItemIndex === -1) {
                doc.sections[0].items[itemIndex].answer_controller[0].is_correct = true
            } else {
                doc.sections[0].items[itemIndex].answer_controller[correctItemIndex].is_correct = true
            }

            doc.sections[0].items[itemIndex].controller_type = newTypeValue
        })
        setAssignment(newDoc)
    }

    return (
        <div
            className={"bg-white focus:shadow-outline w-full pt-2 px-8 focus:outline-none rounded-lg " + (!active ? ' pb-8' : null)}>
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-transparent pb-6">
                    <div className="mb-8">
                        <h2 className="font-semibold text-gray-800 text-lg mb-3">Question {itemIndex + 1}</h2>
                        <RichTextField border active={active} initialContent={item.question} autofocus
                                       onBlurEvent={(newValue) => saveItemContent(newValue)} uniqueId={item.id}/>
                    </div>
                    <Controller active={active} setSaveStatus={(status) => setSaveStatus(status)} item={item}
                                itemIndex={itemIndex}/>
                </div>
            </div>
            {active ? <div className="flex justify-between border-t w-full border-gray-200 py-3">
                <div className="max-w-2xl">
                    <QuestionCardDropdown active={active} value={item.controller_type}
                                          saveType={value => saveItemType(value)} itemIndex={itemIndex}/>
                </div>

                <NewTooltip title="Delete item" placement="bottom" arrow enterDelay={500}
                            enterNextDelay={500}>
                    <IconButton aria-label="delete" disableRipple onClick={() => deleteItem()}
                                className="focus:outline-none">
                        <ClearIcon fontSize="inherit"/>
                    </IconButton>
                </NewTooltip>
            </div> : null}

        </div>
    )
};

export default CardFrame
