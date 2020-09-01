import React, {useContext, useRef, useState} from "react";
import QuizContext from "./QuizContext";
import NewTooltip from "../Misc/Tooltip";
import {Navbar as PageNavbar} from "../PageLayouts/AppLayout/Navbar";
import {useMutation} from "urql";
import {updateAssignmentTitle} from "../../lib/graphql/Assignments";
import ShareAssignmentModal from "../Modals/ShareAssignmentModal";
import {useReactToPrint} from "react-to-print";
import AssignmentPrintRenderer from "./AssignmentPrintRenderer";



const Navbar = ({session, content, pageData, profileData}) => {
    const {clientId, setSaveStatus, setCurrentPage, currentPage, aid} = useContext(QuizContext);
    const [mutateTitleResult, mutateTitle] = useMutation(updateAssignmentTitle)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    // State for menus
    const [shareDialog, toggleShareDialog] = useState(false);

    const [isLoading, toggleIsLoading] = useState(false);


    // Popper Shit
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    return (
        <>
            <div className="hidden">
                {/*@ts-ignore*/}
                <AssignmentPrintRenderer ref={componentRef} document={pageData.assignments_assignment_by_pk.content} title={pageData.assignments_assignment_by_pk.title}/>
            </div>


            <div className="w-full z-50">
                <PageNavbar session={session} unfixed profileData={profileData}/>
                <div className="w-full navbar md:sticky top-0 bg-white border-b border-gray-200 shadow-sm">
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
                                                   defaultValue={pageData.assignments_assignment_by_pk.title}
                                                   onBlur={event => {
                                                       setSaveStatus(1)
                                                       if (event.target.value.length > 0) {
                                                           mutateTitle({
                                                               title: event.target.value,
                                                               assignmentId: pageData.assignments_assignment_by_pk.id,
                                                               clientId: clientId
                                                           })
                                                               .then(() => setSaveStatus(0))
                                                               .catch(() => setSaveStatus(2));
                                                       }
                                                   }}
                                            /></NewTooltip>
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 xl:flex">
                                    <button onClick={() => setCurrentPage(1)}
                                            className={currentPage === 1 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                        <i className="far fa-edit mr-2"/>Edit
                                    </button>
                                    <button onClick={() => setCurrentPage(2)}
                                            className={currentPage === 2 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                        <i className="fas fa-poll mr-2"/>Results
                                    </button>
                                    {/*<button onClick={() => setCurrentPage(3)}*/}
                                    {/*        className={currentPage === 3 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>*/}
                                    {/*    <i className="fas fa-chart-area mr-2"/>Insights*/}
                                    {/*</button>*/}
                                    <button onClick={() => setCurrentPage(4)}
                                            className={currentPage === 4 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-8" : "ml-8 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                        <i className="fas fa-cog mr-2"/>Settings
                                    </button>
                                </div>
                                <div className="lg:ml-4 flex lg:items-center">
                                    <div className="space-x-2 flex items-center w-auto">
                                        <div className="hidden lg:flex">

                                            <NewTooltip title="Print assignment" placement="bottom" arrow
                                                        enterDelay={500}
                                                        enterNextDelay={500}>
                                                <button type="button" aria-describedby={id} onClick={handlePrint}
                                                        className="inline-flex items-center justify-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 active:bg-gray-200 transition ease-in-out duration-150">
                                                    <svg className="text-gray-400 h-6"
                                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                                                    </svg>
                                                </button>
                                            </NewTooltip>

                                            {/*<NewTooltip title="Undo" placement="bottom" arrow enterDelay={500}*/}
                                            {/*            enterNextDelay={500}>*/}
                                            {/*    <button type="button" aria-describedby={id} onClick={handleClick}*/}
                                            {/*            className="inline-flex items-center h-9 w-9 text-center border border-transparent leading-5 font-medium rounded-md text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none active:bg-gray-200 transition ease-in-out duration-150">*/}
                                            {/*        <i className="fas fa-undo text-gray-400 mx-auto"/>*/}
                                            {/*    </button>*/}
                                            {/*</NewTooltip>*/}
                                        </div>
                                        <button type="button" onClick={() => toggleShareDialog(true)}
                                                className="inline-flex items-center px-3 h-10 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                            <svg className="h-5 mr-1.5 hidden sm:inline-block" viewBox="0 0 24 24"
                                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.68387 13.3419C8.88616 12.9381 9 12.4824 9 12C9 11.5176 8.88616 11.0619 8.68387 10.6581M8.68387 13.3419C8.19134 14.3251 7.17449 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.17449 9 8.19134 9.67492 8.68387 10.6581M8.68387 13.3419L15.3161 16.6581M8.68387 10.6581L15.3161 7.34193M15.3161 7.34193C15.8087 8.32508 16.8255 9 18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 6.48237 15.1138 6.93815 15.3161 7.34193ZM15.3161 16.6581C15.1138 17.0619 15 17.5176 15 18C15 19.6569 16.3431 21 18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.8255 15 15.8087 15.6749 15.3161 16.6581Z"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </svg>
                                            Share
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </nav>
                    <nav>
                        <div className="flex sm:ml-6 xl:hidden px-4 h-12">
                            <button onClick={() => setCurrentPage(1)}
                                    className={currentPage === 1 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                Edit
                            </button>
                            <button onClick={() => setCurrentPage(2)}
                                    className={currentPage === 2 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4" : "ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                Results
                            </button>
                            {/*<button onClick={() => setCurrentPage(3)}*/}
                            {/*        className={currentPage === 3 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4" : "ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>*/}
                            {/*    Insights*/}
                            {/*</button>*/}
                            <button onClick={() => setCurrentPage(4)}
                                    className={currentPage === 4 ? "inline-flex items-center px-1 pt-1 border-b-4 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out ml-4" : "ml-4 inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"}>
                                Settings
                            </button>
                        </div>
                    </nav>
                </div>
                <div className="h-full">
                    <ShareAssignmentModal isOpen={shareDialog} onCancel={() => toggleShareDialog(false)}
                                          session={session}
                                          assignmentId={aid}/>
                    {content}
                </div>

            </div>
        </>
    )

}

export default Navbar
