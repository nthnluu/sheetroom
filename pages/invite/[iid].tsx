import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import CheckForUser from "../../lib/CheckForUser";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {useMutation, useSubscription} from "urql";
import {invitePage, toggleIsDisabled} from "../../lib/graphql/Invites";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import NewTooltip from "../../components/Misc/Tooltip";
import * as jsonexport from "jsonexport/dist"
import JoinCodeModal from "../../components/Modals/JoinCodeModal";
import InviteSettingsModal from "../../components/Modals/InviteSettingsModal";
import myFixed from "../../lib/MyFixed";
import Footer from "../../components/Misc/Footer";
import DeleteInviteModal from "../../components/Modals/DeleteInviteModal";

const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="pt-56">
            <Head>
                <title>Sheetroom</title>
            </Head>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
            </div>

        </div>
    )
};

const NoSubmissionsPlaceholder = () => {
    return (<div className="mx-auto opacity-25 m-12">
        <Head>
            <title>Sheetroom</title>
        </Head>
        <img src="/paper-plane.svg" className="h-32 mx-auto" alt=""/>
        <p className="text-center mt-2">There aren't any submissions to display.</p>
    </div>)
}


const PageContent = ({session, profileData, data}) => {
    const assignmentConfig = JSON.parse(data.assignments_invite_by_pk.config)

    const completeSubmissions = data.assignments_invite_by_pk.submissions.filter(element => (element.scoreReportByScoreReport))

    const getTimeDiff = (now, then) => {
        const ms = moment(now).diff(moment(then));
        const duration = moment.duration(ms);

        return prependZero(Math.floor(duration.asHours())) + moment.utc(ms).format(":mm:ss")
    }

    function prependZero(num) {
        return ('0' + num).slice(-2)
    }

    const getAverageTime = () => {
        const durations = completeSubmissions.map(submission => {
            const then = new Date(submission.created_at).getTime()
            const now = new Date(submission.scoreReportByScoreReport.created_at).getTime()
            return now - then
        })

        const numerator = durations.reduce((a, b) => a + b, 0)
        const numSubmissions = completeSubmissions.length

        const avgDurationMs = numerator / numSubmissions
        let result = prependZero(Math.floor(avgDurationMs / (1000 * 60 * 60))) + ":" + prependZero(Math.floor(avgDurationMs / (1000 * 60)) % 60) + ":" + prependZero(Math.floor(avgDurationMs / 1000) % 60);
        return numSubmissions === 0 ? "00:00:00" : result
    }
    const getAverageScore = () => {
        const earnedPoints = completeSubmissions.map(submission => (submission.scoreReportByScoreReport.earned_points))
        const totalPoints = completeSubmissions.map(submission => (submission.scoreReportByScoreReport.total_points))

        const numerator = earnedPoints.reduce((a, b) => a + b, 0)
        const denom = totalPoints.reduce((a, b) => a + b, 0)

        const avgNum = myFixed(numerator / completeSubmissions.length, 2)
        const avgDemon = myFixed(denom / completeSubmissions.length, 2)
        const percentage = myFixed(((avgNum / avgDemon) * 100), 2)


        return {
            score: `${isNaN(avgNum) ? 0 : avgNum}/${isNaN(avgDemon) ? 0 : avgDemon}`,
            percent: `${isNaN(percentage) ? 0 : percentage}`
        }
    }
    const memoAvgTime = useMemo(() => getAverageTime(), [data]);
    const memoAvgScore = useMemo(() => getAverageScore(), [data]);

    function downloadCsv(csvString) {
        let blob = new Blob([csvString]);
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, "filename.csv");
        } else {
            let a = window.document.createElement("a");

            //@ts-ignore
            a.href = window.URL.createObjectURL(blob, {
                type: "text/plain"
            });
            a.download = "submissions.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    const getCsvFromTable = () => {
        const rawData = data.assignments_invite_by_pk.submissions.map(submission => {
            if (data.assignments_invite_by_pk.assignmentByAssignment.is_public) {
                return {
                    points: submission.scoreReportByScoreReport.earned_points,
                    total: submission.scoreReportByScoreReport.total_points
                }
            } else {
                return {
                    // first_name: submission.studentProfile ? submission.studentProfile.user.first_name : "",
                    // last_name: submission.studentProfile ? submission.studentProfile.user.last_name : "",
                    name: submission.studentProfile ? `${submission.studentProfile.user.last_name}, ${submission.studentProfile.user.first_name}` : "",
                    points: submission.scoreReportByScoreReport.earned_points,
                    total: submission.scoreReportByScoreReport.total_points
                }
            }

        });

        jsonexport(rawData, function (err, csv) {
            if (err) return console.error(err);
            console.log(csv);
            downloadCsv(csv)
        });


    }

    const [joinCodeModal, toggleJoinCodeModal] = useState(false)
    const [inviteSettingsModal, toggleInviteSettingsModal] = useState(false)
    const [deleteInviteModal, toggleDeleteInviteModal] = useState(false)


    const [inviteIsDisabled, setIsDisabled] = useState(data.assignments_invite_by_pk.is_disabled)
    const [isDisabledResult, isDisabledMutation] = useMutation(toggleIsDisabled)
    const [disableIsLoading, toggleLoadingIsDisabled] = useState(false)

    const toggleDisabled = () => {
        if (!disableIsLoading) {
            if (inviteIsDisabled) {
                toggleLoadingIsDisabled(true)
                isDisabledMutation({inviteId: data.assignments_invite_by_pk.id, newState: false})
                    .then((result) => {
                        toggleLoadingIsDisabled(false)
                        setIsDisabled(result.data.update_assignments_invite_by_pk.is_disabled)
                    })
                    .catch(() => {
                        toggleLoadingIsDisabled(false)
                    });
            } else {
                toggleLoadingIsDisabled(true)
                isDisabledMutation({inviteId: data.assignments_invite_by_pk.id, newState: true})
                    .then((result) => {
                        toggleLoadingIsDisabled(false)
                        setIsDisabled(result.data.update_assignments_invite_by_pk.is_disabled)
                    })
                    .catch(() => {
                        toggleLoadingIsDisabled(false)
                    });
            }
        }
    }

    return <>
        <DeleteInviteModal onCancel={() => toggleDeleteInviteModal(false)} isOpen={deleteInviteModal}
                           inviteId={data.assignments_invite_by_pk.id}/>
        <div className="bg-gray-50 min-h-screen pb-24">
            <InviteSettingsModal inviteId={data.assignments_invite_by_pk.id}
                                 onCancel={() => toggleInviteSettingsModal(false)} settingsObject={assignmentConfig}
                                 isOpen={inviteSettingsModal} profileData={profileData} session={session}/>
            <JoinCodeModal joinCode={data.assignments_invite_by_pk.join_code}
                           title={data.assignments_invite_by_pk.assignmentByAssignment.title}
                           onCancel={() => toggleJoinCodeModal(false)} isOpen={joinCodeModal}/>
            <Navbar session={session} unfixed profileData={profileData}/>
            <div className="max-w-5xl mx-auto px-4 mt-12">
                <div className="flex-row sm:flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate">
                        {data.assignments_invite_by_pk.assignmentByAssignment.title}
                    </h2>
                    <div className="flex justify-start mt-2 sm:mt-0 sm:justify-between space-x-4">
                        <NewTooltip title="Share" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                                <span>
                                <button type="button" onClick={() => toggleJoinCodeModal(true)}
                                        className="inline-flex text-center items-center h-10 w-10 border border-transparent text-base font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                    <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                                    </svg>
                                </button>
                                </span>
                        </NewTooltip>
                        <NewTooltip title="Invite Settings" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                                <span>
                                <button type="button" onClick={() => toggleInviteSettingsModal(true)}
                                        className="inline-flex text-center items-center h-10 w-10 border border-transparent text-base font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                    <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </button>
                                </span>
                        </NewTooltip>
                        <NewTooltip title="Export CSV" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                                <span>
                                <button type="button" onClick={() => getCsvFromTable()}
                                        className="inline-flex text-center items-center h-10 w-10 border border-transparent text-base font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-50 focus:shadow-outline active:bg-gray-100 transition ease-in-out duration-150">
                                    <svg className="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                    </svg>
                                </button>
                                </span>
                        </NewTooltip>

                    </div>

                </div>
                {data.assignments_invite_by_pk.submissions.length ?
                    <>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Overview
                            </h3>
                            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dl>
                                            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                                Average Score
                                            </dt>
                                            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                                {`${memoAvgScore.score} (${memoAvgScore.percent}%)`}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <dl>
                                            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                                Avg. Time Taken
                                            </dt>
                                            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                                {memoAvgTime}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                {/*<div className="bg-white overflow-hidden shadow rounded-lg">*/}
                                {/*    <div className="px-4 py-5 sm:p-6">*/}
                                {/*        <dl>*/}
                                {/*            <dt className="text-sm leading-5 font-medium text-gray-500 truncate">*/}
                                {/*                Most Missed Question*/}
                                {/*            </dt>*/}
                                {/*            <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">*/}
                                {/*                24.57%*/}
                                {/*            </dd>*/}
                                {/*        </dl>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                        <div className="flex flex-col mt-12">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Submissions
                            </h3>
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                                    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                            <tr>
                                                {!data.assignments_invite_by_pk.is_public ?
                                                    <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th> : null}
                                                <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Score
                                                </th>
                                                <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Submitted at
                                                </th>
                                                <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                    Time taken
                                                </th>
                                                <th className="px-6 py-3 bg-cool-gray-50"/>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                            {data.assignments_invite_by_pk.submissions.map(submission => <tr
                                                key={submission.id}>
                                                {!data.assignments_invite_by_pk.is_public ?
                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                        {`${submission.studentProfile.user.first_name} ${submission.studentProfile.user.last_name}`}
                                                    </td> : null}

                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {`${submission.scoreReportByScoreReport ? submission.scoreReportByScoreReport.earned_points : "--"}/${submission.scoreReportByScoreReport ? submission.scoreReportByScoreReport.total_points : "--"} (${submission.scoreReportByScoreReport ? ((submission.scoreReportByScoreReport.earned_points / submission.scoreReportByScoreReport.total_points) * 100).toFixed(2) : "--"}%)`}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {submission.scoreReportByScoreReport ? moment(submission.scoreReportByScoreReport.created_at).format("h:mm a on ddd, MMM d yyy") : "In Progress"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                    {submission.scoreReportByScoreReport ? getTimeDiff(submission.scoreReportByScoreReport.created_at, submission.created_at) : "--:--:--"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                                    <a href={"/results/" + submission.id}
                                                       className="text-blue-600 hover:text-blue-900">View</a>
                                                </td>
                                            </tr>)}


                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </> :
                    <NoSubmissionsPlaceholder/>}
                <div className="bg-white shadow rounded-lg mt-12 divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base leading-6 font-medium text-gray-900 flex justify-start items-center"
                            id="renew-headline">
                            <svg className="h-5 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            Lock submissions
                        </h3>
                        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                            <div className="max-w-xl text-sm leading-5 text-gray-500">
                                <p id="renew-description">
                                    Disable this invite's join code and prevent new submissions.
                                </p>
                            </div>
                            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                                <span role="checkbox" tabIndex={0} onClick={() => toggleDisabled()}
                                      aria-checked={inviteIsDisabled} aria-labelledby="renew-headline"
                                      aria-describedby="renew-description"
                                      className={"relative inline-block flex-no-shrink h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline " + (inviteIsDisabled ? " bg-blue-600 " : " bg-gray-200 ") + (disableIsLoading ? " pointer-events-none opacity-50" : null)}>
                                <span aria-hidden="true"
                                      className={(inviteIsDisabled ? "translate-x-5" : "translate-x-0") + " inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"}/>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div className="sm:flex sm:items-start sm:justify-between">
                            <div>
                                <h3 className="text-base leading-6 font-medium text-gray-900">
                                    Delete this invite
                                </h3>
                                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                    <p>
                                        Permanently delete all submission data associated with this invite.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span className="inline-flex rounded-md shadow-sm">
              <button type="button" onClick={() => toggleDeleteInviteModal(true)}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
        Delete invite
      </button>
            </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
        <Footer/>
    </>
}
const InvitePage = ({session, profileData}) => {
    const router = useRouter();
    const {iid} = router.query;
    // @ts-ignore
    const handleSubscription = (messages = [], response) => {
        return response;
    };


    const [res] = useSubscription({
        query: invitePage,
        variables: {
            inviteId: iid
        }
    }, handleSubscription);

    const {data, fetching, error} = res

    if (!data) {
        return <LoadingPlaceholder/>
    } else {
        return <PageContent data={data} session={session} profileData={profileData}/>
    }


}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};


export default InvitePage
