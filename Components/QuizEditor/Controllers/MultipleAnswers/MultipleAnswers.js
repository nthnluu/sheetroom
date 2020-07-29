import React, {useContext, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import AnswerChoice from "./AnswerChoice";
import PropTypes from "prop-types";
import QuizContext from "../../QuizContext";
import {useMutation} from "@apollo/react-hooks";
import {debounce, UPDATE_ITEM_CONTROLLER} from "../../../../gql/assignmentAutosave";
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import _ from "lodash";

const DragHandle = SortableHandle(() => <i
    className="fas fa-grip-lines text-center inline-block z-50 cursor-move active:text-blue-400 focus:text-blue-400"
    tabIndex="0"/>);

const SortableItem = SortableElement(({value, active, answerIndex, itemIndex}) =>
    <div>
        <div className="flex justify-between mb-4">
            <AnswerChoice choice={value} active={active} selected={value.is_correct} answerIndex={answerIndex}
                          itemIndex={itemIndex} dragHandler={active ? <DragHandle/> : null}/>
        </div>
    </div>
);

const SortableList = SortableContainer(({items, active, itemIndex}) => {

    return (
        <ul className="space-y-4 mb-4">
            {items ? items.map((value, index) => (
                <SortableItem key={`item-${value.id}`} value={value} answerIndex={index} itemIndex={itemIndex}
                              index={index} active={active}/>
            )) : null}
        </ul>
    );
});


export const MultipleAnswersController = ({active, answerChoices, setAnswerChoices, setSaveStatus, itemId, setItems, itemIndex}) => {
    const {quiz, dispatch} = useContext(QuizContext);
    const [saveController] = useMutation(UPDATE_ITEM_CONTROLLER)

    const onSortEnd = ({oldIndex, newIndex}) => {
        setSaveStatus(1)
        dispatch({
            type: 'UPDATE-ANSWER-CHOICE-ARRAY',
            index: itemIndex,
            payload: arrayMove(answerChoices, oldIndex, newIndex)
        })
        saveController({variables: {itemId: itemId, controller: arrayMove(answerChoices, oldIndex, newIndex)}})
            .then(() => setSaveStatus(0))
            .catch(() => setSaveStatus(2));

    };

    const saveControllerArray = () => {
        setSaveStatus(1)
        saveController({variables: {itemId: itemId, controller: answerChoices}})
            .then(() => setSaveStatus(0))
            .catch(() => setSaveStatus(2));
    }

    return (
        <div key={itemId}>
            {active ? <div>
                <SortableList items={answerChoices} itemIndex={itemIndex} onSortEnd={onSortEnd} useDragHandle
                              active={active} lockAxis="y"
                              lockToContainerEdges/>
                <div className="space-x-2">
                    <button type="button" onClick={() => {
                        dispatch({type: 'CREATE-NEW-ANSWER-OBJECT', itemId: itemId, itemIndex: itemIndex})
                        _.debounce(() => {
                            saveControllerArray()
                        }, 300);

                    }}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        Add option
                    </button>
                </div>
            </div> : <div className="space-y-4">
                {answerChoices ? answerChoices.map((choice, index) => <AnswerChoice choiceId={choice.id} active={false}
                                                                                    choice={choice}
                                                                                    setSaveStatus={status => setSaveStatus(status)}
                                                                                    key={choice.id + "_inactive"}
                                                                                    content={choice.content}
                                                                                    selected={choice.is_correct}/>) : null}
            </div>}
        </div>

    )
};

// Prop Types
SortableItem.propTypes = {
    value: PropTypes.object.isRequired,
    active: PropTypes.bool,
};

SortableList.propTypes = {
    items: PropTypes.array,
    active: PropTypes.bool.isRequired,
};

MultipleAnswersController.propTypes = {
    active: PropTypes.bool,
    answerChoices: PropTypes.array,
    setSaveStatus: PropTypes.func.isRequired,
    setAnswerChoices: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired,
};

export default MultipleAnswersController
