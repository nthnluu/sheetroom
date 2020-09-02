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
        let result = Math.floor(avgDurationMs/(1000*60*60)) + ":" + Math.floor(avgDurationMs/(1000*60))%60 + ":" + Math.floor(avgDurationMs/1000)%60;
        return result
    }

    const getAverageScore = () => {
        const earnedPoints = data.assignments_invite_by_pk.submissions.map(submission => (submission.scoreReportByScoreReport.earned_points))
        const totalPoints = data.assignments_invite_by_pk.submissions.map(submission => (submission.scoreReportByScoreReport.total_points))

        const numerator = earnedPoints.reduce((a, b) => a + b, 0)
        const denom = totalPoints.reduce((a, b) => a + b, 0)

        const avgNum = numerator / data.assignments_invite_by_pk.submissions.length
        const avgDemon = denom / data.assignments_invite_by_pk.submissions.length

        return {score: `${avgNum}/${avgDemon}`, percent: `${((avgNum/avgDemon)*100).toFixed(2)}` }
    }


    const memoAvgTime = useMemo(() => getAverageTime(), [data]);
    const memoAvgScore = useMemo(() => getAverageScore(), [data]);




    return <div className="bg-gray-50 min-h-screen">
        <Navbar session={session} unfixed profileData={profileData}/>
        <div className="max-w-5xl mx-auto px-2">
            <div className="mt-24">
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
                                    <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Score
                                    </th>
                                    <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted at
                                    </th>
                                    <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Time taken
                                    </th>
                                    <th className="px-6 py-3 bg-cool-gray-50" />
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {data.assignments_invite_by_pk.submissions.map(submission => <tr key={submission.id}>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {`${submission.studentProfile.user.first_name} ${submission.studentProfile.user.last_name}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {`${submission.scoreReportByScoreReport.earned_points}/${(submission.scoreReportByScoreReport.total_points)} (${((submission.scoreReportByScoreReport.earned_points/submission.scoreReportByScoreReport.total_points) * 100).toFixed(2)}%)`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {moment(submission.scoreReportByScoreReport.created_at).format("hh:mm a on ddd, MMM d yyy")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {getTimeDiff(submission.scoreReportByScoreReport.created_at, submission.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                                        <a href={"/results/" + submission.id} className="text-blue-600 hover:text-blue-900">View</a>
                                    </td>
                                </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



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
