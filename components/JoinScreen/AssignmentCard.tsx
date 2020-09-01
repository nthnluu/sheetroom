import React, {useState} from "react";
import {useMutation} from "urql";
import {prepareSubmission} from "../../lib/graphql/Submissions";
import JsonDebugBox from "../JsonDebugBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';


interface Props {
    firstName: string;
    lastName: string;
    title: string;
    inviteId: string;
    config: string;
    userAttempts: number;
}

const AssignmentCard: React.FC<Props> = ({firstName, lastName, title, inviteId, config,  userAttempts}) => {
    const [prepareSubmissionResult, mutateSubmission] = useMutation(prepareSubmission)
    const [isLoading, toggleLoading] = useState(false)

    const inviteConfig = JSON.parse(config)

    const isWithinDueDate = inviteConfig.dueDateEnabled ? moment(inviteConfig.dueDate).isAfter(moment()) : true


    return <div className="p-6 bg-white shadow rounded-lg text-center sm:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-400">Assigned by {firstName} {lastName}</h2>
        <div className="sm:flex justify-end mt-4">
            {isWithinDueDate ? (inviteConfig.multipleAttempts ? ((userAttempts <= parseInt(inviteConfig.allowedAttempts)) ? <div className="flex-row sm:flex justify-between sm:space-x-2 items-center">
                    <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-gray-500 px-2 py-1 border rounded-lg border-gray-500">
                        {`Attempt ${userAttempts} of ${inviteConfig.allowedAttempts}`}</p>
                    <button type="button" disabled={isLoading} onClick={() => {
                    toggleLoading(true)
                    mutateSubmission({inviteId: inviteId})
                        .then(result => window.location.href = '/view/' + result.data.prepareSubmission.id)
                        .catch(() => toggleLoading(false))
                }
                }
                                       className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Start
                    assignment
                </button></div> : <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                    <i
                        className="fas fa-exclamation-circle mr-1"/>You're out of attempts.</p>) : (userAttempts < 1 ? <button type="button" disabled={isLoading} onClick={() => {
                    toggleLoading(true)
                    mutateSubmission({inviteId: inviteId})
                        .then(result => window.location.href = '/view/' + result.data.prepareSubmission.id)
                        .catch(() => toggleLoading(false))
                }
                }
                                                        className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Start
                    assignment
                </button> : <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                    <i
                        className="fas fa-exclamation-circle mr-1"/>You're out of attempts.</p>)) :
                <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                    <i
                        className="fas fa-exclamation-circle mr-1"/>The deadline has passed</p>}

        </div>
    </div>
}

export default AssignmentCard
