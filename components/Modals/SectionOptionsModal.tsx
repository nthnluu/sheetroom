import SimpleModal from "./SimpleModal";
import React, {useContext, useState} from "react";
import {nanoid} from "nanoid";
import {useMutation} from "urql";
import {createInvite} from "../../lib/graphql/Invites";
import {newInitialDocumentContent} from "../AssignmentEditor/Templates";
import QuizContext from "../AssignmentEditor/QuizContext";
import SectionCalculatorDropdown from "../Dropdowns/SectionCalculatorDropdown";


const SectionOptionsModal = ({isOpen, onCancel}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const {aid} = useContext(QuizContext)

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
        <button type="button" onClick={() => {
            console.log("save")
        }}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Save
        </button>
      </span>
            {modalStep === 0 ? <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span> : null}

        </div>

        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Section Options" content={<div>
        <div className="flex justify-between items-center mt-6">
            <label htmlFor="sectionCalculator" className="font-medium text-gray-700">Description</label>
            {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}
            <span role="checkbox" tabIndex={0} aria-checked="false" id="sectionCalculator"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline">
  {/*// <!-- On: "translate-x-5", Off: "translate-x-0" -->*/}
                <span aria-hidden="true"
                      className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
            </span>
        </div>


        <div className="flex justify-between items-center mt-6">
            <label htmlFor="sectionCalculator" className="font-medium text-gray-700">Calculator</label>
            {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}
            <span role="checkbox" tabIndex={0} aria-checked="false" id="sectionCalculator"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline">
  {/*// <!-- On: "translate-xx-5", Off: "translate-x-0" -->*/}
                <span aria-hidden="true"
                      className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
            </span>
        </div>

        <div className="flex justify-between items-center my-6">
            <div className="text-left">
                <label htmlFor="sectionCalculator" className="font-medium text-gray-700">Time Limit</label>
                <p className="text-gray-400 text-sm"><u>Enable per-section timing</u> to set a time limit.</p>
            </div>

            {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}
            <span role="checkbox" tabIndex={0} aria-checked="false" id="sectionCalculator"
                  className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline">
  {/*// <!-- On: "translate-x-5", Off: "translate-x-0" -->*/}
                <span aria-hidden="true"
                      className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
            </span>
        </div>

    </div>}
    />)
}

export default SectionOptionsModal
