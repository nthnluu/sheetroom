import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import React from "react";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery, useSubscription} from "urql";
import {getSubmissionWithScore} from "../../lib/graphql/Submissions";
import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import moment from "moment";
import JsonDebugBox from "../../components/JsonDebugBox";
import ItemCard from "../../components/ResultsPage/ItemCard";
import CheckForUser from "../../lib/CheckForUser";

const PageLayout: React.FC<{ session, data, status }> = ({session, data, status}) => {
    const inviteConfig = JSON.parse(data.inviteByInvite.config)
    return (
        <>
            <Navbar session={session} unfixed/>
            <div className="px-4 max-w-4xl mx-auto py-12">
                {status === "success" ? <>
                    {inviteConfig.hideScore ? <div className="mb-12">
                        <h1 className="text-4xl font-semibold text-gray-800 text-center">Assignment submitted
                            successfully.</h1>
                        <h2 className="text-xl text-gray-500 text-center">Your instructor has hidden your score and
                            responses.</h2>
                    </div> : <div className="mb-12">
                        <h1 className="text-4xl font-semibold text-gray-800 text-center">Assignment submitted
                            successfully.</h1>
                        <h2 className="text-xl text-gray-500 text-center">You may view your results below.</h2>
                    </div>}
                </> : null}



                {!inviteConfig.hideScore ? <div
                    className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex-row md:flex justify-between items-center">
                    <div className="text-3xl font-medium text-gray-800">
                        {data.scoreReportByScoreReport.earned_points}/{data.scoreReportByScoreReport.total_points}
                        <span
                            className="font-light">- {((data.scoreReportByScoreReport.earned_points / (data.scoreReportByScoreReport.total_points > 0 ? data.scoreReportByScoreReport.total_points : 1)) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="text-lg font-medium text-gray-800">
                        Submitted
                        at {moment(data.scoreReportByScoreReport.created_at).format("h:mm A")} on {moment(data.scoreReportByScoreReport.created_at).format("MMM DD, YYYY")}
                    </div>
                </div> : <div
                    className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex-row md:flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-800">
                        Submitted
                        at {moment(data.scoreReportByScoreReport.created_at).format("h:mm A")} on {moment(data.scoreReportByScoreReport.created_at).format("MMM DD, YYYY")}
                    </div>
                </div>}
                {inviteConfig.restrictResults ? null : <>
                    <div className="mt-8 space-y-4">
                        {
                            data.content.content.config.sections.map(section => data.content.content.sections[section].items).flat().map(itemId =>
                                <ItemCard item={itemId} data={data}/>)
                        }

                    </div>
                </>}


            </div>


        </>
    )

}

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


const ClassPage = ({session}) => {
    const router = useRouter();
    const {rid, status} = router.query;

    const [result] = useQuery({query: getSubmissionWithScore, variables: {submissionId: rid}})
    const {data, fetching, error} = result


    if (fetching && !data) {
        return <LoadingPlaceholder/>
    } else {
        return <PageLayout session={session} data={data.assignments_submission_by_pk} status={status}/>
    }
}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};


export default ClassPage
