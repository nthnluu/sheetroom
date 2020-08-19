import SimpleModal from "./SimpleModal";
import React, {useContext, useState} from "react";
import {nanoid} from "nanoid";
import QuizContext from "../AssignmentEditor/QuizContext";
import ToggleRow from "../Misc/ToggleRow";
import update from "immutability-helper";


const SectionOptionsModal = ({isOpen, onCancel, section}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const {aid, document, setDocument, setCurrentPage} = useContext(QuizContext)


    const setConfigValue = (configValue, value) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    sections: {
                        [section]: {
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


    return (<SimpleModal buttons={<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Done
        </button>
      </span>
        </div>

        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Section Options" content={<div className="mb-4">
        {/*@ts-ignore*/}
        <ToggleRow label="Time Limit" desc={document.config.timing !== 1 ? <><a className="underline cursor-pointer focus:text-blue-600 focus:outline-none" tabIndex={0} onClick={() => {cancelModal(); setCurrentPage(4);}}>Enable per-section timing</a> to set a time limit.</>: null} value={document.sections[section].config['time_limit'] && document.config.timing === 1} onEnable={() => setConfigValue("time_limit", true)} onDisable={() => setConfigValue("time_limit", false)}/>
        {document.config.timing === 1 && document.sections[section].config['time_limit'] ? <span className="inline-flex items-center rounded-md space-x-1 mt-2">
                                <span>
                                    <label htmlFor="timing_hours" className="sr-only">Hours</label>
                                    <div className="rounded-md shadow-sm">
                                        <input id="timing_hours" maxLength={2} value={document.sections[section].config.hours} onChange={event => {
                                            //@ts-ignore
                                            if (isNaN(event.target.value)) {
                                                event.preventDefault()
                                                return false
                                            } else {
                                                setConfigValue("hours", event.target.value)
                                            }
                                        }}
                                               className="form-input w-10 h-auto text-sm leading-4 text-center"
                                               placeholder="H"/>
                                    </div>
                                </span>
                                <span>
                                    <label htmlFor="timing_hours" className="sr-only">Minutes</label>
                                    <div className="rounded-md shadow-sm">
                                        <input id="timing_hours" value={document.sections[section].config.mins} maxLength={2} onChange={event => {
                                            //@ts-ignore
                                            if (isNaN(event.target.value)) {
                                                event.preventDefault()
                                                return false
                                            } else {
                                                setConfigValue("mins", event.target.value)
                                            }
                                        }}
                                               className="form-input p-2 w-10 h-auto text-sm leading-4 text-center ste"
                                               placeholder="M"/>
                                    </div>
                                </span>
            <span className="text-gray-300 ml-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>

                            </span>:null}
    </div>}
    />)
}

export default SectionOptionsModal
