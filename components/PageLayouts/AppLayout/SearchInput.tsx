import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import React, {useState} from "react";

const SearchInput = ({session}) => {
    const [searchDropdown, toggleSearchDropdown] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleOnChange = event => {
        const value = event.target.value
        if (!searchDropdown) {
            toggleSearchDropdown(true)
        }
        setSearchValue(value)
    }

    return (<ClickAwayListener onClickAway={() => toggleSearchDropdown(false)}>
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
            {searchDropdown && searchValue.length > 0 ? <div className="pr-4 absolute w-full mt-1">
                <div className="w-full h-16 bg-white shadow-lg rounded-md border flex items-center">
                    <div className="mx-auto w-full text-center"><CircularProgress size={25} color="secondary"/></div>
                </div>
            </div> : null}


        </div>
    </ClickAwayListener>)
}

export default SearchInput
