import React, {useState} from "react";
import Transition from "../../Transition";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NewAssignmentDialog from "../../DialogBox/NewAssignmentDialog";
import NewAssignmentModal from "../../Modals/NewAssignmentModal";


interface Props {
    session: string;
    unfixed?: boolean;
    transparent?: boolean;
}

export const Navbar: React.FC<Props> = ({session, unfixed, transparent}) => {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);
    const [newDropdown, toggleNewDropdown] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);

    return(<div>
        <NewAssignmentModal onCancel={() => toggleCreateAssignmentDialog(false)} isOpen={createAssignmentDialog} session={session}/>
        <nav className={"flex-shrink-0 w-full navbar " + (unfixed ? null : "fixed")} style={!transparent ? {backgroundColor: '#242629'} : null}>
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-14">
                    <a href="#main" tabIndex={1}
                            className="inline-flex sr-only items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Skip to main content
                    </a>
                    {/* Logo section */}
                    <div className="flex items-center justify-start w-full">
                        <div className="flex items-center px-2 lg:px-0 w-full h-full" style={{maxWidth: '28.9rem'}}>
                            <button onClick={() => window.location.href = "/"} className="flex-shrink-0 px-2 h-full -ml-2 h-full focus:outline-none opacity-75 hover:opacity-100 focus:opacity-100 active:shadow-outline">
                                <img className="h-8 w-auto hidden md:block" src="/light_symbol.svg"
                                     alt="Workflow logo" />
                                <img className="h-8 w-auto block md:hidden" src="/light_symbol.svg"
                                     alt="Workflow logo"/>
                            </button>
                            <div className="w-full mx-auto px-2 lg:px-2">
                                <label htmlFor="search" className="sr-only">Search</label>
                                <div className="relative text-gray-300 focus-within:text-gray-400">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd"
                                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <input id="search"
                                           className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 text-gray-300 placeholder-gray-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                           placeholder="Search" type="search"/>
                                </div>
                            </div>
                            <div className="flex hidden lg:block">
                                <a href="#"
                                   className="px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-200 hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Workshop</a>
                                <a href="#"
                                   className="px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-200 hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Learn</a>
                            </div>

                        </div>
                        <div className="related"/>
                        <div className="related-focus:bg-gray"/>
                        {/* Search section */}
                        {/*<div className="flex-1 flex justify-start w-full lg:justify-start">*/}

                        {/*    <div className="w-full max-w-xl mx-auto px-2 lg:px-6">*/}
                        {/*        <label htmlFor="search" className="sr-only">Search</label>*/}
                        {/*        <div className="relative text-gray-300 focus-within:text-gray-400">*/}
                        {/*            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">*/}
                        {/*                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">*/}
                        {/*                    <path fillRule="evenodd"*/}
                        {/*                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"*/}
                        {/*                          clipRule="evenodd"/>*/}
                        {/*                </svg>*/}
                        {/*            </div>*/}
                        {/*            <input id="search"*/}
                        {/*                   className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 text-gray-300 placeholder-gray-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"*/}
                        {/*                   placeholder="Search" type="search"/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        <button onClick={() => toggleMobileMenu(!mobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-800 focus:text-white transition duration-150 ease-in-out"
                            aria-label="Main menu" aria-expanded={mobileMenu}>
                            <svg className={"h-6 w-6 " + (mobileMenu ? "hidden" : "block")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                            <svg className={"h-6 w-6 " + (mobileMenu ? "block" : "hidden")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    {/* Links section */}
                    <div className="hidden lg:block lg:w-80 ml-4">
                        <div className="flex items-center justify-end">

                            {/* Profile dropdown */}


                            <ClickAwayListener onClickAway={() => toggleNewDropdown(false)}>
                                <div className="relative inline-block text-left mr-6 ml-4">
                                    <div>
                                    <span className="rounded-md shadow-sm">
                                        <button className="text-gray-100 flex items-center"
                                                onClick={() => toggleNewDropdown(!newDropdown)}>
                                            <i className="fas fa-plus mr-1"></i><i className="fas fa-caret-down opacity-50"></i>
                                        </button>
                                    </span>
                                    </div>

                                    <Transition appear={newDropdown} show={newDropdown}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveTo="transform opacity-0 scale-95"
                                                leaveFrom="transform opacity-100 scale-100">
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg popover">
                                            <div className="rounded-md bg-white shadow-xs">
                                                <div className="py-1" role="menu" aria-orientation="vertical"
                                                     aria-labelledby="options-menu">
                                                    <button onClick={() => {toggleNewDropdown(false); toggleCreateAssignmentDialog(true)}}
                                                       className="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                       role="menuitem">New assignment</button>
                                                    <a href="#"
                                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                       role="menuitem">New class</a>
                                                </div>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </ClickAwayListener>


                            <ClickAwayListener onClickAway={() => toggleProfileDropdown(false)}>
                                <div className="relative flex-shrink-0">
                                    <div>

                                        <button
                                            onClick={() => toggleProfileDropdown(!profileDropdown)}
                                            className="flex text-sm rounded-full text-white focus:outline-none focus:shadow-solid transition duration-150 ease-in-out"
                                            id="user-menu" aria-label="User menu" aria-haspopup="true">
                                            {/*// @ts-ignore*/}
                                            <img className="h-8 w-8 rounded-full"
                                                // @ts-ignore
                                                 src={session.picture ? session.picture : "https://lh3.googleusercontent.com/proxy/Ge8IjXjwr-9jS3f5_gnxcIyi1OFQ-IMWCvHtmpCze2EeQi2TqNgtMx1oVZoFhiHATpISTmeXCZ_uQfiiauO2R6uEBFFLwI86huh6RNZjXn2csWFM6GIhulXwJ50oXU2Jb3I"}
                                                 alt=""/>
                                        </button>
                                    </div>

                                    <Transition appear={profileDropdown} show={profileDropdown}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveTo="transform opacity-0 scale-95"
                                                leaveFrom="transform opacity-100 scale-100">
                                        <div
                                            className="origin-top-right popover absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                            <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                                 aria-orientation="vertical" aria-labelledby="user-menu">
                                                <a href="#"
                                                   className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                   role="menuitem">View Profile</a>
                                                <a href="#"
                                                   className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                   role="menuitem">Settings</a>
                                                <a href="/api/auth/signout"
                                                   className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                   role="menuitem">Sign out</a>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </ClickAwayListener>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"lg:hidden " + (mobileMenu ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3">
                    <a href="#"
                       className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800 focus:outline-none focus:text-gray-100 focus:bg-gray-600 transition duration-150 ease-in-out">Dashboard</a>
                    <a href="#"
                       className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-100 hover:bg-gray-600 focus:outline-none focus:text-white focus:bg-gray-600 transition duration-150 ease-in-out">Support</a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-800">
                    <div className="mt-3 px-2">
                        <a href="#"
                           className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-100 hover:bg-gray-600 focus:outline-none focus:text-white focus:bg-gray-600 transition duration-150 ease-in-out">Your
                            Profile</a>
                        <a href="#"
                           className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-100 hover:bg-gray-600 focus:outline-none focus:text-white focus:bg-gray-600 transition duration-150 ease-in-out">Settings</a>
                        <a href="#"
                           className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-100 hover:bg-gray-600 focus:outline-none focus:text-white focus:bg-gray-600 transition duration-150 ease-in-out">Sign
                            out</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>)
}

export default Navbar
