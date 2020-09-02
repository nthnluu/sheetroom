import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import React from "react";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery} from "urql";
import {getSubmissionWithScore} from "../../lib/graphql/Submissions";
import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import moment from "moment";
import ItemCard from "../../components/ResultsPage/ItemCard";
import CheckForUser from "../../lib/CheckForUser";
import myFixed from "../../lib/MyFixed";

const PageLayout: React.FC<{ session, data, status, sid }> = ({session, data, status, sid}) => {
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
                </> :  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:truncate mb-8">
                    {data.content.title}
                </h1>}



                {!inviteConfig.hideScore ? <div
                    className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex-row md:flex justify-between items-center">

                    <div className="text-3xl font-medium text-gray-800">
                        {data.scoreReportByScoreReport.earned_points}/{data.scoreReportByScoreReport.total_points}
                        <span
                            className="font-light"> - {myFixed(((data.scoreReportByScoreReport.earned_points / (data.scoreReportByScoreReport.total_points > 0 ? data.scoreReportByScoreReport.total_points : 1)) * 100), 2)}%</span>
                    </div>
                    <div className="flex-row">
                        <div className="text-lg font-medium text-gray-800">
                            Submitted
                            at {moment(data.scoreReportByScoreReport.created_at).format("h:mm A on MMM D, YYYY")}
                        </div>
                    </div>

                </div> : <div
                    className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 flex-row md:flex justify-between items-center">
                    <div className="text-lg font-medium text-gray-800">
                        Submitted
                        at {moment(data.scoreReportByScoreReport.created_at).format("h:mm A")} on {moment(data.scoreReportByScoreReport.created_at).format("MMM DD, YYYY")}
                    </div>
                </div>}
                {inviteConfig.restrictResults ? <div className="text-center text-gray-400 mt-24">
                    <svg className="h-16 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <p className="mt-4 font-medium">Results hidden by instructor</p>
                    </div> : <>
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
        return <PageLayout sid={rid} session={session} data={data.assignments_submission_by_pk} status={status}/>
    }
}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};


export default ClassPage
