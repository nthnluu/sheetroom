import Transition from "../Transition";
import React, {useState} from "react";

export default function () {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex px-2 lg:px-0">
                        <button onClick={() => window.location.href = "/"} className="flex-shrink-0 flex items-center hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 focus:outline-none -ml-2 px-2 transition-color duration-150">
                            <img className="block lg:hidden h-10 w-auto" style={{opacity: '0.9'}} src="/hw_symbol.svg"
                                 alt="Workflow logo"/>
                            <img className="hidden lg:block h-8 w-auto" src="/hw_logo.svg"
                                 alt="Workflow logo"/>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <input id="search"
                                       className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
                                       placeholder="Search" type="search"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center lg:hidden">
                        {/*// <!-- Mobile menu button -->*/}
                        <button onClick={() => toggleMobileMenu(!mobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            aria-label="Main menu" aria-expanded="false">
                            {/*// <!-- Icon when menu is closed. -->*/}
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            {/*// <!-- Icon when menu is open. -->*/}
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:ml-4 lg:flex lg:items-center">
                        <button
                            className="flex-shrink-0 p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                            aria-label="Notifications">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>

                        {/*// <!-- Profile dropdown -->*/}
                        <div className="ml-4 relative flex-shrink-0">
                            <div>
                                <button onClick={() => toggleProfileDropdown(!profileDropdown)}
                                        className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                        id="user-menu" aria-label="User menu" aria-haspopup="true">
                                    <img className="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>

                            <Transition show={profileDropdown} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg" style={{zIndex: 10}}>
                                    <div className="py-1 rounded-md bg-white shadow-xs" role="menu"
                                         aria-orientation="vertical" aria-labelledby="user-menu">
                                        <a href="#"
                                           className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                           role="menuitem">Your Profile</a>
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
                    </div>
                </div>
            </div>

            {/*// <!--*/}
            {/*//   Mobile menu, toggle classes based on menu state.*/}
            {/*//*/}
            {/*//   Menu open: "block", Menu closed: "hidden"*/}
            {/*// -->*/}
            {mobileMenu ? <div className="block lg:hidden">
                <div className="pt-2 pb-3">
                    <a href="#"
                       className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out">Dashboard</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Team</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Projects</a>
                    <a href="#"
                       className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Calendar</a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full"
                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                 alt=""/>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-6 text-gray-800">Tom Cook</div>
                            <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com</div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <a href="#"
                           className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Your
                            Profile</a>
                        <a href="#"
                           className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Settings</a>
                        <a href="#"
                           className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Sign
                            out</a>
                    </div>
                </div>
            </div> : null}
        </nav>
    )

}
