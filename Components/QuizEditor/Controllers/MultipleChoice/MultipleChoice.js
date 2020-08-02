import React, {useContext, useEffect} from "react";
import arrayMove from 'array-move';
import AnswerChoice from "./AnswerChoice";
import PropTypes from "prop-types";
import QuizContext from "../../QuizContext";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const DragHandle = ({provided, active}) => (<div {...provided.dragHandleProps} tabIndex="1"
                                                 className={"fas fa-grip-lines text-center inline-block z-50 cursor-move active:text-blue-400 focus:text-blue-400 " + (!active ? "hidden" : "block")}/>);


export const MultipleChoiceController = ({active, item}) => {
    const {items, setAnswerObjects, setItems, document} = useContext(QuizContext);

    const answerObjects = document.items[item].answer_objects.map(objectId => document.answer_objects[objectId])

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        setItems(previousState => ({
            ...previousState,
            [item]: {
                ...previousState[item],
                answer_objects: arrayMove(previousState[item].answer_objects, result.source.index, result.destination.index)
            },
        }))


    }

    const addAnswerChoice = () => {
        const newId = uuidv4()
        setItems(prevState => ({
            ...prevState,
            [item]: {...prevState[item], answer_objects: [...prevState[item].answer_objects, newId]}
        }))
        setAnswerObjects(prevState => ({
            ...prevState, [newId]: {
                content: [{"children": [{"text": "Option 1"}], "type": "paragraph"}]
            }
        }));
    }

    return (
        <div key={item}>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={item + '_controller'}>
                        {(provided, snapshot) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {document.items[item].answer_objects.map((answerId, index) => (
                                    <Draggable key={answerId} draggableId={answerId}
                                               index={index}>
                                        {(provided, snapshot) =>
                                            <li className="pb-4" ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                <AnswerChoice choice={answerId} active={true}
                                                              isCorrect={items[item].correct_objects.includes(answerId)}
                                                              item={item}
                                                              answerIndex={index}
                                                              dragHandler={<DragHandle provided={provided}
                                                                                       active={true}/>}/>
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
                {document.items[item].answer_objects.map(answerId => <AnswerChoice key={answerId} choice={answerId}
                                                                          isCorrect={document.items[item].correct_objects.includes(answerId)}
                                                                          active={false}/>)}
            </div>}
        </div>

    )
};

// Prop Types


export default MultipleChoiceController
