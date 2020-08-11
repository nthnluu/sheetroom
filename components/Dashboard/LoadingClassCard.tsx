import React, {useState} from "react";
import {useQuery} from "urql";
import CircularProgress from "@material-ui/core/CircularProgress";
import {allClasses} from "../../lib/graphql/Class";
import getInitials from "../../lib/getInitials";
import Transition from "../Transition";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const LoadingClassCard = () => {

    return (<li className="relative col-span-1 flex shadow-sm rounded-md animate-pulse opacity-75 h-15">
        <div
            className={"flex-shrink-0 flex items-center justify-center w-16 text-white text-sm leading-5 font-medium rounded-l-md bg-gray-200"}>
        </div>
        <div
            className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
            <div className="flex-1 px-4 py-2 text-sm leading-5 truncate ">
                <div className="bg-gray-200 w-full h-3 rounded-lg"></div>
                <div className="bg-gray-100 w-16 h-2 rounded-lg mt-2"></div>
            </div>
        </div>
    </li>)
}

export default LoadingClassCard
