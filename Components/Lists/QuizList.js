import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

const ASSIGNMENTS = gql`
query Assignments($userId: Int!){
  assignments_assignment(where: {created_by: {_eq: $userId}}) {
    id,
    title,
    description,
  }
  
}
`;

const LoadingPlaceholder = () => {
    return (<div className="bg-white shadow-sm border border-gray-200 overflow-hidden rounded-md mt-10 p-6">
        <i className="fas fa-circle-notch fa-spin text-4xl text-gray-200 w-full text-center"></i>
    </div>)
};


const QuizList = ({userId}) => {
    const {loading, error, data} = useQuery(ASSIGNMENTS, {variables: {userId: userId}});
    if (loading) return <LoadingPlaceholder/>;
    if (data === undefined) return null;

    return (
        <>
            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden rounded-md">
                <ul>
                    {data.assignments_assignment.map((item, index) => <li key={item.id}
                                                        className={(index === 0) ? null : "border-t border-gray-200"}>
                        <a href={"/edit/assignment/" + item.id}
                           className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                                        {item.title}
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex">
                                    <span
                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Full-time
                                    </span>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                 viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path
                                                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                            </svg>
                                            {item.id}
                                        </div>
                                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                 viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path fill-rule="evenodd"
                                                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                            Remote
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span>
                Closing on
                <time dateTime="2020-01-07">January 7, 2020</time>
              </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>)}
                </ul>
            </div>
        </>
    )
};

export default QuizList
