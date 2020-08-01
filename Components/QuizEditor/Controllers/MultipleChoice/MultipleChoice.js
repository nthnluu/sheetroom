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


export const MultipleChoiceController = ({active, setSaveStatus, item}) => {
    const {assignment, setAssignment} = useContext(QuizContext);
    const [saveController] = useMutation(UPDATE_ITEM_CONTROLLER)

    const answerObjects = item.answer_objects.map(id => assignment.answer_objects[id])


    const onDragEnd = (result) => {
        // // dropped outside the list
        // if (!result.destination) {
        //     return;
        // }
        //
        // const newDocument = {...assignment}
        // newDocument.sections[0].items[itemIndex].answer_controller = arrayMove(answerChoices, result.source.index, result.destination.index)
        // setAssignment(newDocument)

    }

    const addAnswerChoice = () => {
        // const newDocument = {...assignment}
        // newDocument.sections[0].items[itemIndex].answer_controller.push(blankAnswerChoice(newDocument.sections[0].items[itemIndex].answer_controller.length === 0, uuidv4()))
        // setAssignment(newDocument);
    }

    return (
        <div key={item.id}>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={item.id + '_controller'}>
                        {(provided, snapshot) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {item.answer_objects.map((answerId, index) => (
                                    <Draggable key={answerId} draggableId={answerId}
                                               index={index}>
                                        {(provided, snapshot) =>
                                            <li className="pb-4" ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                <AnswerChoice choice={answerId} active={active} selected={answerObjects[answerId].is_correct} dragHandler={<DragHandle provided={provided} active={active}/>}/>
                                            </li>}
                                    </Draggable>))}
                                {provided.placeholder}
                            </ul>
                        )}

                    </Droppable>
                </DragDropContext>
                <div className="flex justify-start items-center mb-1">
                    <div>
                        <button type="button" onClick={() =>
                            addAnswerChoice()
                        }
                                className="items-center px-2 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            New Option
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() =>
                            addAnswerChoice()
                        }
                                className="items-center px-2 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            All of the above
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() =>
                            addAnswerChoice()
                        }
                                className="items-center px-2 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            None of the above
                        </button>
                    </div>
                </div>
            </div> : <div className="space-y-4">
                {answerObjects ? answerObjects.map((choice) => <AnswerChoice choiceId={choice.id} active={false}
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


export default MultipleChoiceController
