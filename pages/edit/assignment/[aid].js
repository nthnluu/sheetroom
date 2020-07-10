import {useRouter} from 'next/router'
import {ASSIGNMENT_WS, QUIZ} from "../../../gql/quizzes";
import {useMutation, useQuery, useSubscription} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import DnDList from "../../../Components/QuizEditor/DragAndDrop";
import AppLayout from "../../../Components/AppLayout";
import Head from 'next/head'
import React, {useState} from "react";
import {UPDATE_ASSIGNMENT_TITLE} from "../../../gql/assignmentAutosave";

const quizSampleData = {
    title: "Semester 2 Final",
    description: "Lorem ipsum dolor sit anem.",
    items: [
        {
            id: '11111111', type: "MC", question: "How many days are in a week?", choices: [
                {id: "11111a", text: "365 days", isCorrect: true},
                {id: "11111b", text: "366 days", isCorrect: false},
                {id: "11111c", text: "367 days", isCorrect: false},
                {id: "11111d", text: "368 days", isCorrect: false}
            ]
        },
        {
            id: '22222222', type: "MC", question: "How many days are in a month?", choices: [
                {id: "22222a", text: "30 days", isCorrect: true},
                {id: "22222b", text: "33 days", isCorrect: false},
                {id: "22222c", text: "35 days", isCorrect: false},
                {id: "22222d", text: "37 days", isCorrect: false}
            ]
        }, {
            id: '333333333', type: "MC", question: "How many days are in a month?", choices: [
                {id: "333333333a", text: "30 days", isCorrect: true},
                {id: "333333333b", text: "33 days", isCorrect: false},
                {id: "333333333c", text: "35 days", isCorrect: false},
                {id: "333333333d", text: "37 days", isCorrect: false}
            ]
        },
        {
            id: '4444444', type: "MC", question: "How many days are in a month?", choices: [
                {id: "344444443333a", text: "30 days", isCorrect: true},
                {id: "3333444444433333b", text: "33 days", isCorrect: false},
                {id: "3333444444433333c", text: "35 days", isCorrect: false},
                {id: "3333444444433333d", text: "37 days", isCorrect: false}
            ]
        }
    ]
};
const PageContent = ({data, aid, setSaveStatus, refetchData}) => {
    const [currentItem, setCurrentItem] = useState(undefined);
    return (
        <div key={aid}>
            {/*{JSON.stringify(data.assignments_assignment_by_pk.sections[0].items)}*/}
            <DnDList refetchData={refetchData} setSaveStatus={status => setSaveStatus(status)} currentItem={currentItem} setItem={setCurrentItem} items={(data.assignments_assignment_by_pk.sections[0] != undefined) ? data.assignments_assignment_by_pk.sections[0].items : null}/>
            <div className="pt-12 pb-32">
                <div className="grid grid-cols-2 items-center sm:grid-cols-3 gap-6 max-w-sm mx-auto leading-tight">
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 800 800"
                             className="h-8 w-8 mb-2 mx-auto">
                            <circle cx="195" cy="605" r="172.5" fill="currentColor"/>
                            <path fill="currentColor"
                                  d="M195 455a150 150 0 11-106.07 43.93A149 149 0 01195 455m0-45C87.3 410 0 497.3 0 605s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                            <circle className="cls-1" fill="none" cx="195" cy="195" r="172.5"/>
                            <path fill="currentColor"
                                  d="M195 45A150 150 0 1188.93 88.93 149 149 0 01195 45m0-45C87.3 0 0 87.3 0 195s87.3 195 195 195 195-87.3 195-195S302.7 0 195 0z"/>
                            <g>
                                <circle className="cls-1" fill="none" cx="605" cy="195" r="172.5"/>
                                <path fill="currentColor"
                                      d="M605 45a150 150 0 11-106.07 43.93A149 149 0 01605 45m0-45C497.3 0 410 87.3 410 195s87.3 195 195 195 195-87.3 195-195S712.7 0 605 0z"/>
                            </g>
                            <g>
                                <circle className="cls-1" fill="none" cx="605" cy="605" r="172.5"/>
                                <path fill="currentColor"
                                      d="M605 455a150 150 0 11-106.07 43.93A149 149 0 01605 455m0-45c-107.7 0-195 87.3-195 195s87.3 195 195 195 195-87.3 195-195-87.3-195-195-195z"/>
                            </g>
                        </svg>
                        Multiple Choice
                    </button>
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg
                            className="h-8 w-8 mb-2 mx-auto"
                            id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 800 800">
                            <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                  fill="none" x="429.5" y="23.5" width="343" height="343" rx="89.93"/>
                            <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45" stroke="currentColor"
                                  x="19.5" y="23.5" width="343" height="343" rx="89.93" fill="currentColor"/>
                            <path className="cls-3" strokeMiterlimit="10" stroke="#fff" strokeLinecap="round"
                                  strokeWidth="45" fill="none"
                                  d="M274.79 132.88l-95.32 119.54M121.29 190.95l48.95 61.43"/>
                            <g>
                                <rect className="cls-2" strokeMiterlimit="10" strokeWidth="45"
                                      stroke="currentColor" x="433.5" y="434.5" width="343" height="343"
                                      rx="89.93" fill="currentColor"/>
                                <path className="cls-3" strokeMiterlimit="10" stroke="#fff"
                                      strokeLinecap="round" strokeWidth="45" fill="none"
                                      d="M688.79 543.88l-95.32 119.54M535.29 601.95l48.95 61.43"/>
                            </g>
                            <rect className="cls-1" strokeMiterlimit="10" strokeWidth="45" fill="none" x="19.5"
                                  stroke="currentColor"
                                  y="432.5" width="343" height="343" rx="89.93"/>
                        </svg>
                        Multiple Answers
                    </button>
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg
                            className="h-8 w-8 mb-2 mx-auto"
                            data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                            <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                  stroke="currentColor" strokeMiterlimit="10" strokeWidth="65"/>
                            <path fill="currentColor"
                                  d="M325.69 527.39v-25.6l32.8-3.6-18.4-54H233.3l-18.4 54 32 3.6v25.6h-100v-25.2l17.2-4.4c4.8-1.2 8.4-2.8 10-7.6l88-252.4h56.39L406.89 491c1.6 4.8 4.8 5.6 9.6 6.8l18.4 4.4v25.2zm-38-245.2h-1.2L243.7 409h86.39zM586.49 527.39l-4-23.6-1.2-.4c-17.6 16.8-39.2 28.8-70.4 28.8-50.4 0-57.2-34.4-57.2-56.8 0-40 24.8-59.2 73.6-63.2l50.8-4v-20.4c0-25.2-4.4-38.8-35.2-38.8-22 0-36.8 1.6-36.8 29.2l-43.2-4c0-51.2 46.8-57.6 80.8-57.6 58 0 79.6 16.4 79.6 71.6V491c0 6.4.4 7.2 6.4 8l19.6 2.8v25.6zm-8.4-90l-38 3.2c-30 2.8-39.2 11.2-39.2 30.4s9.2 25.6 25.6 25.6c19.6 0 39.6-12 51.6-24z"/>
                        </svg>
                        Short Answer
                    </button>
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg
                            className="h-8 w-8 mb-2 mx-auto"
                            data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800.91 800.91">
                            <rect x="30.73" y="30.73" width="739.46" height="739.46" rx="167.45" fill="none"
                                  stroke="currentColor" strokeMiterlimit="10" strokeWidth="65"/>
                            <path fill="currentColor"
                                  d="M125.75 567.49l31.16-218c.35-2.1 0-3.5-2.45-3.5H131.7l4.55-35h25.91l3.15-22.4c6.65-46.9 32.55-63.7 70.7-63.7 22.05 0 47.25 8.4 60.2 18.55L277 275.94c-5.6-3.5-20.3-12.6-35.35-12.6s-22.4 8.05-24.5 23.45l-2.8 20.65c-.35 2.45-.35 3.5 2.45 3.5h53.9l-4.9 35h-56.7l-31.19 221.55zM319.3 553.84c-19.95-32.2-36.75-81.55-36.75-132.65 0-76.65 39.55-137.9 85.4-188.3l35.71 23.45C357.11 314.09 338.2 362.39 338.2 425c0 41.65 10.15 74.9 24.85 106.05zM523.36 493.29l-3.85-3.15-15.75-29.05-18.9-32.2-31.86 35.7 18.55 3.15-2.8 25.55h-81.9l2.8-25.2 15.4-2.8c4.2-.7 6.3-2.1 9.8-6L466.3 403 431 346.29c-2.1-3.5-3.15-4.9-7-6l-13.65-3.15 4.2-26.25h55.66l3.5 2.8 16.45 31.5 15.4 25.9 30.44-31.8-17.15-2.45 4.55-25.9h79.45l-3.5 25.9-15.4 3.5c-4.2.7-5.95 2.45-9.8 6.65l-50.05 50.4 38.15 61.25c2.45 3.85 3.85 5.6 7.7 6.3l17.85 2.8-4.2 25.55zM588.8 530.39c46.9-57.75 65.45-106 65.45-168.7 0-41.65-10.15-74.55-24.5-106l43.4-22.75c20.3 32.2 36.75 81.55 36.75 133 0 76.3-39.55 137.55-85 188z"/>
                        </svg>
                        Math
                    </button>
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 800 800"
                             className="h-8 w-8 mb-2 mx-auto">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"
                                  strokeWidth="65"
                                  d="M93.7 37.67v668.15M93.31 35L33.5 84.42M93.49 35l59.8 49.42"/>
                            <g>
                                <path fill="none" stroke="currentColor" strokeLinecap="round"
                                      strokeMiterlimit="10" strokeWidth="65"
                                      d="M762.33 706.3H102.8a6.86 6.86 0 01-6.68-8.42c20-85.7 191.39-787.65 332.4-326.4 150 490.62 311.6-311.6 311.6-311.6M765 706.69l-49.42 59.81M765 706.51l-49.42-59.8"/>
                            </g>
                        </svg>
                        Graph
                    </button>
                    <button
                        className="h-28 w-28 p-4 border mx-auto rounded-lg text-center text-gray-500 text-sm font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg className="h-8 w-8 mb-2 mx-auto" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Section
                    </button>

                </div>

            </div>
        </div>
    )
};
const LoadingPlaceholder = () => {
    return (
        <div className="pt-56">
            <Head>
                <title>Homework</title>
            </Head>
            <i className="fas fa-circle-notch text-5xl text-center w-full text-gray-300 fa-spin"></i>
            <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
        </div>
    )
};
const ThirdArea = ({data, isSaving, saveFailed, lastSaved}) => {
    return (
        <>
            <header className="space-y-1 py-4 px-4 border-b border-gray-200 sm:px-6">
                <div className="space-y-1">
                    <button
                        className="py-3 px-4 w-full text-left rounded-md  leading-5 font-medium text-blue-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 focus:shadow-outline-blue active:bg-blue-200 transition duration-150 ease-in-out">
                        <i className="fas fa-clipboard-check mr-5"/>Assign to Course
                    </button>
                    <button
                        className="py-3 px-4 w-full text-left rounded-md leading-5 font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline-blue active:bg-gray-200 transition duration-150 ease-in-out">
                        <i className="fas fa-link mr-4"/>Copy Link
                    </button>

                    <button
                        className="py-3 px-4 w-full text-left rounded-md leading-5 font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline-blue active:bg-gray-200 transition duration-150 ease-in-out">
                        <i className="fas fa-print mr-3"/>Generate Print Version
                    </button>
                    {saveFailed ? <button
                        className="py-3 px-4 w-full text-left rounded-md leading-5 font-medium text-red-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline-blue active:bg-gray-200 transition duration-150 ease-in-out">
                        <i className="fas fa-times mr-3 text-red-600"/>Save Failed
                    </button> : <button
                        className="py-3 px-4 w-full text-left rounded-md leading-5 font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline-blue active:bg-gray-200 transition duration-150 ease-in-out">
                        <i className={isSaving ? "fas fa-sync-alt mr-3 fa-spin" : "fas fa-check mr-3 text-green-500"}/>{isSaving ? "Saving" : "Saved"}
                    </button>}


                </div>
            </header>
            <div className="flex-1 flex flex-col justify-between">
                <div className="px-4 divide-y divide-gray-200 sm:px-6">
                    <div className="space-y-6 pt-8 pb-4">
                        <div className="space-y-1">
                            <label htmlFor="description"
                                   className="block text-sm font-medium leading-5 text-gray-900">
                                Description
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                                        <textarea id="description" rows="4"
                                                                  value={data.assignments_assignment_by_pk.description}
                                                                  className="form-input z-0 block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"></textarea>
                            </div>
                        </div>
                        <div className="space-y-2 pb-8">
                            <h3 className="text-sm font-medium leading-5 text-gray-900">
                                Team Members
                            </h3>
                            <div>
                                <div className="flex space-x-2">
                                    <a href="#">
                                        <img className="inline-block h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="Tom Warner"/>
                                    </a>
                                    <a href="#">
                                        <img className="inline-block h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="Sally Preston"/>
                                    </a>
                                    <a href="#">
                                        <img className="inline-block h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                             alt="Dave Gusman"/>
                                    </a>
                                    <a href="#">
                                        <img className="inline-block h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="Tom Cook"/>
                                    </a>
                                    <a href="#">
                                        <img className="inline-block h-8 w-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                                             alt="Brandon Rogers"/>
                                    </a>
                                    <button type="button"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                                            aria-label="Add team member">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 pt-4 pb-6">
                        <div className="flex text-sm leading-5">
                            <a href="#"
                               className="group space-x-2 inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                                <svg
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span>
                        Copy link
                      </span>
                            </a>
                        </div>
                        <div className="flex text-sm leading-5">
                            <a href="#"
                               className="group space-x-2 inline-flex items-center text-gray-500 hover:text-gray-900 transition ease-in-out duration-150">
                                <svg
                                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-in-out duration-150"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                          clipRule="evenodd"/>
                                </svg>
                                <span>
                        Learn more about sharing
                      </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};


const QuizEditor = ({user}) => {
    const router = useRouter();
    const {aid} = router.query;
    const [saveStatus, setSaveStatus] = useState(0);
    const [refetchData, setRefetchData] = useState(false);

    //autosave mutations
    const [updateTitle, {titleData}] = useMutation(UPDATE_ASSIGNMENT_TITLE);

    const {loading, error, data} = useSubscription(ASSIGNMENT_WS, {
        variables: {id: aid}
    });
    if (error) return `Error! ${JSON.stringify(error)}`;



    return (
        <>
            <div className="min-h-screen bg-gray-50" key={aid}>
                {loading ? <LoadingPlaceholder/> :
                    <AppLayout pageId={aid} onTitleBlur={(value) => {
                        if (value === data.assignments_assignment_by_pk.title) {

                        } else {
                            setSaveStatus(1);
                            updateTitle({variables: {assignmentId: aid, title: value}})
                                .then(() => setSaveStatus(0))
                                .catch((error) => setSaveStatus(2));
                        }}} title={data.assignments_assignment_by_pk.title} content={
                            <PageContent refetchData={refetchData} data={data} aid={aid} setSaveStatus={(status) => setSaveStatus(status)}/>}
                               questionMenu
                               editableTitle
                               thirdArea={<ThirdArea data={data} isSaving={saveStatus === 1} lastSaved={data.assignments_assignment_by_pk.updated_at} saveFailed={saveStatus===2}/>}
                               windowTitle={data.assignments_assignment_by_pk.title}/>}
            </div>
        </>
    )
};

QuizEditor.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
        } else {
            return {session: session, user: session.user}
        }
    }


};

export default QuizEditor
