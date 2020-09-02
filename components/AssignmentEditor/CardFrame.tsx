import React, {useContext, useState} from "react";
import MultipleChoiceController from "./Controllers/MultipleChoice/MultipleChoice";
import QuestionCardDropdown from "../Dropdowns/QuestionCardDropdown";
import QuizContext from "./QuizContext";
import MultipleAnswersController from "./Controllers/MultipleAnswers/MultipleAnswers";
import QuillEditor from "../Editor/QuillEditor";
import update from "immutability-helper";
import NewTooltip from "../Misc/Tooltip";
import {ShortAnswerController} from "./Controllers/ShortAnswer/ShortAnswer";
import InactiveEditor from "../Editor/InactiveEditor";
import arrayMove from "array-move";
import ItemOptionsModal from "../Modals/ItemOptionsModal";
import Math from "./Controllers/Math/Math";
import DesmosSettingsModal from "../Modals/DesmosSettingsModal";
import { openUploadWidget } from "../../lib/cloudinary-service";
import {Image} from 'cloudinary-react';
import UpgradeModal from "../Modals/UpgradeModal";

interface Props {
    active: boolean;
    item: string;
    itemIndex: number;
    section?: string;
    condensed: boolean;
    sectionIndex?: number;
    profileData?: any;
}


const Controller = ({type, item, active}) => {
    switch (type) {
        case("MC"):
            return <MultipleChoiceController item={item} active={active}/>
        case("MA"):
            return <MultipleAnswersController active={active} item={item}/>
        case("SA"):
            return <ShortAnswerController active={active} item={item}/>
        case("MT"):
            return <Math active={active} item={item}/>
        default:
            return <p className="w-full p-3 text-red-600 border border-red-600 rounded-lg"><i
                className="fas fa-exclamation-circle mr-2"/>Something went wrong rendering this item. Contact
                support if this error persists.</p>
    }
}

