import Transition from "../Transition";
import React, {useContext, useEffect, useState} from "react";
import QuizContext from "../QuizEditor/QuizContext";
import NewTooltip from "../Misc/Tooltip";
import {useMutation} from "@apollo/react-hooks";
import {UPDATE_ASSIGNMENT_TITLE} from "../../gql/assignmentAutosave";
import Popper from '@material-ui/core/Popper';

export default function ({saveStatus, setSaveStatus}) {
    const {data, saveError, clientId, setLastSavedState} = useContext(QuizContext);
    const [mutateTitle] = useMutation(UPDATE_ASSIGNMENT_TITLE)

    // State for menus
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);


    // State for tracking the value of the title input field
    const [inputValue, setInputValue] = useState(data.assignments_assignment_by_pk.title);

    // Popper Shit
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;



    function saveTitle() {
        if (inputValue.length > 1 && inputValue !== data.assignments_assignment_by_pk.title) {
            setSaveStatus(1)
            mutateTitle({variables: {assignmentId: data.assignments_assignment_by_pk.id, title: inputValue, clientId: clientId}})
                .then((result) => {setSaveStatus(0); setLastSavedState(result.data)})
                .catch(() => setSaveStatus(2))
        }
    }

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex px-2 lg:px-0">
                        <div className="flex justify-between items-center">
                            <NewTooltip title="Return to dashboard" placement="bottom" arrow enterDelay={500}
                                        enterNextDelay={500}>
                                <button onClick={() => window.location.href = '/'}
                                        className="active:text-gray-500 hover:text-gray-300 focus:text-gray-300"><i
                                    className="fas fa-arrow-left text-gray-400 mr-2"/></button>
                            </NewTooltip>

                            <NewTooltip title="Rename Assignment" placement="bottom" arrow enterDelay={500}
                                        enterNextDelay={500}>
                                <input onBlur={() => saveTitle()} style={{textOverflow: "ellipsis"}}
                                       placeholder="Untitled Assignment"
                                       className="text-lg font-medium border border-transparent rounded-lg p-2 transition-all duration-150 focus:outline-none hover:border-gray-300 focus:border-blue-500 focus:border-4 h-auto"
                                       value={inputValue}
                                       onChange={event => setInputValue(event.target.value)}/></NewTooltip>
                        </div>
                    </div>
                    <div className="flex items-center lg:hidden">
                        {/*// <!-- Mobile menu button -->*/}
                        <button onClick={() => toggleMobileMenu(!mobileMenu)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                aria-label="Main menu" aria-expanded="false">
                            {/*// <!-- Icon when menu is closed. -->*/}
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            {/*// <!-- Icon when menu is open. -->*/}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:ml-4 lg:flex lg:items-center">
                        {/*<button*/}
                        {/*    className="flex-shrink-0 p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"*/}
                        {/*    aria-label="Notifications">*/}
                        {/*    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                        {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                        {/*              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>*/}
                        {/*    </svg>*/}
                        {/*</button>*/}

                        {/*// <!-- Profile dropdown -->*/}
                        <div className="space-x-2">
                            <button type="button" aria-describedby={id} onClick={handleClick}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                {saveStatus === 2 ?
                                    <span className="text-red-500"><i className="fas fa-exclamation-circle mr-2"/>Error</span> : (saveStatus === 1 ?
                                        <span><i className="fas fa-sync-alt mr-2 fa-spin text-gray-400"/>Saving</span> :
                                        <span><i className="fas fa-check mr-2 text-green-500"/>Saved</span>)}
                            </button>
                            <Popper id={id} open={open} anchorEl={anchorEl}>
                                <div className="z-50 mt-4 bg-white rounded-lg shadow-lg max-w-sm">
                                    {saveError ? <div className="p-4 rounded-t-lg text-red-600 text-center"><i
                                        className="fas fa-exclamation-circle mr-2"/>There were issues saving this document.
                                        <p>{JSON.stringify(saveError)}</p>
                                    </div> : <div className="p-4 rounded-t-lg text-blue-600 text-center"><i
                                        className="fas fa-cloud mr-2"/>All changes automatically saved to the
                                        Homework Cloud.
                                    </div>}
                                </div>
                            </Popper>

                            <button type="button"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                <i className="fas fa-users mr-2"/>Share
                            </button>
                        </div>
                        <div className="ml-4 relative flex-shrink-0">
                            <div>
                                <button onClick={() => toggleProfileDropdown(!profileDropdown)}
                                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                        id="user-menu" aria-label="User menu" aria-haspopup="true">
                                    <img className="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>

                            <Transition show={profileDropdown} enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                                     style={{zIndex: 10}}>
                                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                         aria-orientation="vertical" aria-labelledby="user-menu">
                                        <a href="#"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                           role="menuitem">Your Profile</a>
                                        <a href="#"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                           role="menuitem">Settings</a>
                                        <a href="/api/auth/signout"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                           role="menuitem">Sign out</a>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            {/*// <!--*/}
            {/*//   Mobile menu, toggle classes based on menu state.*/}
            {/*//*/}
            {/*//   Menu open: "block", Menu closed: "hidden"*/}
            {/*// -->*/}
            {mobileMenu ? <div className="block lg:hidden">
                <div className="pt-2 pb-3">
                    <a href="#"
                       className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out">Dashboard</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Team</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Projects</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Calendar</a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
                            <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <a href="#"
                           className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Your
                            Profile</a>
                        <a href="#"
                           className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Settings</a>
                        <a href="#"
                           className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Sign
                            out</a>
                    </div>
                </div>
            </div> : null}
        </nav>
    )

}