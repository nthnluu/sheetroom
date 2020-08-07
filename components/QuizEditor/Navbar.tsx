import Transition from "../Transition";
import React, {useContext, useState} from "react";
import QuizContext from "./QuizContext";
import NewTooltip from "../Misc/Tooltip";
import Popper from '@material-ui/core/Popper';
import {Navbar as PageNavbar} from "../PageLayouts/AppLayout/Navbar";
import {useMutation} from "urql";
import {updateAssignmentTitle} from "../../lib/graphql/Assignments";
import SimpleModal from "../Modals/SimpleModal";

export default function ({session, content, pageData}) {
    const {saveError, saveStatus, clientId, setSaveStatus} = useContext(QuizContext);
    const [mutateTitleResult, mutateTitle] = useMutation(updateAssignmentTitle)


    // State for menus
    const [mobileMenu, toggleMobileMenu] = useState(false);
    const [shareDialog, toggleShareDialog] = useState(false);


    // Popper Shit
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    return (
        <div className="w-full z-50">
            <PageNavbar session={session} unfixed/>
            <nav className=" w-full navbar sticky top-0 bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex px-2 lg:px-0">
                            <div className="flex justify-between items-center -ml-2">
                                <NewTooltip title="Rename Assignment" placement="bottom" enterDelay={500}
                                            enterNextDelay={500}>
                                    <input style={{textOverflow: "ellipsis"}}
                                           placeholder="Untitled Assignment"
                                           className="text-lg font-medium border border-transparent rounded-lg p-2 transition-all duration-150 focus:outline-none hover:border-gray-300 focus:border-blue-500 focus:border-4 h-auto"
                                           defaultValue={pageData.assignments_assignment_by_pk.title}
                                           onBlur={event => {
                                               setSaveStatus(1)
                                               mutateTitle({
                                                   title: event.target.value,
                                                   assignmentId: pageData.assignments_assignment_by_pk.id,
                                                   clientId: clientId
                                               })
                                                   .then(() => setSaveStatus(0))
                                                   .catch(() => setSaveStatus(2));
                                           }}
                                    /></NewTooltip>
                            </div>
                        </div>
                        <div className="hidden lg:ml-4 lg:flex lg:items-center">

                            <div className="space-x-2">
                                <NewTooltip title="Import item" placement="bottom" arrow enterDelay={500}
                                            enterNextDelay={500}>
                                    <button type="button" aria-describedby={id} onClick={handleClick}
                                            className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                        <i className="fas fa-file-import text-gray-400 mx-auto"/>
                                    </button>
                                </NewTooltip>

                                <NewTooltip title="Undo" placement="bottom" arrow enterDelay={500}
                                            enterNextDelay={500}>
                                    <button type="button" aria-describedby={id} onClick={handleClick}
                                            className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                        <i className="fas fa-undo text-gray-400 mx-auto"/>
                                    </button>
                                </NewTooltip>

                                <NewTooltip title="Settings" placement="bottom" arrow enterDelay={500}
                                            enterNextDelay={500}>
                                    <button type="button" aria-describedby={id} onClick={handleClick}
                                            className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                        <i className="fas fa-cog text-gray-400 mx-auto"/>
                                    </button>
                                </NewTooltip>
                                <button type="button" onClick={() => toggleShareDialog(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                    <i className="fas fa-users mr-2"/>Share
                                </button>
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
            <div className="h-full">
                <SimpleModal isOpen={shareDialog} onCancel={() => toggleShareDialog(false)}/>
                {content}
            </div>

        </div>
    )

}