const CardFrame: React.FC<Props> = ({active, item, itemIndex, section, condensed, sectionIndex, profileData}) => {
    const {document, setDocument} = useContext(QuizContext);
    const currentItem = document.items[item];
    const [upgradeModal, toggleUpgradeModal] = useState(false);
    // Logic for AUTOSAVING the ITEM CONTENT
    const saveItemContent = (newValue) => {
        setDocument(prevState => {
            return update(prevState, {
                items: {
                    [item]: {
                        question: {
                            $set: newValue
                        }
                    }
                }
            })
        })
    }
    const deleteItem = () => {
        if (document.sections[section].items.length === 1) {
            setDocument(prevState => {
                return update(prevState, {
                    answer_objects: {
                        $unset: [prevState.items[item].answer_objects]
                    },
                    items: {
                        $unset: [item]
                    }, sections: {
                        $unset: [section]
                    }, config: {
                        sections: {
                            $splice: [[sectionIndex, 1]]
                        }
                    }
                })
            })
        } else {
            setDocument(prevState => {
                return update(prevState, {
                    answer_objects: {
                        $unset: [prevState.items[item].answer_objects]
                    },
                    items: {
                        $unset: [item]
                    }, sections: {
                        [section]: {
                            items: {
                                $splice: [[itemIndex, 1]]
                            }
                        }
                    }
                })
            })
        }
    }
    const moveItemDown = () => {
        setDocument(prevState => {
            return update(prevState, {
                sections: {
                    [section]: {
                        items: {
                            $set: arrayMove(prevState.sections[section].items, itemIndex, itemIndex + 1)
                        }
                    }
                }

            })
        })
    }
    const moveItemUp = () => {
        setDocument(prevState => {
            return update(prevState, {
                sections: {
                    [section]: {
                        items: {
                            $set: arrayMove(prevState.sections[section].items, itemIndex, itemIndex - 1)
                        }
                    }
                }

            })
        })
    }
    const deleteBlock = () => {
        setDocument(prevState => {
            return update(prevState, {
                items: {
                    [item]: {
                        block: {
                            $set: undefined
                        }
                    }
                }
            })
        })
    }

    const beginUpload = () => {
        if (profileData.data.users_by_pk.is_pro) {
            const uploadOptions = {
                cloudName: "sheetroom",
                uploadPreset: "kwwrntp1"
            };
            openUploadWidget(uploadOptions, (error, photos) => {
                if (!error) {
                    if(photos.event === 'success'){
                        setDocument(prevState => {
                            return update(prevState, {
                                items: {
                                    [item]: {
                                        block: {
                                            $set: {
                                                type: 'image',
                                                data: photos.info.public_id
                                            }
                                        }
                                    }
                                }
                            })
                        })
                    }
                } else {
                    console.log(error);
                }
            })
        } else {
            toggleUpgradeModal(true)
        }

    }


    const [settingsOpen, toggleSettingsOpen] = useState(false);
    const [desmosOpen, toggleDesmos] = useState(false);

    return (
        <div
            className={"bg-white focus:shadow-outline w-full pt-3 px-4 sm:px-6 focus:outline-none rounded-lg " + (!active ? ' pb-2' : null)}>
            <UpgradeModal onCancel={() => toggleUpgradeModal(false)} isOpen={upgradeModal}/>
            <DesmosSettingsModal item={item} onCancel={() => toggleDesmos(false)} isOpen={desmosOpen}/>
            <ItemOptionsModal isOpen={settingsOpen} onCancel={() => toggleSettingsOpen(false)} item={item} type={currentItem.controller_type}/>
            <div className="flex justify-between flex-shrink-0 flex-wrap md:flex-shrink md:flex-no-wrap w-full">
                <div className="w-full border-transparent pb-3">
                    <div className="mb-4">
                        {active ? <QuillEditor insertImage={() => beginUpload()} border={active} uniqueKey={item + "question"} insertGraph={() => toggleDesmos(true)}
                                               onChange={(value) => saveItemContent(value)} value={currentItem.question}
                                               active={active} placeholder="Question"/> :
                            <div className="px-4"><InactiveEditor border={active} uniqueKey={item + "question"}
                                                                  value={currentItem.question} placeholder="Question"/></div>}
                    </div>
                    {document.items[item].block ? (document.items[item].block.type === 'desmos' ? <div className="flex justify-between w-full">
                            <div className="w-full">
                                <img src={document.items[item].block.data} className="mx-auto rounded-lg border border-gray-300 shadow-sm"/>
                            </div>
                        {active ? <button className="w-6 text-gray-300" onClick={deleteBlock}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> : null}

                        </div>  : <div className="flex justify-between w-full">

                            <div className="w-full" >
                                <Image publicId={document.items[item].block.data} secure="true" className="mx-auto" style={{maxHeight: '15rem'}}/>
                            </div>
                        {active ? <button className="w-6 text-gray-300" onClick={deleteBlock}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> : null}
                        </div>) : null}


                    <div className="mt-4">
                        {!condensed ? <Controller active={active} type={currentItem.controller_type} item={item}  /> : null}
                    </div>

                </div>
            </div>
            {active ? <div className="flex justify-between border-t items-center w-full border-gray-200 py-3">
                <div>
                    <div className="max-w-2xl flex justify-between items-center">
                        <QuestionCardDropdown item={item}/>
                        {(Object.keys(document.items).length > 1) ?
                            <NewTooltip title="Delete item" placement="bottom" enterDelay={500}
                                        enterNextDelay={500}>
                                <span>
                                    <label htmlFor={"del_" + item} className="sr-only">Delete Item</label>
                                <button type="button" onClick={() => deleteItem()} id={"del_" + item}
                                        className="inline-flex text-center items-center h-8 w-8 ml-4 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                    <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 18L18 6M6 6L18 18" strokeWidth="2" strokeLinecap="round"
                                              className="stroke-current"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button></span>
                            </NewTooltip> : null}
                        <NewTooltip title="Item options" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <span>
                                 <label htmlFor={"set_" + item} className="sr-only">Item Options</label>
                                <button id={"set_" + item} type="button" onClick={() => toggleSettingsOpen(true)}
                                        className="inline-flex text-center items-center h-8 w-8 ml-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                        strokeWidth="1.75" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                    <path
                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                        strokeWidth="2" strokeLinecap="round"
                                        className="stroke-current"
                                        strokeLinejoin="round"/>
                                </svg>


                            </button>
                            </span>
                        </NewTooltip>
                    </div>

                </div>
                <div>
                    <div className="max-w-2xl flex justify-between items-center">
                        <NewTooltip title="Move up" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <span>
                                 <label htmlFor={"miu_" + item} className="sr-only">Move Item Up</label>
                                <button id={"miu_" + item} type="button" disabled={itemIndex <= 0}
                                        onClick={() => {
                                    if (itemIndex > 0) {
                                        moveItemUp()
                                    }
                                }}
                                        className="inline-flex text-center items-center h-8 w-8 mr-1 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                            <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                <path d="M5 15L12 8L19 15" strokeWidth="2" strokeLinecap="round"
                                      className="stroke-current"
                                      strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </span>
                        </NewTooltip>
                        <NewTooltip title="Move down" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                            <span>
                                <label htmlFor={"mid_" + item} className="sr-only">Move Item Down</label>
                            <button type="button" id={"mid_" + item} disabled={itemIndex === (document.sections[section].items.length - 1)} onClick={() => {
                                if (itemIndex !== (document.sections[section].items.length - 1))
                                    moveItemDown()
                            }}
                                    className="inline-flex text-center items-center h-8 w-8 ml-1 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                    <path d="M19 9L12 16L5 9" strokeWidth="2" strokeLinecap="round"
                                          className="stroke-current"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </span>
                        </NewTooltip>

                    </div>

                </div>

            </div> : null}

        </div>
    )
};

export default CardFrame
