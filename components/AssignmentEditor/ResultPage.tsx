import {useQuery} from "urql";
import {getSubmissionsForAssignment} from "../../lib/graphql/Assignments";
import React, {useContext} from "react";
import QuizContext from "./QuizContext";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import * as jsonexport from "jsonexport/dist"

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


const ResultPage = () => {
    const {aid} = useContext(QuizContext)

    const [result] = useQuery({
        query: getSubmissionsForAssignment,
        variables: {
            // @ts-ignore
            assignmentId: aid
        }
    });

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

    const getCsvFromTable = (submissions, isPublic = false) => {
        const rawData = submissions.map(submission => {
            if (isPublic) {
                return {
                    points: submission.scoreReportByScoreReport.earned_points,
                    total: submission.scoreReportByScoreReport.total_points
                }
            } else {
                return {
                    first_name: submission.studentProfile ? submission.studentProfile.user.first_name : "",
                    last_name: submission.studentProfile ? submission.studentProfile.user.last_name : "",
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


    const {fetching, data, error} = result

    if (fetching) return <LoadingPlaceholder/>

    return (<div>
        <h2 className="text-xl font-semibold leading-7 text-gray-800 sm:text-2xl sm:leading-9 sm:truncate">
            Invites
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md mt-8">
            <ul className="divide-y divide-gray-200">

                {data.assignments_assignment_by_pk.invites.map(invite => <li>
                    <a href={"/invite/"+invite.id}
                       className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <div
                                        className="text-sm leading-5 font-medium text-blue-600 truncate flex items-center">
                                        <span
                                            className="mr-1">&rarr;</span> {invite.classByClass ? invite.classByClass.title :
                                        <span className="inline-flex justify-start items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                             className="h-5 mr-1 inline-block" viewBox="0 0 24 24"
                                             stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
                                        Public
                                    </span>}
                                        <span className="ml-1 font-normal text-gray-500">

                      </span>
                                    </div>
                                    <div className="mt-2 flex">
                                        <div className="flex items-center text-sm leading-5 text-gray-500">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                 viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span>
                          {`Created on ${moment(invite.created_at).format('ddd MMM D')}, ${moment(invite.created_at).format('yyyy')}  • ${invite.submissions_aggregate.aggregate.count} submission${invite.submissions_aggregate.aggregate.count !== 1 ? "s": ""}`}
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
        </div>


    </div>)
}

export default ResultPage
