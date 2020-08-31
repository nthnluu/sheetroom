import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";
import {changeAccountType} from "../../lib/graphql/User";

interface Props {
    changeTo: string;
    onCancel: any;
    isOpen: boolean;
    userId: number;
}

const ChangeAccountTypeModal: React.FC<Props> = ({changeTo, userId, onCancel, isOpen}) => {

    const [updateMutationResult, updateMutation] = useMutation(changeAccountType)
    const [isLoading, toggleLoading] = useState(false)

    function cancelModal() {
        toggleLoading(false)
        onCancel();
    }

    function handleSubmit () {
        toggleLoading(true)
        updateMutation({userId: userId, newType: changeTo})
            .then(() => {window.location.href = '/'})
            .catch(error => {toggleLoading(false)})

    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">

        <button type="button" onClick={handleSubmit} disabled={isLoading}
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Change to {changeTo} account
        </button>
      </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={() => onCancel()}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Cancel
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={`Change account to ${changeTo}`} content={<div>
        {changeTo === "student" ? <p className="text-sm leading-5 text-gray-500">You'll have limited access to your assignments and classes until you switch your account back to teacher.</p> : <p className="text-sm leading-5 text-gray-500">You'll have limited access to your classes and submissions until you switch your account back to student.</p>}


    </div>}
    />)
}

export default ChangeAccountTypeModal
