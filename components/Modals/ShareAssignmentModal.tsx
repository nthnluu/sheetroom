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
    return (<SimpleModal isOpen={isOpen} onCancel={onCancel} title="Share Assignment" content={<ModalContent/>}/>)
}

export default ShareAssignmentModal
