import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import CheckForUser from "../../lib/CheckForUser";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {useSubscription} from "urql";
import {invitePage} from "../../lib/graphql/Invites";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import JsonDebugBox from "../../components/JsonDebugBox";
import NewTooltip from "../../components/Misc/Tooltip";
import * as jsonexport from "jsonexport/dist"
import JoinCodeModal from "../../components/Modals/JoinCodeModal";
import InviteSettingsModal from "../../components/Modals/InviteSettingsModal";

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

function myFixed(x, d) {
    if (!d) return x.toFixed(d); // don't go wrong if no decimal
    return x.toFixed(d).replace(/\.?0+$/, '');
}

const PageContent = ({session, profileData, data}) => {
    const assignmentConfig = JSON.parse(data.assignments_invite_by_pk.config)

    const getTimeDiff = (now, then) => {
        const ms = moment(now).diff(moment(then));
        const duration = moment.duration(ms);

        return Math.floor(duration.asHours()) + moment.utc(ms).format(":mm:ss")
    }


    const getAverageTime = () => {
        const durations = data.assignments_invite_by_pk.submissions.map(submission => {
            const then = new Date(submission.created_at).getTime()
            const now = new Date(submission.scoreReportByScoreReport.created_at).getTime()
            return now - then
        })

        const numerator = durations.reduce((a, b) => a + b, 0)
        const numSubmissions = data.assignments_invite_by_pk.submissions.length

        const avgDurationMs = numerator / numSubmissions
        let result = Math.floor(avgDurationMs / (1000 * 60 * 60)) + ":" + Math.floor(avgDurationMs / (1000 * 60)) % 60 + ":" + Math.floor(avgDurationMs / 1000) % 60;
        return result
    }

    const getAverageScore = () => {
        const earnedPoints = data.assignments_invite_by_pk.submissions.map(submission => (submission.scoreReportByScoreReport.earned_points))
        const totalPoints = data.assignments_invite_by_pk.submissions.map(submission => (submission.scoreReportByScoreReport.total_points))

        const numerator = earnedPoints.reduce((a, b) => a + b, 0)
        const denom = totalPoints.reduce((a, b) => a + b, 0)

        const avgNum = numerator / data.assignments_invite_by_pk.submissions.length
        const avgDemon = denom / data.assignments_invite_by_pk.submissions.length

        return {score: `${myFixed(avgNum, 2)}/${myFixed(avgDemon, 2)}`, percent: `${myFixed(((avgNum / avgDemon) * 100), 2)}`}
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

    return <div className="bg-gray-50 min-h-screen">
        <InviteSettingsModal inviteId={data.assignments_invite_by_pk.id}
                             onCancel={() => toggleInviteSettingsModal(false)} settingsObject={assignmentConfig}
                             isOpen={inviteSettingsModal} profileData={profileData} session={session}/>
        <JoinCodeModal joinCode={data.assignments_invite_by_pk.join_code}
                       title={data.assignments_invite_by_pk.assignmentByAssignment.title}
                       onCancel={() => toggleJoinCodeModal(false)} isOpen={joinCodeModal}/>
        <Navbar session={session} unfixed profileData={profileData}/>
        <div className="max-w-5xl mx-auto px-2 mt-16">
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
            <><div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Overview
                </h3>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate">
                                    Most Missed Question
                                </dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-gray-900">
                                    24.57%
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-12">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Submissions
                </h3>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr>
                                        {!data.assignments_invite_by_pk.is_public ? <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
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
                                        {!data.assignments_invite_by_pk.is_public ? <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                            {`${submission.studentProfile.user.first_name} ${submission.studentProfile.user.last_name}`}
                                        </td> : null}

                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {`${submission.scoreReportByScoreReport.earned_points}/${(submission.scoreReportByScoreReport.total_points)} (${((submission.scoreReportByScoreReport.earned_points / submission.scoreReportByScoreReport.total_points) * 100).toFixed(2)}%)`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {moment(submission.scoreReportByScoreReport.created_at).format("hh:mm a on ddd, MMM d yyy")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                            {getTimeDiff(submission.scoreReportByScoreReport.created_at, submission.created_at)}
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
            </div></>:
                <NoSubmissionsPlaceholder/>}


        </div>

    </div>
}
const InvitePage = ({session, profileData}) => {
    const router = useRouter();
    const {iid} = router.query;
    const [pageData, setPageData] = useState()

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
