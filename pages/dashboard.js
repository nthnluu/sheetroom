import React, {useState} from 'react';
import AdminPageLayout from "../Components/AdminPageLayout";
import gql from "graphql-tag";
import {getSession} from 'next-auth/client'
import { useQuery } from '@apollo/react-hooks';

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
    const { loading, error, data } = useQuery(QUIZZES, {variables: {userId: userId}});
    if (loading) return (<div className="px-4 py-8 sm:px-0">
        <h2 className="text-xl leading-6 font-bold text-gray-900 mb-3">Your Library</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
           <div>
                <div className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
            <div>
                <div className="h-64 rounded-lg bg-gray-100 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"/>
            </div>
        </div>
    </div>);
    if (error) return <p>Error :(</p>;


    return (
        <div className="px-4 py-8 sm:px-0">
            <h2 className="text-xl leading-6 font-bold text-gray-900 mb-3">Your Library</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-3">
                {data.quiz.map((item) => <div onClick={() => window.location.href = '/edit/quiz/' + item.id}>
                    <div className="h-64 rounded-lg border-2 mb-2 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 cursor-pointer"/>
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
        <AdminPageLayout user={user} currentPage={0}>
            <div className="py-12">
                <header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
                            {timeGreeting().greeting}, {session.name} <span style={{fontFamily: 'serif'}}>{timeGreeting().emoji}</span>
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
                        <QuizGrid userId={userId}/>

                        {/*// <!-- /End replace -->*/}
                    </section>
                </main>
            </div>
        </AdminPageLayout>
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
