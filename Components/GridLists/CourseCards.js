import React from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";


const COURSES = gql`
query Courses($userId: Int!){
  course(where: {created_by: {_eq: $userId}}) {
    id,
    title,
  }
}

`;

const CourseCards = ({header, userId}) => {

    const {loading, error, data} = useQuery(COURSES, {variables: {userId: 8}});
    if (loading) return null;
    if (data === undefined) return null;

    const getInitials = (name) => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    };

    return (
        <div>
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">{header}</h2>
            <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.course.map(item => <li key={item.id} className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                    <div
                        className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-pink-600">
                        {getInitials(item.title)}
                    </div>
                    <div className="flex-1 px-4 py-2 truncate">
                        <a href="#"
                           className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">{item.title}</a>
                        <p className="text-sm leading-5 text-gray-500">16 Members</p>
                    </div>
                    <div className="flex-shrink-0 pr-2">
                        <button
                            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                            </svg>
                        </button>
                    </div>
                </li>)}
                {/*<li className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">*/}
                {/*    <div*/}
                {/*        className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-pink-600">*/}
                {/*        GA*/}
                {/*    </div>*/}
                {/*    <div className="flex-1 px-4 py-2 truncate">*/}
                {/*        <a href="#"*/}
                {/*           className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">Graph*/}
                {/*            API</a>*/}
                {/*        <p className="text-sm leading-5 text-gray-500">16 Members</p>*/}
                {/*    </div>*/}
                {/*    <div className="flex-shrink-0 pr-2">*/}
                {/*        <button*/}
                {/*            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">*/}
                {/*            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*                <path*/}
                {/*                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">*/}
                {/*    <div*/}
                {/*        className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-purple-600">*/}
                {/*        CD*/}
                {/*    </div>*/}
                {/*    <div className="flex-1 px-4 py-2 truncate">*/}
                {/*        <a href="#"*/}
                {/*           className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">Component*/}
                {/*            Design</a>*/}
                {/*        <p className="text-sm leading-5 text-gray-500">12 Members</p>*/}
                {/*    </div>*/}
                {/*    <div className="flex-shrink-0 pr-2">*/}
                {/*        <button*/}
                {/*            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">*/}
                {/*            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*                <path*/}
                {/*                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">*/}
                {/*    <div*/}
                {/*        className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-orange-500">*/}
                {/*        T*/}
                {/*    </div>*/}
                {/*    <div className="flex-1 px-4 py-2 truncate">*/}
                {/*        <a href="#"*/}
                {/*           className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">Templates</a>*/}
                {/*        <p className="text-sm leading-5 text-gray-500">16 Members</p>*/}
                {/*    </div>*/}
                {/*    <div className="flex-shrink-0 pr-2">*/}
                {/*        <button*/}
                {/*            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">*/}
                {/*            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*                <path*/}
                {/*                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</li>*/}
                {/*<li className="col-span-1 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">*/}
                {/*    <div*/}
                {/*        className="flex-shrink-0 flex items-center justify-center w-16 h-16 text-white text-center text-sm leading-5 font-medium bg-green-400">*/}
                {/*        RC*/}
                {/*    </div>*/}
                {/*    <div className="flex-1 px-4 py-2 truncate">*/}
                {/*        <a href="#"*/}
                {/*           className="text-gray-900 text-sm leading-5 font-medium hover:text-gray-600 transition ease-in-out duration-150">React*/}
                {/*            Components</a>*/}
                {/*        <p className="text-sm leading-5 text-gray-500">8 Members</p>*/}
                {/*    </div>*/}
                {/*    <div className="flex-shrink-0 pr-2">*/}
                {/*        <button*/}
                {/*            className="w-8 h-8 inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition ease-in-out duration-150">*/}
                {/*            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">*/}
                {/*                <path*/}
                {/*                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>*/}
                {/*            </svg>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</li>*/}
            </ul>
        </div>
    )
};

export default CourseCards;
