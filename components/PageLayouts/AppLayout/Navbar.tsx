import React, {useState} from "react";
import Transition from "../../Transition";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import NewAssignmentModal from "../../Modals/NewAssignmentModal";
import NewClassModal from "../../Modals/NewClassModal";
import SearchInput from "./SearchInput";
import Link from "next/link";


interface Props {
    session?: string;
    unfixed?: boolean;
    transparent?: boolean;
    color?: string;
    logoOnly?: boolean;
    darkText?: boolean;
    logoLinkDisabled?: boolean;
}

const MobileMenuItem: React.FC<{label, link, selected?}> = ({label, link, selected}) => {
    return  <Link href={link}><a className={(selected ? "bg-frosted" : null) + " block px-3 py-2 rounded-md text-base font-medium text-white focus:outline-none focus:text-gray-100 focus:bg-light transition duration-150 ease-in-out"}>{label}</a></Link>

}

export const Navbar: React.FC<Props> = ({session, unfixed, transparent, color, logoOnly, darkText, logoLinkDisabled}) => {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
    const [mobileMenu, toggleMobileMenu] = useState(false);
    const [newDropdown, toggleNewDropdown] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);
    const [createClassDialog, toggleCreateClassDialog] = useState(false);


    return (<div>
        <NewClassModal onCancel={() => toggleCreateClassDialog(false)} isOpen={createClassDialog} session={session}/>
        <NewAssignmentModal onCancel={() => toggleCreateAssignmentDialog(false)} isOpen={createAssignmentDialog}
                            session={session}/>
        <nav className={"flex-shrink-0 w-full navbar " + (unfixed ? null : "fixed")}
             style={!transparent ? {backgroundColor: color ? color : '#242629'} : null}>
            <div className="mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative flex items-center justify-between h-14">
                    <a href="#main" tabIndex={1}
                       className="inline-flex sr-only items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Skip to main content
                    </a>
                    {/* Logo section */}
                    <div className="flex items-center justify-start w-full">
                        <div className="flex items-center px-2 lg:px-0 w-full h-full" style={{maxWidth: '28.9rem'}}>
                            {logoLinkDisabled ? <span
                                className="flex-shrink-0 px-2 h-full -ml-2 h-full focus:outline-none active:shadow-outline opacity-75">
                                <img className="w-auto hidden md:block h-8" src="/light_symbol.svg"
                                     alt="Sheetroom logo"/>
                                <img className="w-auto block md:hidden h-8" src="/light_symbol.svg"
                                     alt="Sheetroom logo"/>
                            </span> : <Link href="/"><a
                                         className="flex-shrink-0 px-2 h-full -ml-2 h-full focus:outline-none focus:opacity-75 active:shadow-outline">
                                <img className={"w-auto hidden md:block " + (session ? "h-8" : "h-6")}
                                     src={session ? "/light_symbol.svg" : (darkText ? "/sheetroom_logo.svg" : "/light_logo.svg")}
                                     alt="Sheetroom logo"/>
                                <img className={"w-auto block md:hidden " + (session ? "h-8" : "h-6")}
                                     src={session ? "/light_symbol.svg" : (darkText ? "/sheetroom_logo.svg" : "/light_logo.svg")}
                                     alt="Sheetroom logo"/>
                            </a></Link>}

                            {session && !logoOnly ? <><SearchInput session={session}/>
                                <div className="flex hidden lg:block text-gray-200 ">
                                    <a href="#"
                                       className="px-3 py-2 rounded-md text-sm leading-5 font-medium hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Workshop</a>
                                    <a href="#"
                                       className="px-3 py-2 rounded-md text-sm leading-5 font-medium hover:text-white focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out">Learn</a>
                                </div>
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
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-frosted focus:outline-none focus:bg-light focus:text-white transition duration-150 ease-in-out"
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
                        <div className="flex items-center justify-end">

                            {/* Profile dropdown */}

                            {session && !logoOnly ? <><ClickAwayListener onClickAway={() => toggleNewDropdown(false)}>
                                <div className="relative inline-block text-left mr-6 ml-4">
                                    <div>
                                    <span className="rounded-md shadow-sm">
                                        <button
                                            className="text-gray-100 flex items-center focus:outline-none hover:bg-gray-800 focus:bg-gray-800 p-1 rounded"
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
            {!logoOnly ? <div className={"lg:hidden " + (mobileMenu ? "block" : "hidden")}>
                <div className="px-2 pt-2 pb-3">
                    <MobileMenuItem label="Dashboard" link="/" selected/>
                    <MobileMenuItem label="Support" link="/"/>
                </div>
                <div className="pt-4 pb-3 border-t border-light">
                    {!session ? <div className="mt-3 px-2">
                        <MobileMenuItem label="Sign in" link="/signin"/>
                        <MobileMenuItem label="Sign up" link="/signin"/>
                    </div> : <div className="px-2">
                        <MobileMenuItem label="Profile" link="/signin"/>
                        <MobileMenuItem label="Settings" link="/settings"/>
                        <MobileMenuItem label="Sign out" link="/api/auth/signout"/>
                    </div>}

                </div>
            </div> : null}

        </nav>
    </div>)
}

export default Navbar
