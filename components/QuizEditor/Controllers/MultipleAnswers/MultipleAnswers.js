import React, {useContext} from "react";
import arrayMove from 'array-move';
import AnswerChoice from "./AnswerChoice";
import QuizContext from "../../QuizContext";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import update from "immutability-helper";

const DragHandle = ({provided, active}) => (<div {...provided.dragHandleProps}
                                                 className={"fas fa-grip-lines-vertical text-center z-50 cursor-move text-gray-200 active:text-blue-400 focus:text-blue-400 " + (!active ? "hidden" : "block")}/>);


export const MultipleChoiceController = ({active, item}) => {
    const {setDocument, document} = useContext(QuizContext);


    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        answer_objects: {
                            $set: arrayMove(prevState.items[item].answer_objects, result.source.index, result.destination.index)
                        }
                    }
                }
            })

            return newData
        })

    }

    const addAnswerChoice = () => {
        const newId = uuidv4()
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {answer_objects: {$push: [newId]}}
                    }, answer_objects: {
                        $merge: {
                            [newId]: {
                                content: "<p><br/></p>"
                            }
                        }
                    }
                }
            )
            return newData
        })
    }


    return (
        <div>
            {active ? <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={item + '_controller'}>
                        {(provided, snapshot) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {document.items[item].answer_objects.map((answerId, index) => (
                                    <Draggable draggableId={answerId}
                                               index={index} key={answerId + "pineappe"}>
                                        {(provided, snapshot) =>
                                            <li className="pb-2 relative flex items-center" key={answerId + "pinee"}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}>
                                                {active ? <div><DragHandle provided={provided} active={true}/></div>: null}
                                                <AnswerChoice choice={answerId} active={true}
                                                              key={answerId + "pinedqwdappe"}
                                                              isCorrect={document.items[item].correct_objects.includes(answerId)}
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
                                className="items-center px-2 py-1 border border-transparent text-sm leading-5 font-light rounded-md text-gray-400 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            <i className="fas fa-plus mr-2"/>New Option
                        </button>
                    </div>
                </div>
            </div> : <div className="space-y-2">
                {document.items[item].answer_objects.map(answerId => <AnswerChoice key={answerId + "inactivemc"}
                                                                                   choice={answerId}
                                                                                   isCorrect={document.items[item].correct_objects.includes(answerId)}
                                                                                   active={false}/>)}
            </div>}
        </div>

    )
};

// Prop Types


export default MultipleChoiceController
