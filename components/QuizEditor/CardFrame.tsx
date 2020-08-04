import React, {useContext} from "react";
import MultipleChoiceController from "./Controllers/MultipleChoice/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import MultipleAnswersController from "./Controllers/MultipleAnswers/MultipleAnswers";
import QuillEditor from "../Editor/QuillEditor";
import update from "immutability-helper";

interface Props {
    active: boolean;
    item: string;
    itemIndex: number;
    section?: string;
}


const Controller = ({type, item, active}) => {
    switch (type) {
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

const CardFrame: React.FC<Props> = ({active, item, itemIndex, section}) => {
    const {document, setDocument} = useContext(QuizContext);

    const currentItem = document.items[item];

    // Logic for AUTOSAVING the ITEM CONTENT
    const saveItemContent = (newValue) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        question: {
                            $set: newValue
                        }
                    }
                }
            })

            return newData
        })
    }


    const deleteItem = () => {
        setDocument(prevState => {
            const newData = update(prevState, {
                items: {
                    [item]: {
                        $set: null
                    }
                }, sections: {
                    [section]: {
                        items: {
                            $splice: [[itemIndex, 1]]
                        }
                    }
                }
            })

            return newData
        })

    }

    return (
        <div
            className={"bg-white focus:shadow-outline w-full pt-2 px-8 focus:outline-none rounded-lg " + (!active ? ' pb-8' : null)}>
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-transparent pb-3">
                    <div className="mb-8">
                        <QuillEditor border={active} uniqueKey={item + "question"}
                                     onChange={(value) => saveItemContent(value)} value={currentItem.question}
                                     active={true} placeholder="Question"/>
                    </div>
                    <Controller active={active} type={currentItem.controller_type} item={item}/>
                </div>
            </div>
            {active ? <div className="flex justify-between border-t items-center w-full border-gray-200 py-3">
                <div className="max-w-2xl">
                    <QuestionCardDropdown item={item}/>
                </div>
                <button type="button" onClick={() => deleteItem()}
                        className="inline-flex text-center items-center h-10 w-10 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                    <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round" className="stroke-current"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
            </div> : null}

        </div>
    )
};

export default CardFrame
