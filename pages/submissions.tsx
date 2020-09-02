import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import React from "react";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery} from "urql";
import {getAllSubmissionsForUser, getSubmissionWithScore} from "../lib/graphql/Submissions";
import JsonDebugBox from "../components/JsonDebugBox";
import moment from "moment";

const NoSubmissionsPlaceholder = () => {
    return (<div className="mx-auto opacity-25 mt-24">
        <img src="/paper-plane.svg" className="h-32 mx-auto" alt=""/>
        <p className="text-center mt-2">There aren't any submissions to display</p>
    </div>)
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

const Submissions = ({session, profileData}) => {

    const [result] = useQuery({query: getAllSubmissionsForUser, variables: {userId: session.id}})
    const {data, fetching, error} = result

    if (fetching) {
        return <LoadingPlaceholder/>
    }
    if (data || error) {
        return (<div className="min-h-screen bg-gray-50">
            <Navbar session={session} unfixed profileData={profileData}/>
            <div className="max-w-5xl mx-auto mt-12">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                    Submission History
                </h1>
                {data.assignments_submission.length > 0 ? <div className="bg-white shadow overflow-hidden rounded-md mt-6">
                    <ul className="divide-y divide-border-gray-200">
                        {data.assignments_submission.map(submission =>  <li key={submission.id}>
                            <a href={"/results/" + submission.id}
                               className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                <div className="px-4 py-4 flex items-center sm:px-6">
                                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                        <div>
                                            <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                                {submission.content.title}
                                                {submission.inviteByInvite.classByClass ?   <span className="ml-1 font-normal text-gray-500">
                        in {submission.inviteByInvite.classByClass.title}
                      </span> : null}

                                            </div>
                                            <div className="mt-2 flex">
                                                <div className="flex items-center text-sm leading-5 text-gray-500">
                                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span>
                          Submitted at {moment(submission.content.content.config.submitted_at).format("hh:mm a on MMM d, yyyy")}
                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-5 flex-shrink-0">
                                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </li>)}
                    </ul>
                </div> : <NoSubmissionsPlaceholder/>}

            </div>
        </div>)
    }

}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};

export default Submissions
