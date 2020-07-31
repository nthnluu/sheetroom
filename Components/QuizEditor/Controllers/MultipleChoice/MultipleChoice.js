import React, {useContext} from "react";
import arrayMove from 'array-move';
import AnswerChoice from "./AnswerChoice";
import PropTypes from "prop-types";
import QuizContext from "../../QuizContext";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ITEM_CONTROLLER} from "../../../../gql/assignmentAutosave";
import {v4 as uuidv4} from 'uuid';
import {blankAnswerChoice} from "../../Templates";
import Button from "@material-ui/core/Button";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const DragHandle = ({provided, active}) => (<div {...provided.dragHandleProps} tabIndex="1"
                                                 className={"fas fa-grip-lines text-center inline-block z-50 cursor-move active:text-blue-400 focus:text-blue-400 " + (!active ? "hidden" : "block")}/>);


export const MultipleChoiceController = ({active, answerChoices, setSaveStatus, itemId, itemIndex}) => {
    const {assignment, setAssignment} = useContext(QuizContext);
    const [saveController] = useMutation(UPDATE_ITEM_CONTROLLER)


    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newDocument = {...assignment}
        newDocument.sections[0].items[itemIndex].answer_controller = arrayMove(answerChoices, result.source.index, result.destination.index)
        setAssignment(newDocument)

    }

    const addAnswerChoice = () => {
        const newDocument = {...assignment}
        newDocument.sections[0].items[itemIndex].answer_controller.push(blankAnswerChoice(newDocument.sections[0].items[itemIndex].answer_controller.length === 0, uuidv4()))
        setAssignment(newDocument);
    }

    return (
        <div key={itemId}>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={assignment.sections[0].items[itemIndex].id + '_controller'}>
                        {(provided, snapshot) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {answerChoices.map((value, index) => (
                                    <Draggable key={value.id} draggableId={value.id}
                                               index={index}>
                                        {(provided, snapshot) =>
                                            <li className="pb-4" ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                <AnswerChoice choice={value} active={active} selected={value.is_correct}
                                                              answerIndex={index}
                                                              itemIndex={itemIndex} dragHandler={<DragHandle provided={provided} active={active}/>}/>
                                            </li>}
                                    </Draggable>))}
                                {provided.placeholder}
                            </ul>
                        )}

                    </Droppable>
                </DragDropContext>
                <div className="space-x-2">
                    <div>
                        <button type="button" onClick={() =>
                            addAnswerChoice()
                        }
                                className="items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            Add option
                        </button>
                    </div>
                </div>
            </div> : <div className="space-y-4">
                {answerChoices ? answerChoices.map((choice) => <AnswerChoice choiceId={choice.id} active={false}
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
MultipleChoiceController.propTypes = {
    active: PropTypes.bool,
    answerChoices: PropTypes.array,
    setSaveStatus: PropTypes.func.isRequired,
    itemId: PropTypes.string.isRequired,
    itemIndex: PropTypes.number.isRequired,
};

export default MultipleChoiceController
