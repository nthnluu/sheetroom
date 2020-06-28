import React, {useState} from 'react';
import auth0 from "../utils/auth0";
import Transition from "../Components/Transition";
import AdminPageLayout from "../Components/AdminPageLayout";
import gql from "graphql-tag";

const USER_CONTENT = gql`
query QuizByPk($id: uuid!) {
  quiz_by_pk(id: $id)
  {
    title
  }
}
`;

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
            greet.greeting = 'Good evening';
            greet.emoji = '🌌';
        }

        return greet

    }


    return (
        <AdminPageLayout user={user} currentPage={0}>
            <div className="py-12">
                <header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                            {timeGreeting().greeting}, {user.given_name} <span style={{fontFamily: 'serif'}}>{timeGreeting().emoji}</span>
                        </h1>
                    </div>
                </header>
                <main className="mt-6">
                    <section className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/*// <!-- Replace with your content -->*/}
                        <div className="px-4 py-8 sm:px-0">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Assignments</h2>
                            <AssignmentTable/>
                        </div>
                        {/*// <!-- /End replace -->*/}
                    </section>
                    <section className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/*// <!-- Replace with your content -->*/}
                        <div className="px-4 py-8 sm:px-0">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Your Library</h2>
                            <div className="flex justify-between mt-3">
                                <div className="bg-white rounded-lg">
                                    <nav>
                                        <div>
                                            <a href="#"
                                               className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                                               aria-current="page">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                                </svg>
                                                <span className="truncate">
        Quizzes
      </span>
                                            </a>
                                            <a href="#"
                                               className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                </svg>
                                                <span className="truncate">
        Classes
      </span>
                                            </a>
                                            <a href="#"
                                               className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                                </svg>
                                                <span className="truncate">
        Assignments
      </span>
                                            </a>
                                            <a href="#"
                                               className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                </svg>
                                                <span className="truncate">
        Calendar
      </span>
                                            </a>
                                            <a href="#"
                                               className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                                </svg>
                                                <span className="truncate">
        Documents
      </span>
                                            </a>
                                            <a href="#"
                                               className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
                                                <svg
                                                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                                </svg>
                                                <span className="truncate">
        Reports
      </span>
                                            </a>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="px-3 text-xs leading-4 font-semibold text-gray-500 uppercase tracking-wider"
                                                id="projects-headline">
                                                Projects
                                            </h3>
                                            <div className="mt-1" role="group" aria-labelledby="projects-headline">
                                                <a href="#"
                                                   className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
        <span className="truncate">
          Website redesign
        </span>
                                                </a>
                                                <a href="#"
                                                   className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
        <span className="truncate">
          GraphQL API
        </span>
                                                </a>
                                                <a href="#"
                                                   className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
        <span className="truncate">
          Customer migration guides
        </span>
                                                </a>
                                                <a href="#"
                                                   className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150">
        <span className="truncate">
          Profit sharing program
        </span>
                                                </a>
                                            </div>
                                        </div>
                                    </nav>

                                </div>
                                <div className="bg-white shadow-lg border border-gray-200 rounded-lg w-full ml-4">
                                    <div className="rounded-lg">
                                        <ul>
                                            <li>
                                                <a href="#"
                                                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                                        <div className="min-w-0 flex-1 flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <img className="h-12 w-12 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                     alt=""/>
                                                            </div>
                                                            <div
                                                                className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                <div>
                                                                    <div
                                                                        className="text-sm leading-5 font-medium text-indigo-600 truncate">Ricardo
                                                                        Cooper
                                                                    </div>
                                                                    <div
                                                                        className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                        <svg
                                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20" fill="currentColor">
                                                                            <path
                                                                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                                            <path
                                                                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                                        </svg>
                                                                        <span className="truncate">ricardo.cooper@example.com
                  </span>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden md:block">
                                                                    <div>
                                                                        <div
                                                                            className="text-sm leading-5 text-gray-900">
                                                                            Applied on
                                                                            <time dateTime="2020-01-07">January 7,
                                                                                2020
                                                                            </time>
                                                                        </div>
                                                                        <div
                                                                            className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                            <svg
                                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor">
                                                                                <path fill-rule="evenodd"
                                                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                                      clip-rule="evenodd"/>
                                                                            </svg>
                                                                            Completed phone screening
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <svg className="h-5 w-5 text-gray-400"
                                                                 viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd"
                                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="border-t border-gray-200">
                                                <a href="#"
                                                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                                        <div className="min-w-0 flex-1 flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <img className="h-12 w-12 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                     alt=""/>
                                                            </div>
                                                            <div
                                                                className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                <div>
                                                                    <div
                                                                        className="text-sm leading-5 font-medium text-indigo-600 truncate">Kristen
                                                                        Ramos
                                                                    </div>
                                                                    <div
                                                                        className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                        <svg
                                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20" fill="currentColor">
                                                                            <path
                                                                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                                            <path
                                                                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                                        </svg>
                                                                        <span className="truncate">kristen.ramos@example.com
                  </span>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden md:block">
                                                                    <div>
                                                                        <div
                                                                            className="text-sm leading-5 text-gray-900">
                                                                            Applied on
                                                                            <time dateTime="2020-01-07">January 7,
                                                                                2020
                                                                            </time>
                                                                        </div>
                                                                        <div
                                                                            className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                            <svg
                                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor">
                                                                                <path fill-rule="evenodd"
                                                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                                      clip-rule="evenodd"/>
                                                                            </svg>
                                                                            Completed phone screening
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <svg className="h-5 w-5 text-gray-400"
                                                                 viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd"
                                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="border-t border-gray-200">
                                                <a href="#"
                                                   className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                                        <div className="min-w-0 flex-1 flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <img className="h-12 w-12 rounded-full"
                                                                     src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                     alt=""/>
                                                            </div>
                                                            <div
                                                                className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                <div>
                                                                    <div
                                                                        className="text-sm leading-5 font-medium text-indigo-600 truncate">Ted
                                                                        Fox
                                                                    </div>
                                                                    <div
                                                                        className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                        <svg
                                                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                                            viewBox="0 0 20 20" fill="currentColor">
                                                                            <path
                                                                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                                                            <path
                                                                                d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                                                        </svg>
                                                                        <span className="truncate">ted.fox@example.com
                  </span>
                                                                    </div>
                                                                </div>
                                                                <div className="hidden md:block">
                                                                    <div>
                                                                        <div
                                                                            className="text-sm leading-5 text-gray-900">
                                                                            Applied on
                                                                            <time dateTime="2020-01-07">January 7,
                                                                                2020
                                                                            </time>
                                                                        </div>
                                                                        <div
                                                                            className="mt-2 flex items-center text-sm leading-5 text-gray-500">
                                                                            <svg
                                                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor">
                                                                                <path fill-rule="evenodd"
                                                                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                                      clip-rule="evenodd"/>
                                                                            </svg>
                                                                            Completed phone screening
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <svg className="h-5 w-5 text-gray-400"
                                                                 viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd"
                                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                      clip-rule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/*// <!-- /End replace -->*/}
                    </section>
                </main>
            </div>
        </AdminPageLayout>
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
