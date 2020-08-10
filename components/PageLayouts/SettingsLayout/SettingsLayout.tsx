import React, {useState} from "react";
import Navbar from "../AppLayout/Navbar";
import ActivityFeed from "../../Dashboard/ActivityFeed";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Billing from "./pages/Billing";


interface Props {
    content?: JSX.Element;
    session: string;
}

const SettingsLayout: React.FC<Props> = ({content, session}) => {
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <div>
            {/*// <!-- Background color split screen for large screens -->*/}
            <div className="fixed top-0 left-0 w-1/2 h-full bg-white"></div>
            <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"></div>
            <div className="relative min-h-screen flex flex-col">
                {/*// <!-- Navbar -->*/}
                <Navbar session={session}/>


                {/*// <!-- 3 column wrapper -->*/}
                <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex mt-14">
                    {/*// <!-- Left sidebar & main wrapper -->*/}
                    <div className="flex-1 min-w-0 bg-white xl:flex">
                        {/*// <!-- Account profile -->*/}
                        <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
                            <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1 space-y-8">
                                        <div
                                            className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8 w-full">
                                            {/*// <!-- Profile -->*/}
                                            <div className="flex items-center space-x-3 w-full">
                                                <nav className="w-full">
                                                    <button onClick={() => setCurrentPage(0)}
                                                       className="group text-left w-full flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                                                       aria-current="page">
                                                        <svg
                                                            className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                                        </svg>
                                                        <span className="truncate">
      Profile
    </span>
                                                    </button>
                                                    <button
                                                       className="mt-1 text-left w-full group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                                                        <svg
                                                            className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                        </svg>
                                                        <span className="truncate">
      Account
    </span>
                                                    </button>
                                                    <button onClick={() => setCurrentPage(3)}
                                                       className="mt-1 text-left w-full group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                                                        <svg
                                                            className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                                        </svg>
                                                        <span className="truncate">
      Notifications
    </span>
                                                    </button>
                                                    <button onClick={() => setCurrentPage(4)}
                                                       className="mt-1 text-left w-full group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150">
                                                        <svg
                                                            className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M13 10V3L4 14H11L11 21L20 10L13 10Z"/>
                                                        </svg>
                                                        <span className="truncate">
      Upgrade
    </span>
                                                    </button>

                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*// <!-- Projects List -->*/}
                        <div className="bg-white lg:min-w-0 lg:flex-1">
                            <form className="">
                                <div>
                                    {currentPage === 0 ?  <Profile/> : null}
                                    {currentPage === 3 ?  <Notifications/> : null}
                                    {currentPage === 4 ?  <Billing/> : null}

                                </div>
                                <div className="mt-8 border-t border-gray-200 pt-5 px-4 sm:px-6 lg:px-8 xl:px-6">
                                    <div className="flex justify-end">
      <span className="inline-flex rounded-md shadow-sm">
        <button type="button"
                className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
          Cancel
        </button>
      </span>
                                        <span className="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
          Save
        </button>
      </span>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    {/*// <!-- Activity feed -->*/}
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout
