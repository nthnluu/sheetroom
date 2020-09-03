import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";
import {deleteClass} from "../../lib/graphql/Class";

interface Props {
    onCancel: any;
    isOpen: boolean;
    userId: number;
    classId: string;
}

const DeleteClassModal: React.FC<Props> = ({onCancel, isOpen, userId, classId}) => {

    const [deleteMutationResult, deleteMutation] = useMutation(deleteClass)
    const [isLoading, toggleLoading] = useState(false)

    function cancelModal() {
        toggleLoading(false)
        onCancel();
    }

    function handleSubmit () {
        toggleLoading(true)
        deleteMutation({classId: classId})
            .then(() => {
                window.location.href = '/'
            })
            .catch(error => {
                toggleLoading(false)
                console.log(error)})

    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">

        <button type="button" onClick={handleSubmit} disabled={isLoading}
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Delete class
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
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Delete this class?" content={<div>
      <p className="text-sm leading-5 text-gray-500">
          All data associated with this class, including student submissions, will be permanently deleted. This action can't be undone.</p>

    </div>}
    />)
}

export default DeleteClassModal
