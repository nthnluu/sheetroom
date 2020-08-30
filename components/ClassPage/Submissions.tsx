import React, {useContext} from "react";
import JsonDebugBox from "../JsonDebugBox";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import QuizContext from "../AssignmentEditor/QuizContext";
import {useQuery} from "urql";
import {getSubmissionsForAssignment} from "../../lib/graphql/Assignments";
import {getSubmissionsFromClassWithUser} from "../../lib/graphql/Submissions";
import ClassContext from "./ClassContext";


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


const NoStudentsPlaceholder = ({joinCode}) => {
    return (<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center overflow-x-auto">
            <img src="/holding-phone-monochrome.svg" className="h-64 mx-auto mb-2" alt=""/>
            <h1 className="text-lg sm:text-xl text-gray-700 font-medium">Now invite students with this link:</h1>
            <span className="text-lg sm:text-xl md:text-3xl font-light text-gray-400">sheetroom.com/join/</span><span
            className="text-lg sm:text-xl md:text-3xl  font-bold text-gray-800">{joinCode}</span>
        </div>
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
                        <ul>
                            <li>
                                <a href="#" className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                                    Semester 2 Final
                                                    <span className="ml-1 font-normal text-gray-500">
                        in Engineering
                      </span>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm leading-5 text-gray-500">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>
                          Submitted on
                          <time dateTime="2020-01-07">January 7, 2020</time>
                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="border-t border-gray-200">
                                <a href="#" className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                                    Back End Developer
                                                    <span className="ml-1 font-normal text-gray-500">
                        in Engineering
                      </span>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm leading-5 text-gray-500">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>
                          Closing on
                          <time dateTime="2020-01-07">January 7, 2020</time>
                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                                                <div className="flex overflow-hidden">
                                                    <img className="inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li className="border-t border-gray-200">
                                <a href="#" className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                    <div className="px-4 py-4 flex items-center sm:px-6">
                                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                                    Back End Developer
                                                    <span className="ml-1 font-normal text-gray-500">
                        in Engineering
                      </span>
                                                </div>
                                                <div className="mt-2 flex">
                                                    <div className="flex items-center text-sm leading-5 text-gray-500">
                                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span>
                          Closing on
                          <time dateTime="2020-01-07">January 7, 2020</time>
                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex-shrink-0 sm:mt-0">
                                                <div className="flex overflow-hidden">
                                                    <img className="inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                                                    <img className="-ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-5 flex-shrink-0">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </> : <NoStudentsPlaceholder joinCode={course.join_code}/>}
            </>)
    }


}

export default Submissions
