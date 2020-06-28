import Transition from "./Transition";
import {useState} from "react";
import Link from "next/link";

function AuthNavbar({user, currentPage}) {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [addDropdown, toggleAddDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);


    return (<nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
                <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                        <img className="block lg:hidden h-8 w-auto"
                             src="/hw_symbol.svg" alt="Workflow logo"/>
                        <img className="hidden lg:block h-8 w-auto"
                             src="/hw_symbol.svg" alt="Workflow logo"/>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex">
                        <a href="/dashboard"
                           className={(currentPage === 0) ? "adminNavBarActive" : "adminNavBarInactive"}>
                            Overview
                        </a>
                        <a href="#"
                           className={(currentPage === 1) ? "adminNavBarActive" : "adminNavBarInactive"}>
                            Classes
                        </a>
                        <a href="#"
                           className={(currentPage === 2) ? "adminNavBarActive" : "adminNavBarInactive"}>
                            Workshop
                        </a>
                        <a href="#"
                           className={(currentPage === 3) ? "adminNavBarActive" : "adminNavBarInactive"}>
                            Settings
                        </a>
                    </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                        className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                        aria-label="Notifications">
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                    </button>


                    <div className="ml-3 relative">
                        <div>
                            <button onClick={() => toggleAddDropdown(!addDropdown)}
                                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    aria-label="Notifications">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4V20M20 12L4 12" strokeWidth="2" strokeLinecap="round"
                                          strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <Transition show={addDropdown} enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                <div className="py-1 rounded-md bg-white shadow-xs">
                                    <a href="/new/quiz"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
                                        New quiz
                                    </a>

                                    <a href="/new/assignment"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">New
                                        assignment
                                    </a>
                                    <a href="/new/class"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">New
                                        class
                                    </a>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    {/*// <!-- Profile dropdown -->*/}
                    <div className="ml-3 relative">
                        <div>
                            <button onClick={() => toggleProfileDropdown(!profileDropdown)}
                                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                                    id="user-menu" aria-label="User menu" aria-haspopup="true">
                                <img className="h-8 w-8 rounded-full"
                                     src={user.picture}
                                     alt=""/>
                            </button>
                        </div>
                        <Transition show={profileDropdown} enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                <div className="py-1 rounded-md bg-white shadow-xs">
                                    <a href="#"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Your
                                        Profile
                                    </a>
                                    <a href="#"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Settings
                                    </a>
                                    <a href="/api/logout"
                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">Sign
                                        out
                                    </a>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                    {/*// <!-- Mobile menu button -->*/}
                    <button onClick={() => toggleMobileMenu(!mobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                        {/*// <!-- Menu open: "hidden", Menu closed: "block" -->*/}
                        <svg className="block h-6 w-6" stroke="currentColor" fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        {/*// <!-- Menu open: "block", Menu closed: "hidden" -->*/}
                        <svg className="hidden h-6 w-6" stroke="currentColor" fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        {/*MOBILE MENU*/}
        {mobileMenu ? <div className="block sm:hidden">
            <div className="pt-2 pb-3">
                <a href="#"
                   className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out">Dashboard
                </a>
                <a href="#"
                   className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Team
                </a>
                <a href="#"
                   className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Projects
                </a>
                <a href="#"
                   className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Calendar
                </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full"
                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                             alt=""/>
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-6 text-gray-800">{user.given_name}
                        </div>
                        <div className="text-sm font-medium leading-5 text-gray-500">tom@example.com
                        </div>
                    </div>
                </div>
                <div className="mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <a href="#"
                       className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Your Profile
                    </a>
                    <a href="#"
                       className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Settings
                    </a>
                    <a href="#"
                       className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out"
                       role="menuitem">Sign out
                    </a>
                </div>
            </div>
        </div> : null}

    </nav>)

}

const AdminPageLayout = ({user, currentPage, ...props}) => {
    return (<>
        <div className="min-h-screen bg-white">
            <AuthNavbar user={user} currentPage={currentPage}/>
            {props.children}
        </div>
    </>)

};

export default AdminPageLayout
