import {useQuery} from "urql";
import {getSubmissionsForAssignment} from "../../lib/graphql/Assignments";
import React, {useContext} from "react";
import QuizContext from "./QuizContext";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import NewTooltip from "../Misc/Tooltip";
import JsonDebugBox from "../JsonDebugBox";
import * as jsonexport from "jsonexport/dist"
import {json2csv} from 'json-2-csv';

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

    function convertArrayOfObjectsToCSV(args) {
        let result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function (item) {
            ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

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

    const getCsvFromTable = (submissions) => {
        const rawData = submissions.map(submission => {
            return {
                first_name: submission.studentProfile ? submission.studentProfile.user.first_name : "",
                last_name: submission.studentProfile ? submission.studentProfile.user.last_name : "",
                points: submission.scoreReportByScoreReport.earned_points,
                total: submission.scoreReportByScoreReport.total_points
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

    return (<div className="space-y-16">


        {data.assignments_assignment_by_pk.invites.length > 0 ? data.assignments_assignment_by_pk.invites.map(invite =>
            <div>
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold leading-7 text-gray-800 sm:text-2xl sm:leading-9 sm:truncate">
                            {(invite.is_public ? moment(invite.created_at).format("MMM DD, YYYY") : "AP Calculus Period 2") + " "}<span
                            className="font-light ml-2">{invite.join_code}</span>
                        </h2>
                    </div>
                    <div className="items-center flex mt-4 space-x-2 lg:mt-0 lg:ml-4">

                        <NewTooltip title="Scheduled" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                        <span>
                    <button type="button"
                            className="flex items-center justify-center h-8 w-8  border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                            <span className="flex h-3 w-3 relative">
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"/>
                            </span>
                    </button>
                        </span>
                        </NewTooltip>
                        <NewTooltip title="Scheduled" placement="bottom" enterDelay={500}
                                    enterNextDelay={500}>
                        <span>
                    <button type="button" onClick={() => getCsvFromTable(invite.submissions)}
                            className="flex items-center justify-center h-8 w-8  border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                            <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor">
          <path
              d="M12 10V16M12 16L9 13M12 16L15 13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
              stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
                    </button>
                        </span>
                        </NewTooltip>


                        <button type="button" onClick={() => alert("TODO")}
                                className="inline-flex text-center items-center h-8 w-8 border border-transparent text-base leading-6 font-medium rounded-md text-gray-600 bg-transparent hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-200  focus:outline-none focus:shadow-outline transition ease-in-out duration-150">
                            <svg className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                    strokeWidth="1.75" strokeLinecap="round"
                                    className="stroke-current"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                    strokeWidth="1.75" strokeLinecap="round"
                                    className="stroke-current"
                                    strokeLinejoin="round"/>
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        {invite.submissions.length > 0 ? <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                <tr>
                                                    {!invite.is_public ?
                                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                            Name
                                                        </th> : null}

                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Score
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Submitted at
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50"></th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                {invite.submissions.map((submission, index) => <tr>
                                                    {!invite.is_public ? (submission.studentProfile ?
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                            {`${submission.studentProfile.user.first_name} ${submission.studentProfile.user.last_name}`}
                                                        </td> :
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                            {`---`}
                                                        </td>) : null}
                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        {submission.scoreReportByScoreReport.earned_points}/{submission.scoreReportByScoreReport.total_points} ({((submission.scoreReportByScoreReport.earned_points / submission.scoreReportByScoreReport.total_points) * 100).toFixed(2)}%)
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        {moment(submission.scoreReportByScoreReport.created_at).format("ddd MMM DD, YYYY h:mm A")}
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
                            </div> :
                            <p className="w-full bg-gray-200 opacity-75 p-2 text-center rounded-lg">There aren't any
                                submissions to
                                display.</p>}

                    </div>
                </div>
            </div>) : <div className="mx-auto opacity-25 m-12">
            <img src="/paper-plane.svg" className="h-32 mx-auto" alt=""/>
            <p className="text-center mt-2">There aren't any submissions to display.</p>
        </div>}


    </div>)
}

export default ResultPage
