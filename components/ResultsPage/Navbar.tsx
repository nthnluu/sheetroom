import Transition from "../Transition";
import React, {useContext, useState} from "react";
import QuizContext from "../AssignmentEditor/QuizContext";
import NewTooltip from "../Misc/Tooltip";
import {Navbar as PageNavbar} from "../PageLayouts/AppLayout/Navbar";
import {useMutation} from "urql";
import {updateAssignmentTitle} from "../../lib/graphql/Assignments";
import ShareAssignmentModal from "../Modals/ShareAssignmentModal";

const Navbar =  ({session, content, title, currentPage, setCurrentPage})  => {
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
            <div className="w-full navbar sticky top-0 bg-white border-b border-gray-200 shadow-sm">
                <nav>
                    <div className="mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex px-0">
                                <div className="flex items-center lg:-ml-2">
                                    <NewTooltip title="Rename Assignment" placement="bottom" enterDelay={500}
                                                enterNextDelay={500}>
                                        <input style={{textOverflow: "ellipsis"}}
                                               placeholder="Untitled Assignment"
                                               className="text-lg font-medium border w-48 sm:w-auto border-transparent rounded-lg p-2 transition-all duration-150 focus:outline-none hover:border-gray-300 focus:border-blue-500 focus:border-4 h-auto"
                                               defaultValue={title}
                                        /></NewTooltip>
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 xl:flex">
                                <button onClick={() => setCurrentPage(1)}
                                   className={currentPage === 1 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                    <i className="fas fa-user-friends mr-2"/>People
                                </button>
                                <button onClick={() => setCurrentPage(2)}
                                        className={currentPage === 2 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                    <i className="fas fa-poll mr-2"/>Submissions
                                </button>
                                <button onClick={() => setCurrentPage(3)}
                                    className={currentPage === 3 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                    <i className="fas fa-chart-area mr-2"/>Insights
                                </button>
                                <button onClick={() => setCurrentPage(4)}
                                        className={currentPage === 4 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                    <i className="fas fa-cog mr-2"/>Settings
                                </button>
                            </div>
                            <div className="lg:ml-4 flex lg:items-center">
                                <div className="space-x-2 flex items-center w-auto">
                                    <div className="hidden lg:flex">
                                        <NewTooltip title="Import item" placement="bottom" arrow enterDelay={500}
                                                    enterNextDelay={500}>
                                            <button type="button" aria-describedby={id} onClick={handleClick}
                                                    className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150">
                                                <i className="fas fa-file-import text-gray-400 mx-auto"/>
                                            </button>
                                        </NewTooltip>

                                        <NewTooltip title="Undo" placement="bottom" arrow enterDelay={500}
                                                    enterNextDelay={500}>
                                            <button type="button" aria-describedby={id} onClick={handleClick}
                                                    className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                                <i className="fas fa-undo text-gray-400 mx-auto"/>
                                            </button>
                                        </NewTooltip>
                                    </div>
                                    <button type="button" onClick={() => toggleShareDialog(true)}
                                            className="inline-flex items-center px-3 h-10 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                        <i className="fas fa-users mr-2 hidden sm:inline-block"/>Invite
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
                <nav>
                    <div className="flex sm:ml-6 xl:hidden px-4 h-12">
                        <button onClick={() => setCurrentPage(1)}
                           className={currentPage === 1 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                            Edit
                        </button>
                        <button onClick={() => setCurrentPage(2)}
                                className={currentPage === 2 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4":"ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                            Results
                        </button>
                        <button onClick={() => setCurrentPage(3)}
                                className={currentPage === 3 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4":"ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                            Insights
                        </button>
                        <button onClick={() => setCurrentPage(4)}
                                className={currentPage === 4 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4":"ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                            Settings
                        </button>
                    </div>
                </nav>
                <div className="h-full">
                    {content}
                </div>
            </div>


        </div>
    )

}

export default Navbar
