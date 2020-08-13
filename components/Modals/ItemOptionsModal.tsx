import SimpleModal from "./SimpleModal";
import React, {useContext, useState} from "react";
import {nanoid} from "nanoid";
import QuizContext from "../AssignmentEditor/QuizContext";
import update from "immutability-helper";
import ToggleRow from "../Misc/ToggleRow";


const ItemOptionsModal = ({isOpen, onCancel, item}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const {aid, setDocument, document} = useContext(QuizContext)

    function cancelModal() {
        onCancel();
        setTimeout(() => {
            const newId = nanoid(8)
            setInviteCode(newId)
            setModalStep(0)
            // @ts-ignore
            setCurrentValue("https://sheetroom.com/join/" + newId)
        }, 150)

    }

    const setPoints = (newValue) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {
                            config: {
                                points: {
                                    $set: newValue
                                }
                            }
                        }
                    }
                }
            )
            return newData
        })
    }
    const setConfigValue = (configValue, value) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {
                            config: {
                                [configValue]: {
                                    $set: value
                                }
                            }
                        }
                    }
                }
            )
            return newData
        })
    }


    return (<SimpleModal buttons={<div className="pt-2 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Done
        </button>
      </span>
        </div>

        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Item Options" content={<div>
        <div className="flex justify-between items-center mt-6">
            <label htmlFor="sectionCalculator" className="font-medium text-gray-700">Points</label>
            {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}
            <span>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative rounded-md shadow-sm">
                    <input id="email" className="form-input block w-14 text-center sm:text-sm sm:leading-5"
                           placeholder="you@example.com" value={document.items[item].config.points}
                           onChange={event => setPoints(event.target.value)}/>
                </div>
            </span>
        </div>
        <ToggleRow label="Extra Credit" value={document.items[item].config.extra_credit}
                   onEnable={() => setConfigValue("extra_credit", true)}
                   onDisable={() => setConfigValue("extra_credit", false)}/>
        <ToggleRow label="Shuffle Answers" value={document.items[item].config.shuffle}
                   onEnable={() => setConfigValue("shuffle", true)} onDisable={() => setConfigValue("shuffle", false)}/>


    </div>}
    />)
}

export default ItemOptionsModal
