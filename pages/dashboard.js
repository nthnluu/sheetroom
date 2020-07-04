import React, {useState} from 'react';
import AdminPageLayout from "../Components/AdminPageLayout";
import gql from "graphql-tag";
import {getSession} from 'next-auth/client'
import {useQuery} from '@apollo/react-hooks';
import Transition from "../Components/Transition";
import NewNavbar from "../Components/Navbar/NewNavbar";

const QUIZZES = gql`
query Quizzes($userId: Int!){
  quiz(where: {created_by: {_eq: $userId}}) {
    id,
    title,
    description
  }
}
`;

function QuizGrid({userId}) {
    const {loading, error, data} = useQuery(QUIZZES, {variables: {userId: userId}});
    if (loading) return (<div className="px-4 py-8 sm:px-0">
        <h2 className="text-xl leading-6 font-bold text-gray-900 mb-3">Your Library</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
            <div>
                <div
                    className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div
                    className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div
                    className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div
                    className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
        </div>
    </div>);
    if (error) return <p>Error :(</p>;


    return (
        <div className="px-4 py-8 sm:px-0">
            <h2 className="text-xl leading-6 font-bold text-gray-900 mb-3">Your Library</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
                {data.quiz.map((item) => <div onClick={() => window.location.href = '/edit/quiz/' + item.id}>
                    <div
                        className="h-64 rounded-lg border-2 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer"/>
                    <div className="leading-tight pt-2">
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                </div>)}

            </div>
        </div>
    )
}

function AssignmentTable() {
    return (<div className="bg-white shadow-lg border border-gray-200 overflow-hidden rounded-lg mt-3 w-full">
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

const Dashboard = ({user, session}) => {
    const userId = session.userId;
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
            greet.greeting = 'Good evening';
            greet.emoji = '🌌';
        }

        return greet

    }


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="h-screen overflow-hidden bg-white">
                <NewNavbar/>
                <div className="h-full flex">
                    {/*// <!-- Off-canvas menu for mobile -->*/}
                    <div className="md:hidden">
                        <div className="fixed inset-0 flex z-40">
                            {/*// <!--*/}
                            {/*//   Off-canvas menu overlay, show/hide based on off-canvas menu state.*/}
                            {/*//*/}
                            {/*//   Entering: "transition-opacity ease-linear duration-300"*/}
                            {/*//     From: "opacity-0"*/}
                            {/*//     To: "opacity-100"*/}
                            {/*//   Leaving: "transition-opacity ease-linear duration-300"*/}
                            {/*//     From: "opacity-100"*/}
                            {/*//     To: "opacity-0"*/}
                            {/*// -->*/}
                            <div className="fixed inset-0">
                                <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                            </div>
                            {/*// <!--*/}
                            {/*//   Off-canvas menu, show/hide based on off-canvas menu state.*/}
                            {/*//*/}
                            {/*//   Entering: "transition ease-in-out duration-300 transform"*/}
                            {/*//     From: "-translate-x-full"*/}
                            {/*//     To: "translate-x-0"*/}
                            {/*//   Leaving: "transition ease-in-out duration-300 transform"*/}
                            {/*//     From: "translate-x-0"*/}
                            {/*//     To: "-translate-x-full"*/}
                            {/*// -->*/}
                            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <div className="absolute top-0 right-0 -mr-14 p-1">
                                    <button
                                        className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                                        aria-label="Close sidebar">
                                        <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>


                            </div>
                            <div className="flex-shrink-0 w-14">
                                {/*// <!-- Force sidebar to shrink to fit close icon -->*/}
                            </div>
                        </div>
                    </div>

                    {/*// <!-- Static sidebar for desktop -->*/}
                    <div className="hidden md:flex md:flex-shrink-0">
                        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                {/*// <!-- Sidebar component, swap this element with another sidebar if you like -->*/}
                                <nav className="flex-1 px-2 bg-white">
                                    <a href="#"
                                       className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                        </svg>
                                        Dashboard
                                    </a>
                                    <a href="#"
                                       className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                        </svg>
                                        Team
                                    </a>
                                    <a href="#"
                                       className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                        </svg>
                                        Projects
                                    </a>
                                    <a href="#"
                                       className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        Calendar
                                    </a>
                                    <a href="#"
                                       className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                        </svg>
                                        Documents
                                    </a>
                                    <a href="#"
                                       className="mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                        <svg
                                            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                        </svg>
                                        Reports
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-0 flex-1 overflow-hidden">
                        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                            <button
                                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                                aria-label="Open sidebar">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            </button>
                        </div>
                        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
                            <div className="pt-2 pb-6 md:py-6">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                                </div>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    {/*// <!-- Replace with your content -->*/}
                                    <div className="py-4">
                                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                                    </div>
                                    {/*// <!-- /End replace -->*/}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
};

Dashboard.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
            return;
        } else {
            return {session: session, user: session.user}
        }
    }
};


export default Dashboard;
