import Navbar from "./Navbar";
import JsonDebugBox from "../JsonDebugBox";
import React, {useState} from "react";

const PageLayout = ({session, course}) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar session={session} title={course.title} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

            <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 mt-8">
                <h1 className="text-2xl text-gray-800 font-semibold mr-1 mb-4">Students</h1>
                <ul className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {course.studentProfiles.map(student => <li className="col-span-1 bg-white rounded-lg shadow">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 text-sm leading-5 font-medium truncate">{student.user.name}</h3>
                                    <span
                                        className="flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">Admin</span>
                                </div>
                                <p className="mt-1 text-gray-500 text-sm leading-5 truncate">{student.user.email}</p>
                            </div>
                            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                 src={student.user.image}
                                 alt=""/>
                        </div>
                        <div className="border-t border-gray-200">
                            <div className="-mt-px flex">
                                <div className="w-0 flex-1 flex border-r border-gray-200">
                                    <a href="#"
                                       className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                        </svg>
                                        <span className="ml-3">Email</span>
                                    </a>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">
                                    <a href="#"
                                       className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150">
                                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                        <span className="ml-3">Call</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>)}


                </ul>
            </div>


        </div>
    )
}
export default PageLayout
