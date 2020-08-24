import React, {useState} from "react";
import AssignmentList from "./AssignmentList";
import NewAssignmentModal from "../Modals/NewAssignmentModal";
import NewClassModal from "../Modals/NewClassModal";
import ClassGrid from "./ClassGrid";
import NewTooltip from "../Misc/Tooltip";


interface Props {
    session: any;
}


const ProjectList: React.FC<Props> = ({session}) => {
    const [sortDropdown, toggleSortDropdown] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);
    const [createClassDialog, toggleCreateClassDialog] = useState(false);

    // @ts-ignore
    return (
        <div className="bg-white lg:min-w-0 lg:flex-1 w-full">

            <NewClassModal onCancel={() => toggleCreateClassDialog(false)} isOpen={createClassDialog}
                           session={session}/>
            <NewAssignmentModal onCancel={() => toggleCreateAssignmentDialog(false)} isOpen={createAssignmentDialog}
                                session={session}/>
            <div className="border-b border-gray-200 pb-8">
                <div
                    className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                    <div className="flex items-center">
                        <h1 className="flex-1 text-lg leading-7 font-medium">Classes</h1>
                        <div>
                            <NewTooltip title="Create new class" placement="bottom" enterDelay={500}
                                        enterNextDelay={500}>

                                <button type="button" onClick={() => toggleCreateClassDialog(true)}
                                        className="flex items-center justify-center h-8 w-8 border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 4v16m8-8H4" strokeWidth="2"/>
                                    </svg>
                                </button>

                            </NewTooltip>
                        </div>
                    </div>
                </div>
                <div className="px-4 mt-6 sm:px-6 lg:px-6">
                    {/*@ts-ignore*/}
                    <ClassGrid session={session}/>
                </div>
            </div>


            <div
                className="px-4 pt-4 pb-4 border-b border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-4 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg leading-7 font-medium">Assignments</h1>
                    <div className="relative">
                        <div className="flex">
                            {/*    <ClickAwayListener onClickAway={() => toggleSortDropdown(false)}>*/}
                            {/*    <div>*/}
                            {/*            <span className="rounded-md shadow-sm">*/}

                            {/*    <button id="sort-menu" onClick={() => toggleSortDropdown(!sortDropdown)} type="button"*/}
                            {/*            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"*/}
                            {/*            aria-haspopup="true" aria-expanded="false">*/}
                            {/*      <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">*/}
                            {/*        <path*/}
                            {/*            d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"/>*/}
                            {/*      </svg>*/}
                            {/*      Sort*/}
                            {/*      <svg className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">*/}
                            {/*        <path fillRule="evenodd"*/}
                            {/*              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"*/}
                            {/*              clipRule="evenodd"/>*/}
                            {/*      </svg>*/}
                            {/*    </button>*/}

                            {/*  </span>*/}

                            {/*        <Transition appear={sortDropdown} show={sortDropdown}*/}
                            {/*                    enter="transition ease-out duration-100"*/}
                            {/*                    enterFrom="transform opacity-0 scale-95"*/}
                            {/*                    enterTo="transform opacity-100 scale-100"*/}
                            {/*                    leave="transition ease-in duration-75"*/}
                            {/*                    leaveTo="transform opacity-0 scale-95"*/}
                            {/*                    leaveFrom="transform opacity-100 scale-100">*/}
                            {/*            <div*/}
                            {/*                className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg">*/}
                            {/*                <div className="rounded-md bg-white shadow-xs">*/}
                            {/*                    <div className="py-1" role="menu" aria-orientation="vertical"*/}
                            {/*                         aria-labelledby="sort-menu">*/}
                            {/*                        <a href="#"*/}
                            {/*                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                            {/*                           role="menuitem">Name</a>*/}
                            {/*                        <a href="#"*/}
                            {/*                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                            {/*                           role="menuitem">Date modified</a>*/}
                            {/*                        <a href="#"*/}
                            {/*                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                            {/*                           role="menuitem">Date created</a>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </Transition>*/}
                            {/*    </div>*/}

                            {/*</ClickAwayListener>*/}
                            <NewTooltip title="New assignment" placement="bottom" enterDelay={500}
                                        enterNextDelay={500}>

                                <button type="button" onClick={() => toggleCreateAssignmentDialog(true)}
                                        className="flex items-center justify-center h-8 w-8 border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M12 4v16m8-8H4" strokeWidth="2"/>
                                    </svg>
                                </button>

                            </NewTooltip>
                        </div>


                    </div>
                </div>
            </div>
            <AssignmentList session={session}/>
        </div>)
}

export default ProjectList
