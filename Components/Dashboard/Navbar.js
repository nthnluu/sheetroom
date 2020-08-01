import React, {useState} from "react";
import Transition from "../Transition";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Navbar = () => {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    return <nav className="flex-shrink-0 fixed w-full z-50" style={{backgroundColor: '#030917'}}>
        <div className="mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                {/* Logo section */}
                <div className="flex items-center px-2 lg:px-0 xl:w-64">
                    <div className="flex-shrink-0">
                        <img className="h-6 w-auto hidden md:block" src="/light_logo.svg"
                             alt="Workflow logo"/>
                        <img className="h-8 w-auto block md:hidden" src="/light_symbol.svg"
                             alt="Workflow logo"/>
                    </div>
                </div>
                <div className="related"/>
                <div className="related-focus:bg-gray"/>
                {/* Search section */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="w-full max-w-md px-2 lg:px-6">
                        <label htmlFor="search" className="sr-only">Search assignment</label>
                        <div className="relative text-gray-300 focus-within:text-gray-400">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd"
                                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <input id="search"
                                   className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-400 bg-opacity-25 text-gray-300 placeholder-gray-300 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                                   placeholder="Search assignments" type="search"/>
                        </div>
                    </div>
                </div>
                <div className="flex lg:hidden">
                    {/* Mobile menu button */}
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-600 focus:outline-none focus:bg-gray-600 focus:text-white transition duration-150 ease-in-out"
                        aria-label="Main menu" aria-expanded="false">
                        {/* Icon when menu is closed. */}
                        {/* Menu open: "hidden", Menu closed: "block" */}
                        <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                        {/* Icon when menu is open. */}
                        {/* Menu open: "block", Menu closed: "hidden" */}
                        <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                {/* Links section */}
                <div className="hidden lg:block lg:w-80">
                    <div className="flex items-center justify-end">
                        <div className="flex">
                            <a href="#"
                               className="px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-200 hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Documentation</a>
                            <a href="#"
                               className="px-3 py-2 rounded-md text-sm leading-5 font-medium text-gray-200 hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Support</a>
                        </div>
                        {/* Profile dropdown */}

                        <ClickAwayListener onClickAway={() => toggleProfileDropdown(false)}>
                            <div className="ml-4 relative flex-shrink-0">
                                <div>
                                    <button
                                        onClick={() => toggleProfileDropdown(!profileDropdown)}
                                        className="flex text-sm rounded-full text-white focus:outline-none focus:shadow-solid transition duration-150 ease-in-out"
                                        id="user-menu" aria-label="User menu" aria-haspopup="true">
                                        <img className="h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                                             alt=""/>
                                    </button>
                                </div>

                                <Transition show={profileDropdown} enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveTo="transform opacity-0 scale-95"
                                            leaveFrom="transform opacity-100 scale-100">
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
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
        {/*
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    */}
        <div className="hidden lg:hidden">
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
}

export default Navbar
