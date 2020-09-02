import React from "react";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery} from "urql";
import {getSubmissionsFromClassWithUser} from "../../lib/graphql/Submissions";
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


const NoStudentsPlaceholder = () => {
    return (<div className="mx-auto opacity-25 m-12">
        <img src="/paper-plane.svg" className="h-32 mx-auto" alt=""/>
        <p className="text-center mt-2">There aren't any submissions to display.</p>
    </div>)
}


const Submissions = ({course, session}) => {

    const [result] = useQuery({
        query: getSubmissionsFromClassWithUser,
        variables: {
            // @ts-ignore
            classId: course,
            userId: session.id
        }
    });

    const {fetching, data, error} = result

    if (fetching) {
        return <LoadingPlaceholder/>
    } else {
        return (
            <>
                {data ? <>
                    <h1 className="text-2xl text-gray-800 font-semibold mr-1 mb-4 mt-10">Submissions</h1>
                    <div className="bg-white shadow overflow-hidden rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {data.assignments_submission.map(submission => <li>
                                <a href="#"
                                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                                    {submission.inviteByInvite.assignmentByAssignment.title}
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm leading-5 text-gray-400">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                             viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd"
                                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                  clipRule="evenodd"/>
                                                        </svg>
                                                        <span>
                                                            {`Submitted on ${moment(submission.scoreReportByScoreReport.created_at).format('dddd MMM D yyy')}`}
                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </li>)}
                        </ul>
                    </div>
                </> : <NoStudentsPlaceholder />}
            </>)
    }


}

export default Submissions
