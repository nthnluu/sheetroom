import React, {useContext} from "react";
import arrayMove from 'array-move';
import AnswerObject from "./AnswerObject";
import QuizContext from "../../QuizContext";
import {v4 as uuidv4} from 'uuid';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import update from "immutability-helper";

interface Props {
    active: boolean;
    item: string;
}

export const Math: React.FC<Props> = ({active, item}) => {
    const {setDocument, document} = useContext(QuizContext);

    const answerObjects = document.items[item].answer_objects.map(objectId => document.answer_objects[objectId])

    const addAnswerObject = () => {
        const newId = uuidv4()
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {answer_objects: {$push: [newId]}}
                    }, answer_objects: {
                        $merge: {
                            [newId]: {
                                content: "f(x)="
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
                <div className="space-y-2">
                    <div className="pb-2">
                        {document.items[item].answer_objects.map((objectId, index) => <AnswerObject active={true} choice={objectId} item={item} answerIndex={index}/>)}
                    </div>
                </div>

                <div className="flex justify-start items-center mb-1">
                    <div>
                        <button type="button" onClick={() =>
                            addAnswerObject()
                        }
                                className="items-center px-2 py-1 border border-transparent text-sm leading-5 font-light rounded-md text-gray-400 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                            <i className="fas fa-plus mr-2"/>Add Alternate
                        </button>
                    </div>
                </div>
            </div> : <div className="space-y-4">
                {document.items[item].answer_objects.map((objectId, index) => <AnswerObject active={false} choice={objectId} item={item} answerIndex={index}/>)}
            </div>}
        </div>

    )
};

// Prop Types


export default Math
