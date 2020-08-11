import React, {useState} from "react";
import {useQuery} from "urql";
import CircularProgress from "@material-ui/core/CircularProgress";
import {allClasses} from "../../lib/graphql/Class";
import getInitials from "../../lib/getInitials";
import Transition from "../Transition";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const ClassCard = ({course}) => {
    const [dropdown, toggleDropdown] = useState(false);

    const {title, id, color} = course
    const colorObject = (inputColor) => {
        switch (inputColor) {
            case('red'):
                return {bg: "bg-red-500"}
            case('blue'):
                return {bg: "bg-blue-500"}
            case('pink'):
                return {bg: "bg-pink-500"}
            case('teal'):
                return {bg: "bg-teal-400"}
            default:
                return {bg: "bg-gray-400"}
        }
    }


    return (<li className="relative col-span-1 flex shadow-sm rounded-md">
        <div
            className={"flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md " + colorObject(color).bg}>
            {getInitials(title)}
        </div>
        <div
            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                <a href={"/class/" + id}
                   className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                    {title}
                </a>
                <p className="text-gray-500">12 Members</p>
            </div>
            <ClickAwayListener onClickAway={() => toggleDropdown(false)}>
                <div className="flex-shrink-0 pr-2">
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
                                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">

                        <div
                            className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg">
                            <div className="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical"
                                 aria-labelledby="pinned-project-options-menu-0">
                                <div className="py-1">
                                    <a href="#"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                       role="menuitem">Show join code</a>
                                </div>
                                <div className="py-1">
                                    <a href="#"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                       role="menuitem">Delete class</a>
                                </div>
                            </div>
                        </div>

                    </Transition>

                </div>
            </ClickAwayListener>
        </div>
    </li>)
}

export default ClassCard
