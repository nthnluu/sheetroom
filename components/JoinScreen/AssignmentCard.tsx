import React, {useEffect, useState} from "react";
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
    submissions: any;
    resumeAssignment?: string
    isGoogleClass?: boolean;
    googleClassConfig?: any;
    googleClassPayload?: any;
    googleCredentials?: any;
    joinCode?: string;
}


const GoogleClassLaunchButton = ({credentials, gClassInfo, inviteId, joinCode}) => {
    const [isLoading, toggleLoading] = useState(false)
    const [prepareSubmissionResult, mutateSubmission] = useMutation(prepareSubmission)
    //0: loading 1:ready 2:sign in required
    const [readyToStart, toggleReadyToStart] = useState(0)
    const [submissionId, setSubmissionId] = useState("")
    useEffect(() => {
        if (credentials.gclass) {
            if (moment(parseInt(credentials.gClass2)).isAfter(moment())) {
                fetch(`https://classroom.googleapis.com/v1/courses/${gClassInfo.courseId}/courseWork/${gClassInfo.courseworkId}/studentSubmissions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${credentials.gclass}`
                    }
                })
                    .then(result => result.json())
                    .then(json => {
                        if (json.studentSubmissions) {
                            toggleReadyToStart(1)
                            setSubmissionId(json.studentSubmissions[0].id)
                        } else {
                            toggleReadyToStart(2)
                        }
                    })
                    .catch(() => toggleReadyToStart(2))
            }
        } else {
            toggleReadyToStart(2)
        }

    }, [])

    const timeConvert = new Date(credentials.gClass2)
    return <div className="sm:flex justify-end mt-4">
        {readyToStart === 0 ? <CircularProgress color="inherit" size={30} className="h-auto opacity-50"/> : null}
        {readyToStart === 1 ? <button type="button"
                                      onClick={() => {
                                          mutateSubmission({
                                              inviteId: inviteId, googleClassPayload: JSON.stringify({
                                                  credentials: credentials,
                                                  submissionId: submissionId
                                              })
                                          })
                                              .then(result => window.location.href = '/view/' + result.data.prepareSubmission.id)
                                              .catch(() => toggleLoading(false));
                                      }}
                                      className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}
            Start assignment
        </button> : null}
        {readyToStart === 2 ? <a href={"https://sheetroom.com/api/google-classroom/auth-student?joinCode=" + joinCode}
                                 className="inline-flex w-full sm:w-auto justify-center items-center px-4 text-gray-800 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-100 hover:bg-gray-50 focus:outline-none focus:shadow-outline-blue active:bg-gray-200 transition ease-in-out duration-150">
            {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}
            <img src="/gclass_color.svg" className="inline-flex h-5 mr-2"/>Sign in to Google Classroom
        </a> : null}

    </div>
}

const AssignmentCard: React.FC<Props> = ({firstName, joinCode, resumeAssignment, submissions, lastName, title, inviteId, config, userAttempts, isGoogleClass, googleClassConfig, googleClassPayload, googleCredentials}) => {
    const [prepareSubmissionResult, mutateSubmission] = useMutation(prepareSubmission)
    const [isLoading, toggleLoading] = useState(false)

    const inviteConfig = JSON.parse(config)

    const isWithinDueDate = inviteConfig.dueDateEnabled ? moment(inviteConfig.dueDate).isAfter(moment()) : true


    return <div className="p-6 bg-white shadow rounded-lg text-center sm:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-400">Assigned by {firstName} {lastName}</h2>
        {isGoogleClass ?
            <GoogleClassLaunchButton joinCode={joinCode} inviteId={inviteId} credentials={googleCredentials}
                                     gClassInfo={googleClassConfig}/> :
            <div className="sm:flex justify-end mt-4">
                {resumeAssignment && isWithinDueDate ? <a type="button" href={'/view/' + resumeAssignment}
                                                          className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Resume
                    assignment
                </a> : <>{isWithinDueDate ? (inviteConfig.multipleAttempts ? (((inviteConfig.allowedAttempts ? userAttempts < parseInt(inviteConfig.allowedAttempts) : true)) ?
                    <div className="flex-row sm:flex justify-between sm:space-x-2 items-center">
                        <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-gray-500 px-2 py-1 border rounded-md shadow-sm  h-full flex justify-center items-center border-gray-300">
                            {inviteConfig.allowedAttempts ? `Attempt ${userAttempts} of ${inviteConfig.allowedAttempts}` :
                                <span>
                        <i className="fas fa-infinity mr-2"></i>Unlimited attempts</span>}</p>
                        <button type="button" disabled={isLoading} onClick={() => {
                            toggleLoading(true)
                            mutateSubmission({inviteId: inviteId})
                                .then(result => window.location.href = '/view/' + result.data.prepareSubmission.id)
                                .catch(() => toggleLoading(false))
                        }
                        }
                                className="inline-flex w-full sm:w-auto justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                            {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}
                            Start assignment
                        </button>
                    </div> :
                    <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                        <i
                            className="fas fa-exclamation-circle mr-1"/>You're out of attempts.
                    </p>) : ((userAttempts ? userAttempts < 1 : true) ?
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
                    </button> :
                    <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                        <i
                            className="fas fa-exclamation-circle mr-1"/>You're out of attempts.</p>)) :
                    <p className="mb-1 md:mb-0 w-full sm:w-auto text-center text-red-500 px-2 py-1 border rounded-lg border-red-500">
                        <i
                            className="fas fa-exclamation-circle mr-1"/>The deadline has passed</p>}</>}


            </div>}

    </div>
}

export default AssignmentCard
