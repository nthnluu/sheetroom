import React, {useState} from 'react';
import auth0 from "../utils/auth0";
import Transition from "../Components/Transition";

function AuthNavbar({user}) {
    const [profileDropdown, toggleProfileDropdown] = useState(false);
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
                        <a href="#"
                           className="inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out">
                            Dashboard
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            Library
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                            Classes
                        </a>
                        <a href="#"
                           className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
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

function AssignmentTable() {
    return (<div className="bg-white shadow-lg border border-gray-200 overflow-hidden rounded-lg mt-3">
        <ul>
            <li>
                <a href="#"
                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                Back End Developer
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
              <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Full-time
              </span>
                            </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                    </svg>
                                    Engineering
                                </div>
                                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Remote
                                </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span>
                Closing on
                <time dateTime="2020-01-07">January 7, 2020
                </time>
              </span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
            <li className="border-t border-gray-200">
                <a href="#"
                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                Back End Developer
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
              <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Full-time
              </span>
                            </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                    </svg>
                                    Engineering
                                </div>
                                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Remote
                                </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span>
                Closing on
                <time dateTime="2020-01-07">January 7, 2020
                </time>
              </span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
            <li className="border-t border-gray-200">
                <a href="#"
                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                                Back End Developer
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
              <span
                  className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Full-time
              </span>
                            </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                                    </svg>
                                    Engineering
                                </div>
                                <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Remote
                                </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span>
                Closing on
                <time dateTime="2020-01-07">January 7, 2020
                </time>
              </span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>)
}

const Dashboard = ({user}) => {
    const navBarItems = {
        links: [{label: 'Library'}, {label: 'Your Classes'}, {label: 'More'}],
        actionButtons: {primary: {label: 'Sign up', href: '/signup'}, secondary: {label: 'Log in', href: '/login'}}
    };

    function timeGreeting() {
        const myDate = new Date();
        const hrs = myDate.getHours();
        let greet = {greeting: '', emoji: ''};

        if (hrs < 12) {
            greet.greeting = 'Good morning';
            greet.emoji = '☀️️';
        } else if (hrs >= 12 && hrs <= 17) {
            greet.greeting = 'Good afternoon';
            greet.emoji = '👋';
        } else if (hrs >= 17 && hrs <= 24) {
            greet.greeting = 'Good afternoon';
            greet.emoji = '🌌';
        }

        return greet

    }


    return (
        <>
            <div className="min-h-screen bg-white">
                <AuthNavbar user={user}/>
                <div className="py-12">
                    <header>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                                {timeGreeting().greeting}, {user.given_name} <span style={{fontFamily: 'serif'}}>{timeGreeting().emoji}</span>
                            </h1>
                        </div>
                    </header>
                    <main className="mt-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            {/*// <!-- Replace with your content -->*/}
                            <div className="px-4 py-8 sm:px-0">
                                <h2 className="uppercase font-semibold text-gray-400">Active Assignments</h2>
                                <AssignmentTable/>
                            </div>
                            {/*// <!-- /End replace -->*/}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
};


Dashboard.getInitialProps = async ({req, res}) => {
    if (typeof window === 'undefined') {
        const session = await auth0.getSession(req);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/login'
            });
            res.end();
            return;
        }
        return {user: session.user};
    }
};


export default Dashboard;
