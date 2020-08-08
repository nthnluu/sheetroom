import SimpleModal from "./SimpleModal";
import React from "react";

const ModalContent = () => {
    return (
        <fieldset>
            <div className="my-4 text-left">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="comments" type="radio" name="form-input share_scope"
                               className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                    </div>
                    <div className="ml-3 text-sm leading-5">
                        <label htmlFor="comments" className="font-medium text-gray-700">Anyone with a link</label>
                        <p className="text-gray-500">Anyone with the link can view and submit this assignment.</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="candidates" type="radio" name="form-input share_scope"
                                   className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                        </div>
                        <div className="ml-3 text-sm leading-5">
                            <label htmlFor="candidates" className="font-medium text-gray-700">Assign to class</label>
                            <p className="text-gray-500">Only class members can view and submit this assignment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

const ShareAssignmentModal = ({isOpen, onCancel}) => {
    return (<SimpleModal buttons={<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Create Invite
        </button>
      </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={onCancel}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span>
        </div>

        <span className="mt-3 w-full rounded-md sm:mt-0 sm:w-auto hidden sm:flex">
        <button type="button" onClick={onCancel}
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-base leading-6 font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          View previous invites
        </button>
      </span>
    </div>} isOpen={isOpen} onCancel={onCancel} title="Share Assignment" content={<ModalContent/>}/>)
}

export default ShareAssignmentModal
