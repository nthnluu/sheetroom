import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, {useState} from "react";
import Transition from "../Transition";
import AssignmentList from "./AssignmentList";
import NewAssignmentDialog from "../DialogBox/NewAssignmentDialog";
import NewClassDialog from "../DialogBox/NewClassDialog";


interface Props {
    session: string;
}


const ProjectList: React.FC<Props> = ({session}) => {
    const [sortDropdown, toggleSortDropdown] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);
    const [createClassDialog, toggleCreateClassDialog] = useState(false);

    return (
        <div className="bg-white lg:min-w-0 lg:flex-1 w-full">

            <NewAssignmentDialog onClose={() => toggleCreateAssignmentDialog(false)} open={createAssignmentDialog} session={session}/>
            <NewClassDialog onClose={() => toggleCreateClassDialog(false)} open={createClassDialog} session={session}/>
            <div className="border-b border-gray-200 pb-8">
                <div
                    className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                    <div className="flex items-center">
                        <h1 className="flex-1 text-lg leading-7 font-medium">Classes</h1>
                        <div className="relative">
                            <button id="sort-menu"  type="button" onClick={() => toggleCreateClassDialog(true)}
                                    className="inline-flex ml-2 justify-center w-full rounded-md border border-blue-600 px-3 py-2 bg-blue-600 text-sm leading-5 font-medium text-white hover:text-white focus:outline-none focus:border-blue-500 focus:shadow-outline active:bg-blue-400 transition ease-in-out duration-150"
                                    aria-haspopup="true" aria-expanded="false">
                                <svg className="mr-1 h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        d="M12 4v16m8-8H4" stroke-width="2"/>
                                </svg>
                                New
                            </button>



                        </div>
                    </div>
                </div>
                <div className="px-4 mt-6 sm:px-6 lg:px-6">
                    <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2 mt-3">
                        <li className="relative col-span-1 flex shadow-sm rounded-md">
                            <div
                                className="flex-shrink-0 flex items-center justify-center w-16 bg-red-600 text-white text-sm leading-5 font-medium rounded-l-md">
                                GA
                            </div>
                            <div
                                className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                                    <a href="#"
                                       className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                                        GraphQL API
                                    </a>
                                    <p className="text-gray-500">12 Members</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button id="pinned-project-options-menu-0" aria-has-popup="true"
                                            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                    {/*// <!--*/}
                                    {/*//   Dropdown panel, show/hide based on dropdown state.*/}
                                    {/*//*/}
                                    {/*//   Entering: "transition ease-out duration-100"*/}
                                    {/*//     From: "transform opacity-0 scale-95"*/}
                                    {/*//     To: "transform opacity-100 scale-100"*/}
                                    {/*//   Leaving: "transition ease-in duration-75"*/}
                                    {/*//     From: "transform opacity-100 scale-100"*/}
                                    {/*//     To: "transform opacity-0 scale-95"*/}
                                    {/*// -->*/}
                                    {/*<div*/}
                                    {/*    className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">*/}
                                    {/*    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"*/}
                                    {/*         aria-labelledby="pinned-project-options-menu-0">*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">View</a>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="border-t border-gray-100"></div>*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Removed from pinned</a>*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Share</a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </li>
                        <li className="relative col-span-1 flex shadow-sm rounded-md">
                            <div
                                className="flex-shrink-0 flex items-center justify-center w-16 bg-teal-600 text-white text-sm leading-5 font-medium rounded-l-md">
                                GA
                            </div>
                            <div
                                className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                                    <a href="#"
                                       className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                                        GraphQL API
                                    </a>
                                    <p className="text-gray-500">12 Members</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button id="pinned-project-options-menu-0" aria-has-popup="true"
                                            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                    {/*// <!--*/}
                                    {/*//   Dropdown panel, show/hide based on dropdown state.*/}
                                    {/*//*/}
                                    {/*//   Entering: "transition ease-out duration-100"*/}
                                    {/*//     From: "transform opacity-0 scale-95"*/}
                                    {/*//     To: "transform opacity-100 scale-100"*/}
                                    {/*//   Leaving: "transition ease-in duration-75"*/}
                                    {/*//     From: "transform opacity-100 scale-100"*/}
                                    {/*//     To: "transform opacity-0 scale-95"*/}
                                    {/*// -->*/}
                                    {/*<div*/}
                                    {/*    className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">*/}
                                    {/*    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"*/}
                                    {/*         aria-labelledby="pinned-project-options-menu-0">*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">View</a>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="border-t border-gray-100"></div>*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Removed from pinned</a>*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Share</a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </li>
                        <li className="relative col-span-1 flex shadow-sm rounded-md">
                            <div
                                className="flex-shrink-0 flex items-center justify-center w-16 bg-green-600 text-white text-sm leading-5 font-medium rounded-l-md">
                                GA
                            </div>
                            <div
                                className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                                    <a href="#"
                                       className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                                        GraphQL API
                                    </a>
                                    <p className="text-gray-500">12 Members</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button id="pinned-project-options-menu-0" aria-has-popup="true"
                                            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                    {/*// <!--*/}
                                    {/*//   Dropdown panel, show/hide based on dropdown state.*/}
                                    {/*//*/}
                                    {/*//   Entering: "transition ease-out duration-100"*/}
                                    {/*//     From: "transform opacity-0 scale-95"*/}
                                    {/*//     To: "transform opacity-100 scale-100"*/}
                                    {/*//   Leaving: "transition ease-in duration-75"*/}
                                    {/*//     From: "transform opacity-100 scale-100"*/}
                                    {/*//     To: "transform opacity-0 scale-95"*/}
                                    {/*// -->*/}
                                    {/*<div*/}
                                    {/*    className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">*/}
                                    {/*    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"*/}
                                    {/*         aria-labelledby="pinned-project-options-menu-0">*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">View</a>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="border-t border-gray-100"></div>*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Removed from pinned</a>*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Share</a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </li>
                        <li className="relative col-span-1 flex shadow-sm rounded-md">
                            <div
                                className="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm leading-5 font-medium rounded-l-md">
                                GA
                            </div>
                            <div
                                className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                                    <a href="#"
                                       className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                                        GraphQL API
                                    </a>
                                    <p className="text-gray-500">12 Members</p>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <button id="pinned-project-options-menu-0" aria-has-popup="true"
                                            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                    {/*// <!--*/}
                                    {/*//   Dropdown panel, show/hide based on dropdown state.*/}
                                    {/*//*/}
                                    {/*//   Entering: "transition ease-out duration-100"*/}
                                    {/*//     From: "transform opacity-0 scale-95"*/}
                                    {/*//     To: "transform opacity-100 scale-100"*/}
                                    {/*//   Leaving: "transition ease-in duration-75"*/}
                                    {/*//     From: "transform opacity-100 scale-100"*/}
                                    {/*//     To: "transform opacity-0 scale-95"*/}
                                    {/*// -->*/}
                                    {/*<div*/}
                                    {/*    className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">*/}
                                    {/*    <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"*/}
                                    {/*         aria-labelledby="pinned-project-options-menu-0">*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">View</a>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="border-t border-gray-100"></div>*/}
                                    {/*        <div className="py-1">*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Removed from pinned</a>*/}
                                    {/*            <a href="#"*/}
                                    {/*               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"*/}
                                    {/*               role="menuitem">Share</a>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </li>

                        {/*// <!-- More project cards... -->*/}
                    </ul>
                </div>
            </div>


        <div
            className="pl-4 pr-4 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-4 xl:border-t-0">
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
                        <button id="sort-menu" onClick={() => toggleCreateAssignmentDialog(true)} type="button"
                                className="inline-flex ml-2 justify-center w-full rounded-md border border-blue-600 px-4 py-2 bg-blue-600 text-sm leading-5 font-medium text-white hover:text-white focus:outline-none focus:border-blue-500 focus:shadow-outline active:bg-blue-400 transition ease-in-out duration-150"
                                aria-haspopup="true" aria-expanded="false">
                            <svg className="mr-1 h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    d="M12 4v16m8-8H4" stroke-width="2"/>
                            </svg>
                            New
                        </button>
                    </div>



                </div>
            </div>
        </div>
        <AssignmentList session={session}/>
        <div className="p-6 text-gray-400 font-semibold">
            <p>© Sheetroom, Inc. 2020</p>
        </div>
    </div>)
}

export default ProjectList
