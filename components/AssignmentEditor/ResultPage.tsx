import {useSubscription} from "urql";
import {getSubmissionsForAssignment} from "../../lib/graphql/Assignments";
import React, {useContext} from "react";
import QuizContext from "./QuizContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import JsonDebugBox from "../JsonDebugBox";


const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="pt-56">
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
            </div>
        </div>
    )
};

const NoSubmissionsPlaceholder = () => {
    return (<div className="mx-auto opacity-25 mt-24">
        <img src="/paper-plane.svg" className="h-32 mx-auto" alt=""/>
        <p className="text-center mt-2">Share your assignment to start collecting results</p>
    </div>)
}

const ResultPage = () => {
    const {aid} = useContext(QuizContext)

    const handleSubscription = (messages = [], response) => {
        return response;
    };


    const [result] = useSubscription({
        query: getSubmissionsForAssignment,
        variables: {
            // @ts-ignore
            assignmentId: aid
        }
    }, handleSubscription);


    const {fetching, data, error} = result

    if (fetching && !data) return <LoadingPlaceholder/>


    return (<div>
        <h2 className="text-xl font-semibold leading-7 text-gray-800 sm:text-2xl sm:leading-9 sm:truncate">
            Invites
        </h2>
        {data.assignments_assignment_by_pk.invites.length > 0 ? <div className="bg-white shadow overflow-hidden rounded-md mt-8">
            <ul className="divide-y divide-gray-200">
                {data.assignments_assignment_by_pk.invites.map(invite => <li key={invite.id}>
                    <a href={"/invite/" + invite.id}
                       className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                            <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <div
                                        className={"text-sm leading-5 font-medium truncate flex items-center " + (invite.is_disabled ? "text-blue-400" : "text-blue-600")}>
                                        {invite.is_disabled ?  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg> : <span
                                            className="mr-1">&rarr;</span>}
                                        {invite.is_google_class ? <><span className="inline-flex justify-start items-center">
                                            {!invite.is_disabled ?  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px"><path d="M 7 5 C 5.355469 5 4 6.355469 4 8 L 4 24 C 4 25.644531 5.355469 27 7 27 L 25 27 C 26.644531 27 28 25.644531 28 24 L 28 8 C 28 6.355469 26.644531 5 25 5 Z M 7 7 L 25 7 C 25.566406 7 26 7.433594 26 8 L 26 24 C 26 24.566406 25.566406 25 25 25 L 23 25 L 23 23 L 18 23 L 18 25 L 7 25 C 6.433594 25 6 24.566406 6 24 L 6 8 C 6 7.433594 6.433594 7 7 7 Z M 16 11 C 14.894531 11 14 11.894531 14 13 C 14 14.105469 14.894531 15 16 15 C 17.105469 15 18 14.105469 18 13 C 18 11.894531 17.105469 11 16 11 Z M 11.5 13 C 10.671875 13 10 13.671875 10 14.5 C 10 15.328125 10.671875 16 11.5 16 C 12.328125 16 13 15.328125 13 14.5 C 13 13.671875 12.328125 13 11.5 13 Z M 20.5 13 C 19.671875 13 19 13.671875 19 14.5 C 19 15.328125 19.671875 16 20.5 16 C 21.328125 16 22 15.328125 22 14.5 C 22 13.671875 21.328125 13 20.5 13 Z M 16 16 C 14.453125 16 13.394531 16.660156 12.75 17.21875 C 12.414063 17.09375 12.039063 17 11.59375 17 C 9.902344 17 9 18 9 18 L 9 20 L 23 20 L 23 18 C 23 18 22.082031 17 20.59375 17 C 20.082031 17 19.644531 17.089844 19.28125 17.21875 C 18.636719 16.65625 17.558594 16 16 16 Z"/></svg> : null}

                                            Google Classroom
                                    </span></> : <> {invite.classByClass ? invite.classByClass.title :
                                            <span className="inline-flex justify-start items-center">
                                            {!invite.is_disabled ? <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        className="h-5 mr-0.5 inline-block" viewBox="0 0 24 24"
                                                                        stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg> : null}

                                                Public
                                    </span>}</>}

                                        <span className="ml-1 font-normal text-gray-500">

                      </span>
                                    </div>
                                    <div className="mt-2 flex">
                                        <div className="flex-row sm:flex items-center text-sm leading-5 text-gray-500">
                                            <span className="flex items-center justify-start sm:inline-flex">
                                            <span>
                          {`Created on ${moment(invite.created_at).format('ddd MMM D')}, ${moment(invite.created_at).format('yyyy')}`}
                        </span>
                                            </span>

                                            <span className="mx-1 hidden sm:inline">•</span>
                                            <span className="block sm:inline">
                                                {invite.submissions_aggregate.aggregate.count} submission{invite.submissions_aggregate.aggregate.count !== 1 ? "s" : ""}
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



    </div>)
}

export default ResultPage
