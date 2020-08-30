import React, {useState} from "react";
import {useMutation} from "urql";
import {prepareSubmission} from "../../lib/graphql/Submissions";
import JsonDebugBox from "../JsonDebugBox";
import CircularProgress from "@material-ui/core/CircularProgress";


interface Props {
    firstName: string;
    lastName: string;
    title: string;
    inviteId: string;
}

const AssignmentCard: React.FC<Props> = ({firstName, lastName, title, inviteId}) => {
    const [prepareSubmissionResult, mutateSubmission] = useMutation(prepareSubmission)
    const [isLoading, toggleLoading] = useState(false)

    return <div className="p-6 bg-white shadow rounded-lg">

        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-400">Assigned by {firstName} {lastName}</h2>

        <div className="flex justify-end mt-2">
            <button type="button" disabled={isLoading} onClick={() => mutateSubmission({inviteId: inviteId})
                .then(result => window.location.href = '/view/' + result.data.prepareSubmission.id)
            }
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Start assignment
            </button>
        </div>
    </div>
}

export default AssignmentCard
