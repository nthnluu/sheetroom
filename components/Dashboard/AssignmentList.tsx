import {useQuery} from "urql";
import gql from "graphql-tag";
import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import ReactGA from "react-ga";
import ShareAssignmentModal from "../Modals/ShareAssignmentModal";


const ASSIGNMENTS = gql`
query Assignments($userId: Int!){
  assignments_assignment(where: {created_by: {_eq: $userId}}, limit: 10, order_by: {updated_at: desc}) {
    id,
    title
    updated_at
    __typename
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


const AssignmentListItem = ({item, session}) => {
    const [shareDialog, toggleShareDialog] = useState(false)
    return (<li
        className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
        <ShareAssignmentModal isOpen={shareDialog} onCancel={() => toggleShareDialog(false)} session={session} assignmentId={item.id}/>
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
                                <a href={"/assignment/" + item.id}>
                                    <span className="absolute inset-0"/>{item.title}</a>
                            </h2>
                          </span>
                </div>
                <button onClick={() => toggleShareDialog(true)} className="relative group flex items-center space-x-2.5 focus:outline-none focus:shadow-outline rounded">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.68387 13.3419C8.88616 12.9381 9 12.4824 9 12C9 11.5176 8.88616 11.0619 8.68387 10.6581M8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581M8.68387 13.3419L15.3161 16.6581M8.68387 10.6581L15.3161 7.34193M15.3161 7.34193C15.8087 8.32508 16.8255 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.48237 15.1138 6.93815 15.3161 7.34193ZM15.3161 16.6581C15.1138 17.0619 15 17.5176 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.8255 15 15.8087 15.6749 15.3161 16.6581Z"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    <div
                        className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium truncate">
                        Share assignment
                    </div>
                </button>
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


                    <a href={"/assignment/" + item.id}
                       className="relative text-sm leading-5 text-gray-500 hover:text-gray-900 font-medium">
                        View
                    </a>

                    {/*<button className="relative" type="button">*/}
                    {/*    <svg className="h-5 w-5 text-yellow-300 hover:text-yellow-400" viewBox="0 0 20 20"*/}
                    {/*         fill="currentColor">*/}
                    {/*        <path*/}
                    {/*            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>*/}
                    {/*    </svg>*/}

                    {/*</button>*/}
                </p>
                <p className="flex text-gray-500 text-sm leading-5 space-x-2">
                    {/*<span>AP Calculus</span>*/}
                    {/*<span>·</span>*/}
                    <span>Last updated {moment(item.updated_at).fromNow()}</span>
                </p>
            </div>
        </div>
    </li>)
}

interface AssignmentListProps {
    session: string;
    openDialog: any;
}

const AssignmentList: React.FC<AssignmentListProps> = ({session, openDialog}) => {
    const [result] = useQuery({
        query: ASSIGNMENTS,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    });

    const {fetching, data, error} = result

    if (error) {
        ReactGA.event({
            category: 'Error',
            action: 'Fetch Assignment List Error (GraphQL QUERY)',
            // @ts-ignore
            label: error
        })
        return <LoadingPlaceholder/>
    }

    if (fetching) {
        return <LoadingPlaceholder/>
    } else {
        return (<>
            <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
                {data.assignments_assignment.length > 0 ? data.assignments_assignment.map(item => <AssignmentListItem item={item} key={item.id} session={session}/> ) : <div className="my-8 text-center">
                    <img src="/assignment.svg" className="h-24 mx-auto opacity-25 mb-2"/>
                    <button className="text-center text-light opacity-25" onClick={openDialog}>Create new assignment</button>
                </div>}
            </ul>
        </>)
    }

};

export default AssignmentList
