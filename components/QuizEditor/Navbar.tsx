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
            <div className="w-full navbar sticky top-0 bg-white border-b border-gray-200 shadow-sm">
                <nav>
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
                            <div className="hidden sm:ml-6 lg:flex">
                                <a href="#"
                                   className="inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out">
                                    Edit
                                </a>
                                <a href="#"
                                   className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Results
                                </a>
                                <a href="#"
                                   className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Insights
                                </a>
                                <a href="#"
                                   className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    Settings
                                </a>
                            </div>
                            <div className="lg:ml-4 flex lg:items-center">

                                <div className="space-x-2 flex items-center">
                                    <div className="hidden lg:flex ">
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

                                        <NewTooltip title="Settings" placement="bottom" arrow enterDelay={500}
                                                    enterNextDelay={500}>
                                            <button type="button" aria-describedby={id} onClick={handleClick}
                                                    className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">
                                                <i className="fas fa-cog text-gray-400 mx-auto"/>
                                            </button>
                                        </NewTooltip>
                                    </div>

                                    <button type="button" onClick={() => toggleShareDialog(true)}
                                            className="inline-flex items-center px-4 h-10 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                        <i className="fas fa-users mr-2"/>Share
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
                <nav>
                    <div className="flex sm:ml-6 lg:hidden px-4 h-12">
                        <a href="#"
                           className="inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out">
                            Edit
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            Results
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            Insights
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            Settings
                        </a>
                    </div>
                </nav>
            </div>
            <div className="h-full">
                <SimpleModal isOpen={shareDialog} onCancel={() => toggleShareDialog(false)}/>
                {content}
            </div>

        </div>
    )

}
