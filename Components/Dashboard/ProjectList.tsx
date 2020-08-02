import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, {useState} from "react";
import Transition from "../Transition";
import AssignmentList from "./AssignmentList";

interface Props {
    session: object;
}

const ProjectList: React.FC<Props> = ({session}) => {
    const [sortDropdown, toggleSortDropdown] = useState(false);


    return (<div className="bg-white lg:min-w-0 lg:flex-1">
        <div
            className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
            <div className="flex items-center">
                <h1 className="flex-1 text-lg leading-7 font-medium">Assignments</h1>
                <div className="relative">
                    <ClickAwayListener onClickAway={() => toggleSortDropdown(false)}>
                        <div>
                                <span className="rounded-md shadow-sm">

                        <button id="sort-menu" onClick={() => toggleSortDropdown(!sortDropdown)} type="button"
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                                aria-haspopup="true" aria-expanded="false">
                          <svg className="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"/>
                          </svg>
                          Sort
                          <svg className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                          </svg>
                        </button>

                      </span>

                            <Transition appear={sortDropdown} show={sortDropdown}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveTo="transform opacity-0 scale-95"
                                        leaveFrom="transform opacity-100 scale-100">
                                <div
                                    className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                                    <div className="rounded-md bg-white shadow-xs">
                                        <div className="py-1" role="menu" aria-orientation="vertical"
                                             aria-labelledby="sort-menu">
                                            <a href="#"
                                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                               role="menuitem">Name</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                               role="menuitem">Date modified</a>
                                            <a href="#"
                                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                               role="menuitem">Date created</a>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                    </ClickAwayListener>


                </div>
            </div>
        </div>
        {/*// @ts-ignore*/}
        <AssignmentList userId={session.userId}/>
    </div>)
}

export default ProjectList