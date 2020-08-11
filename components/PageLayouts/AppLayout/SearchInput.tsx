import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "urql";
import {instructorSearch} from "../../../lib/graphql/Search";
import JsonDebugBox from "../../JsonDebugBox";
import {debounce} from 'lodash'

const SearchDropdown = ({value, session}) => {

    const [result, reexecuteQuery] = useQuery({
        query: instructorSearch,
        variables: {
            userId: session.id,
            searchValue: `%${value}%`
        }
    });

    const {fetching, data, error} = result


    return (<div className="pr-4 absolute w-full mt-1">
        <ul className="w-full h-auto bg-white shadow-lg rounded-md border overflow-hidden">
            <li className="w-full bg-blue-500 h-10  flex justify-start items-center p-2 text-white text-sm font-medium">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {value}
            </li>

            {data ? <> {result.data.classes_class.length > 0 ? <>
                <li
                    className="w-full h-6 flex bg-gray-100 justify-start items-center p-2 text-gray-600 text-xs font-medium">
                    Classes
                </li>
                {data ? <>
                    {result.data.classes_class.map(course => <li key={course.id}
                                                                 className="w-full h-10  flex justify-start items-center p-2 text-gray-800 text-sm font-medium">
                        {course.title}
                    </li>)}
                </> : null}</> : null}

                       {result.data.assignments_assignment.length > 0 ? <>
                           <li
                               className="w-full h-6 flex bg-gray-100 justify-start items-center p-2 text-gray-600 text-xs font-medium">
                               Assignments
                           </li>
                           {data ? <>
                               {result.data.assignments_assignment.map(assignment => <li key={assignment.id}
                                                                                         className="w-full h-10  flex justify-start items-center p-2 text-gray-800 text-sm font-medium">
                                   {assignment.title}
                               </li>)}
                           </> : null}</> : null}</> : null}




        </ul>
    </div>)
}


const SearchInput = ({session}) => {
    const [searchDropdownMode, setSearchDropdownMde] = useState(0);
    const [searchValue, setSearchValue] = useState("");


    const handleOnChange = event => {
        const value = event.target.value
        if (!searchDropdownMode) {
            setSearchDropdownMde(1)
        }
        setSearchValue(value)
    }

    return (<ClickAwayListener onClickAway={() => setSearchDropdownMde(0)}>
        <div className="w-full mx-auto px-2 lg:px-2 relative">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative text-gray-300 focus-within:text-gray-400">
                <div
                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"/>
                    </svg>
                </div>
                <input id="search" autoComplete="off" onChange={handleOnChange}
                       className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 text-gray-300 placeholder-gray-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                       placeholder="Search" type="search"/>
            </div>
            {searchDropdownMode === 1 && searchValue.length > 0 ?
                <SearchDropdown session={session} value={searchValue}/> : null}


        </div>
    </ClickAwayListener>)
}

export default SearchInput
