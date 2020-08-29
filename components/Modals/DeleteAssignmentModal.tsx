import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
    joinCode: string;
    title: string;
    onCancel: any;
    isOpen: boolean;
    toggleSnackbar: any;
    itemId: string;
}

const DeleteAssignmentModal: React.FC<Props> = ({joinCode, title, onCancel, isOpen, toggleSnackbar, itemId}) => {

    const [deleteMutationResult, deleteMutation] = useMutation(deleteAssignment)
    const [isLoading, toggleLoading] = useState(false)

    function cancelModal() {
        toggleLoading(false)
        onCancel();
    }

    function handleSubmit () {
        toggleLoading(true)
        deleteMutation({assignmentPk: itemId})
            .then(result => {setTimeout(() => toggleSnackbar(true), 500); cancelModal()})
            .catch(error => console.log(error))

    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">

        <button type="button" onClick={handleSubmit}
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Delete Assignment
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={title} content={<div>
      <p className="text-sm leading-5 text-gray-500">You will loose any data associated with this assignment, including student submissions. This action cannot be undone.</p>

    </div>}
    />)
}

export default DeleteAssignmentModal
