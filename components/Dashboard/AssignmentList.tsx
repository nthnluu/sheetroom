import {useMutation, useQuery, useSubscription} from "urql";
import gql from "graphql-tag";
import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import ReactGA from "react-ga";
import ShareAssignmentModal from "../Modals/ShareAssignmentModal";
import Transition from "../Transition";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InfoSnackbar from "../Snackbars/InfoSnackbar";
import DeleteAssignmentModal from "../Modals/DeleteAssignmentModal";
import JsonDebugBox from "../JsonDebugBox";
import {assignmentGridStudent, assignmentGridTeacher} from "../../lib/graphql/Assignments";


const ASSIGNMENTS = gql`
subscription Assignments($userId: Int!){
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


const StudentListItem = ({item, session}) => {

    return (
        <>
            <li
                className="relative pl-4 pr-4 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
                <div className="flex items-center justify-between space-x-4">
                    {/* Repo name and link */}
                    <div className="min-w-0 space-y-3">
                        <div className="flex items-center space-x-3">
                            {/*<span aria-label="Running"*/}
                            {/*      className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">*/}
                            {/*  <span className="h-2 w-2 bg-green-400 rounded-full"/>*/}
                            {/*</span>*/}
                            <span className="block">
                            <h2 className="text-sm font-medium leading-5">
                                <a href={"/join/" + item.join_code}>
                                    <span className="absolute inset-0"/>{item.assignmentByAssignment.title}</a>

                            </h2>
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm space-x-2 flex items-center">
                            {/*<span>AP Calculus</span>*/}
                            {/*<span>·</span>*/}
                            <span
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-purple-100 text-purple-800">
  {item.classByClass.title}
                            </span><span>Due on {moment(JSON.parse(item.config).dueDate).format('ddd, MMM DD ')} (<span className="capitalize">{moment(JSON.parse(item.config).dueDate).fromNow()}</span>)</span>
                        </p>
                    </div>
                    {/* Repo meta info */}
                    <div className="flex flex-col flex-shrink-0 items-end space-y-3">
                <span className="flex items-center space-x-4">


                    {/*<button className="relative" type="button">*/}
                    {/*    <svg className="h-5 w-5 text-yellow-300 hover:text-yellow-400" viewBox="0 0 20 20"*/}
                    {/*         fill="currentColor">*/}
                    {/*        <path*/}
                    {/*            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>*/}
                    {/*    </svg>*/}

                    {/*</button>*/}
                </span>
                    </div>
                </div>
            </li>
        </>)
}


const AssignmentListItem = ({item, session, toggleModal, setAssignmentId}) => {
    const [shareDialog, toggleShareDialog] = useState(false)
    const [dropdown, toggleDropdown] = useState(false);

    return (
        <>
            <li
                className="relative pl-4 pr-4 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
                <ShareAssignmentModal isOpen={shareDialog} onCancel={() => toggleShareDialog(false)} session={session}
                                      assignmentId={item.id}/>
                <div className="flex items-center justify-between space-x-4">
                    {/* Repo name and link */}
                    <div className="min-w-0 space-y-3">
                        <div className="flex items-center space-x-3">
                            {/*<span aria-label="Running"*/}
                            {/*      className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center">*/}
                            {/*  <span className="h-2 w-2 bg-green-400 rounded-full"/>*/}
                            {/*</span>*/}
                            <span className="block">
                            <h2 className="text-sm font-medium leading-5">
                                <a href={"/assignment/" + item.id}>
                                    <span className="absolute inset-0"/>{item.title}</a>

                            </h2>
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm space-x-2">
                            {/*<span>AP Calculus</span>*/}
                            {/*<span>·</span>*/}
                            <span>Updated {moment(item.updated_at).fromNow()}</span>
                        </p>
                    </div>
                    {/* Repo meta info */}
                    <div className="flex flex-col flex-shrink-0 items-end space-y-3">
                <span className="flex items-center space-x-4">
                    <ClickAwayListener onClickAway={() => toggleDropdown(false)}>
                        <div className="flex-shrink-0 relative">
                            <button id="pinned-project-options-menu-0" aria-haspopup="true"
                                    onClick={() => toggleDropdown(!dropdown)}
                                    className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                </svg>
                            </button>

                            <Transition appear={dropdown} show={dropdown} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">

                                <div
                                    className="z-10 mx-3 origin-top-right absolute right-5 top-3 w-48 mt-1 rounded-md shadow-lg">
                                    <div className="rounded-md bg-white shadow-xs" role="menu"
                                         aria-orientation="vertical"
                                         aria-labelledby="pinned-project-options-menu-0">
                                        <div className="py-1">
                                            <button onClick={() => {
                                                toggleDropdown(false)
                                                toggleShareDialog(true)
                                            }}
                                                    className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                    role="menuitem">Share Assignment</button>
                                        </div>
                                        <div className="py-1">
                                            <button onClick={() => {
                                                setAssignmentId(item.id)
                                                toggleDropdown(false)
                                                toggleModal(true)
                                            }}
                                                    className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                    role="menuitem">Delete</button>
                                        </div>
                                    </div>
                                </div>

                            </Transition>

                        </div>
                    </ClickAwayListener>

                    {/*<button className="relative" type="button">*/}
                    {/*    <svg className="h-5 w-5 text-yellow-300 hover:text-yellow-400" viewBox="0 0 20 20"*/}
                    {/*         fill="currentColor">*/}
                    {/*        <path*/}
                    {/*            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>*/}
                    {/*    </svg>*/}

                    {/*</button>*/}
                </span>
                    </div>
                </div>
            </li>
        </>)
}

interface AssignmentListProps {
    session: string;
    openDialog: any;
    profileData: any;
}

const AssignmentList: React.FC<AssignmentListProps> = ({session, openDialog, profileData}) => {
    const [currentAssignmentId, setAssignmentId] = useState(undefined)
    const [deleteModal, toggleModal] = useState(false)
    const [snackbarOpen, toggleSnackbar] = useState(false)

    const handleSubscription = (messages = [], response) => {
        return response;
    };

    const [result] = useSubscription({
        query: profileData.data.users_by_pk.account_type === "teacher" ? assignmentGridTeacher : assignmentGridStudent,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    }, handleSubscription);

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

    if (fetching && !data) {
        return <LoadingPlaceholder/>
    } else {
        return (<>
            <DeleteAssignmentModal itemId={currentAssignmentId} toggleSnackbar={toggleSnackbar} joinCode="" title="Delete Assignment?" onCancel={() => toggleModal(false)} isOpen={deleteModal}/>
            <InfoSnackbar isOpen={snackbarOpen} onClose={() => toggleSnackbar(false)} label="🗑 Assignment Deleted"/>
            {profileData.data.users_by_pk.account_type === "teacher" ?  <ul className="relative z-0 divide-y divide-gray-200  border-gray-200">
                {data.assignments_assignment.length > 0 ? data.assignments_assignment.map(item => <AssignmentListItem setAssignmentId={setAssignmentId} toggleModal={toggleModal} item={item} key={item.id} session={session}/> ) : <div className="my-8 text-center">
                    <img src="/assignment.svg" className="h-24 mx-auto opacity-25 mb-2"/>
                    {profileData.data.users_by_pk.account_type === "teacher" ?  <button className="text-center font-light opacity-25" onClick={openDialog}>Create new assignment</button> : <button className="text-center font-light opacity-25" onClick={openDialog}>View past submissions</button>}

                </div>}
            </ul> : <ul className="relative z-0 divide-y divide-gray-200  border-gray-200">
                {data.assignments_invite.length > 0 ? data.assignments_invite.map(item => <StudentListItem item={item} key={item.id} session={session}/> ) : <div className="my-8 text-center">
                    <img src="/assignment.svg" className="h-24 mx-auto opacity-25 mb-2"/>
                    {profileData.data.users_by_pk.account_type === "teacher" ?  <button className="text-center font-light opacity-25" onClick={openDialog}>Create new assignment</button> : <button className="text-center font-light opacity-25" onClick={openDialog}>View past submissions</button>}

                </div>}
            </ul>}

        </>)
    }

};

export default AssignmentList
