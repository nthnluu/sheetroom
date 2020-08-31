import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";
import {signOut} from "next-auth/client";
import {deleteUser} from "../../lib/graphql/User";

interface Props {
    onCancel: any;
    isOpen: boolean;
    customerId: string;
    userId: number;
}

const DeleteAccountModal: React.FC<Props> = ({onCancel, isOpen, customerId, userId}) => {

    const [deleteAccountResult, deleteAccountMutation] = useMutation(deleteUser)
    const [confirmDelete, setConfirm] = useState("")

    const deleteAccount = () => {
        fetch('/api/stripe-delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({customerId: customerId}),
        })
            .then(() => {
                deleteAccountMutation({userId: userId})
                    .then(() => signOut())
            })
    }
    const [isLoading, toggleLoading] = useState(false)

    function cancelModal() {
        toggleLoading(false)
        onCancel();
    }

    function handleSubmit () {
        toggleLoading(true)
        deleteAccount()

    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">

        <button type="button" onClick={handleSubmit} disabled={isLoading || confirmDelete.toLowerCase() !== "delete account"}
                className={"inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5 " + (confirmDelete.toLowerCase() !== "delete account" ? "opacity-50 cursor-not-allowed" : "opacity-100")}>
         {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Delete Account
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
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Delete your account?" content={<div>
        <p className="text-sm leading-5 text-gray-500">Be sure you absolutely want to delete your account. Once you delete your account, all information associated with your account — including your assignments, classes, and submissions — will be deleted permanently.</p>

        <div className="mt-4">
            <label htmlFor="confirm-delete" className="block text-sm font-medium leading-5 text-gray-700">Type "Delete Account" to confirm</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input id="confirm-delete" className="form-input block w-full sm:text-sm sm:leading-5" value={confirmDelete}
                       placeholder="Delete Account" onChange={event => setConfirm(event.target.value)}/>
            </div>
        </div>

    </div>}
    />)
}

export default DeleteAccountModal
