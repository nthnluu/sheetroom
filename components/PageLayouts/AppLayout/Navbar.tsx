import React, {useState} from "react";
import Transition from "../../Transition";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NewAssignmentModal from "../../Modals/NewAssignmentModal";
import NewClassModal from "../../Modals/NewClassModal";
import SearchInput from "./SearchInput";
import FeedbackModal from "../../Modals/FeedbackModal";


interface Props {
    session?: string;
    unfixed?: boolean;
    transparent?: boolean;
    color?: string;
    logoOnly?: boolean;
    darkText?: boolean;
    logoLinkDisabled?: boolean;
    profileData?: any;
}

const MobileMenuItem: React.FC<{ label, link, selected?, dark }> = ({label, link, selected, dark}) => {
    return <a href={link}
              className={(selected ? "bg-frosted" : null) + " block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-gray-100 focus:bg-light transition duration-150 ease-in-out" + (dark ? "text-gray-800" : "text-white")}>{label}</a>

}

export const Navbar: React.FC<Props> = ({session, profileData, unfixed, transparent, color, logoOnly, darkText, logoLinkDisabled}) => {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);
    const [newDropdown, toggleNewDropdown] = useState(false);
    const [feedbackModal, toggleFeedbackModal] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);
    const [createClassDialog, toggleCreateClassDialog] = useState(false);

    const accountMode = profileData ? profileData.data.users_by_pk.account_type : null


    return (<div>
        <FeedbackModal session={session} title="Feedback" onCancel={() => toggleFeedbackModal(false)}
                       isOpen={feedbackModal}/>
        <NewClassModal onCancel={() => toggleCreateClassDialog(false)} isOpen={createClassDialog} session={session}/>
        <NewAssignmentModal onCancel={() => toggleCreateAssignmentDialog(false)} isOpen={createAssignmentDialog}
                            session={session}/>
        <nav className={"flex-shrink-0 w-full navbar " + (unfixed ? null : "fixed")}
             style={!transparent ? {backgroundColor: color ? color : '#242629'} : (mobileMenu ? {backgroundColor: color ? color : '#ffff'} : null)}>
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-14">
                    <a href="#main" tabIndex={1}
                       className="inline-flex sr-only items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Skip to main content
                    </a>
                    {/* Logo section */}
                    <div className="flex items-center justify-start w-full">
                        <div className="flex items-center justify-start px-2 lg:px-0 w-full h-full"
                             style={{maxWidth: '28.9rem'}}>
                            {logoLinkDisabled ? <span
                                className="flex-shrink-0 px-2 h-full -ml-2 h-full focus:outline-none active:shadow-outline opacity-75">
                                <img className="w-auto hidden md:block h-8" src="/light_symbol.svg"
                                     alt="Sheetroom logo"/>
                                <img className="w-auto block md:hidden h-8" src="/light_symbol.svg"
                                     alt="Sheetroom logo"/>
                            </span> : <a href="/"
                                         className="flex-shrink-0 px-2 h-full -ml-2 h-full focus:outline-none focus:opacity-75 active:shadow-outline">
                                <img className={"w-auto hidden md:block " + (session ? "h-8" : "h-6")}
                                     src={session ? "/light_symbol.svg" : (darkText ? "/sheetroom_logo.svg" : "/light_logo.svg")}
                                     alt="Sheetroom logo"/>
                                <img className={"w-auto block md:hidden " + (session ? "h-8" : "h-6")}
                                     src={session ? "/light_symbol.svg" : (darkText ? "/sheetroom_logo.svg" : "/light_logo.svg")}
                                     alt="Sheetroom logo"/>
                            </a>}

                            {session && !logoOnly ? <>
                                {accountMode === "teacher" ? <>
                                    <SearchInput session={session}/>
                                    <div className="flex hidden lg:block text-gray-200 ">

                                        {/*<a href="#"*/}
                                        {/*   className="px-3 py-2 rounded-md text-sm leading-5 font-medium hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Learn</a>*/}
                                    </div>
                                </> : null}
                            </> : (!logoOnly ? <div className="flex hidden lg:block">
                                <a href="#"
                                   className={(darkText ? "text-gray-800 hover:opacity-75  focus:opacity-75 focus:shadow-outline" : "text-gray-200 hover:text-white  focus:text-white focus:bg-gray-800") + " px-3 py-2 rounded-md text-sm leading-5 font-medium focus:outline-none transition duration-150 ease-in-out"}>Features</a>
                                <a href="#"
                                   className={(darkText ? "text-gray-800 hover:opacity-75  focus:opacity-75 focus:shadow-outline" : "text-gray-200 hover:text-white  focus:text-white focus:bg-gray-800") + " px-3 py-2 rounded-md text-sm leading-5 font-medium focus:outline-none transition duration-150 ease-in-out"}>Institutions</a>
                                <a href="#"
                                   className={(darkText ? "text-gray-800 hover:opacity-75  focus:opacity-75 focus:shadow-outline" : "text-gray-200 hover:text-white  focus:text-white focus:bg-gray-800") + " px-3 py-2 rounded-md text-sm leading-5 font-medium focus:outline-none transition duration-150 ease-in-out"}>Explore</a>
                                <a href="#"
                                   className={(darkText ? "text-gray-800 hover:opacity-75  focus:opacity-75 focus:shadow-outline" : "text-gray-200 hover:text-white  focus:text-white focus:bg-gray-800") + " px-3 py-2 rounded-md text-sm leading-5 font-medium focus:outline-none transition duration-150 ease-in-out"}>Blog</a>
                                <a href="#"
                                   className={(darkText ? "text-gray-800 hover:opacity-75  focus:opacity-75 focus:shadow-outline" : "text-gray-200 hover:text-white  focus:text-white focus:bg-gray-800") + " px-3 py-2 rounded-md text-sm leading-5 font-medium focus:outline-none transition duration-150 ease-in-out"}>Pricing</a>
                            </div> : null)}


                        </div>
                        <div className="related"/>
                        <div className="related-focus:bg-gray"/>

                    </div>
                    {!logoOnly ? <div className="flex lg:hidden">
                        {/* Mobile menu button */}
                        <button onClick={() => toggleMobileMenu(!mobileMenu)}
                                className={"inline-flex items-center justify-center p-2 rounded-md hover:bg-frosted focus:outline-none focus:bg-light transition duration-150 ease-in-out " + (transparent ? "text-gray-800 hover:text-gray-600 focus:text-gray-600" : "text-gray-400 hover:text-white focus:text-white")}
                                aria-label="Main menu" aria-expanded={mobileMenu}>
                            <svg className={"h-6 w-6 " + (mobileMenu ? "hidden" : "block")} fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                            <svg className={"h-6 w-6 " + (mobileMenu ? "block" : "hidden")} fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div> : null}

                    {/* Links section */}
                    <div className="hidden lg:block lg:w-80 ml-4">
                        <div className="flex items-center justify-end text-white">

                            {/* Profile dropdown */}
                            {session && !logoOnly ? <>
                                <button onClick={() => toggleFeedbackModal(true)}
                                        className="px-3 py-2 rounded-md text-sm leading-5 font-medium hover:text-white focus:outline-none focus:text-white focus:bg-light transition duration-150 ease-in-out">Feedback
                                </button>
                                <a href="#"
                                   className="px-3 py-2 rounded-md text-sm leading-5 font-medium hover:text-white focus:outline-none focus:text-white focus:bg-light transition duration-150 ease-in-out">Learn</a>
                                <ClickAwayListener onClickAway={() => toggleNewDropdown(false)}>
                                    <div className="relative inline-block text-left mr-6 ml-4">
                                        <div>
                                    <span className="rounded-md shadow-sm">
                                        <button
                                            className="text-gray-100 flex items-center focus:outline-none hover:bg-light focus:bg-light p-1 rounded"
                                            onClick={() => toggleNewDropdown(!newDropdown)}>
                                            <i className="fas fa-plus mr-1"/><i
                                            className="fas fa-caret-down opacity-50"/>
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
                                                        <button onClick={() => {
                                                            toggleNewDropdown(false);
                                                            toggleCreateAssignmentDialog(true)
                                                        }}
                                                                className="block px-4 py-2 w-full text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                                role="menuitem">New assignment
                                                        </button>
                                                        <button onClick={() => {
                                                            toggleNewDropdown(false);
                                                            toggleCreateClassDialog(true)
                                                        }}
                                                                className="block px-4 py-2 text-sm w-full text-left leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                                                role="menuitem">New class
                                                        </button>
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
                                                <img className="h-8 w-8 rounded-full bg-teal-400"
                                                    // @ts-ignore
                                                     src={session.picture ? session.picture : "/profile.jpg"}
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
                                                    <a href="/settings"
                                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                       role="menuitem">Settings</a>
                                                    <a href="/api/auth/signout"
                                                       className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                       role="menuitem">Sign out</a>
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                </ClickAwayListener></> : (!logoOnly ? <div className="flex justify-between">
                                <button type="button" onClick={() => window.location.href = "/signin"}
                                        className={(darkText ? "text-gray-800 hover:opacity-75 focus:text-gray-700 active:text-gray-800" : "text-white hover:text-gray-200 active:text-gray-300") + " inline-flex items-center mr-1 px-3 py-1 text-base leading-6 font-medium rounded-md bg-transparent focus:outline-none focus:shadow-outline-blue active:text-gray-300 transition ease-in-out duration-150"}>
                                    Sign in
                                </button>
                                <button type="button" onClick={() => window.location.href = "/api/auth/signin"}
                                        className={(darkText ? "border-gray-800 text-gray-800 hover:opacity-75 focus:border-gray-700 focus:text-gray-700 active:text-gray-800" : "border-gray-300 text-white hover:text-gray-200 focus:border-blue-300 active:text-gray-300") + " inline-flex items-center px-3 py-1 border text-base leading-6 font-medium rounded-md bg-transparent focus:outline-none focus:shadow-outline-blue active:text-gray-300 transition ease-in-out duration-150"}>
                                    Join Sheetroom
                                </button>

                            </div> : null)}

                        </div>
                    </div>
                </div>
            </div>

            <Transition appear={mobileMenu} show={mobileMenu} enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 -translate-y-1">
                <div className="absolute lg:hidden inset-x-0 transform shadow-lg navbar">
                    <div className="absolute inset-0 flex">
                        <div className="bg-white w-1/2"></div>
                        <div className="bg-gray-50 w-1/2"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                        <nav
                            className="grid row-gap-10 px-4 py-8 bg-white sm:grid-cols-2 sm:col-gap-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                            <div className="space-y-5">
                                {session ? <ul className="space-y-6">

                                    <li className="flow-root">
                                        <a href="/"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                            </svg>
                                            <span>Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <button onClick={() => {toggleMobileMenu(false); toggleFeedbackModal(true)}}
                                           className="-m-3 p-3 w-full text-left flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span>Feedback</span>
                                        </button>
                                    </li>
                                    <li className="flow-root">
                                        <a href="/settings"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Sign out</span>
                                        </a>
                                    </li>
                                </ul> : <ul className="space-y-6">
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span>About</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                            </svg>
                                            <span>Customers</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                                            </svg>
                                            <span>Press</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                            </svg>
                                            <span>Careers</span>
                                        </a>
                                    </li>
                                    <li className="flow-root">
                                        <a href="#"
                                           className="-m-3 p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-50 transition ease-in-out duration-150">
                                            <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                            </svg>
                                            <span>Privacy</span>
                                        </a>
                                    </li>
                                </ul>}

                            </div>
                        </nav>
                    </div>
                </div>

            </Transition>


            {/*{!logoOnly ? <div className={"lg:hidden " + (mobileMenu ? "block" : "hidden")}>*/}
            {/*    <div className="px-2 pt-2 pb-3">*/}
            {/*        <MobileMenuItem label="Dashboard" link="/" selected dark={transparent}/>*/}
            {/*        <MobileMenuItem label="Support" link="/" dark={transparent}/>*/}
            {/*    </div>*/}
            {/*    <div className="pt-4 pb-3 border-t border-light">*/}
            {/*        {!session ? <div className="mt-3 px-2">*/}
            {/*            <MobileMenuItem label="Sign in" link="/signin" dark={transparent}/>*/}
            {/*            <MobileMenuItem label="Sign up" link="/signin" dark={transparent}/>*/}
            {/*        </div> : <div className="px-2">*/}
            {/*            <MobileMenuItem label="Profile" link="/signin" dark={transparent}/>*/}
            {/*            <MobileMenuItem label="Settings" link="/settings" dark={transparent}/>*/}
            {/*            <MobileMenuItem label="Sign out" link="/api/auth/signout" dark={transparent}/>*/}
            {/*        </div>}*/}

            {/*    </div>*/}
            {/*</div> : null}*/}

        </nav>
    </div>)
}

export default Navbar
