import {useQuery} from "urql";
import gql from "graphql-tag";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


const ASSIGNMENTS = gql`
query Assignments($userId: Int!){
  assignments_assignment(where: {created_by: {_eq: $userId}}, limit: 10, order_by: {updated_at: desc}) {
    id,
    title
  }
  
}
`;

const LoadingPlaceholder = () => {
    return (<div className="p-6 border-b border-gray-200">
        <div className="mx-auto">
            <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
        </div>
    </div>)
};


interface AssignmentListProps {
    session: string;
}

const AssignmentList: React.FC<AssignmentListProps> = ({session}) => {

    const [result] = useQuery({
        query: ASSIGNMENTS,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    });

    const {fetching, data} = result
    if (fetching) return <LoadingPlaceholder/>;

    if (data) return (
        <>
        <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            {data.assignments_assignment ? data.assignments_assignment.map(item => <li
                    className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
                    <div className="flex items-center justify-between space-x-4">
                        {/* Repo name and link */}
                        <div className="min-w-0 space-y-3">
                            <div className="flex items-center space-x-3">
                          <span aria-label="Running"
                                className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="h-2 w-2 bg-green-400 rounded-full"/>
                          </span>
                                <span className="block">
                            <h2 className="text-sm font-medium leading-5">
                              <a href={"/edit/assignment/"+ item.id}>
                                <span className="absolute inset-0"/>
                                  {item.title}
                              </a>
                            </h2>
                          </span>
                            </div>
                            <a href="#" className="relative group flex items-center space-x-2.5">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                     viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
                                          fill="currentcolor"/>
                                </svg>
                                <div
                                    className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium truncate">
                                    debbielewis/workcation
                                </div>
                            </a>
                        </div>
                        <div className="sm:hidden">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        {/* Repo meta info */}
                        <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                            <p className="flex items-center space-x-4">
                                <a href="#"
                                   className="relative text-sm leading-5 text-gray-500 hover:text-gray-900 font-medium">
                                    Visit site
                                </a>
                                <button className="relative" type="button">
                                    <svg className="h-5 w-5 text-yellow-300 hover:text-yellow-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                </button>
                            </p>
                            <p className="flex text-gray-500 text-sm leading-5 space-x-2">
                                <span>Laravel</span>
                                <span>·</span>
                                <span>Last deploy 3h ago</span>
                                <span>·</span>
                                <span>United states</span>
                            </p>
                        </div>
                    </div>
                </li>) : <></>}
        </ul>
        </>


    )
};

export default AssignmentList
