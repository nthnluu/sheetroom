import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps} from "next";
import DesktopGraphic from "../components/LandingPage/DesktopGraphic";
import Footer from "../components/Misc/Footer";

const InlineButton = ({label, onClick, selected}) => {
    return <button className={"px-1 rounded-md font-medium mr-1 mt-1 sm:mt-0 focus:outline-none focus:shadow-outline " + (selected ? "bg-blue-200 text-blue-600" : "bg-gray-200")} onClick={onClick}>{label}</button>
}

const Index: React.FC<{ session: any }> = ({session}) => {
    const [itemTypeSelection, setItemTypeSelection] = useState(0)

    return (
        <>
            <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#E8F5FE'}}>
                <div className="z-50">
                    <Navbar session={session} unfixed transparent darkText/>
                </div>
                <div>
                    <div className="mx-auto px-4 pb-12 pt-20 md:pt-24 max-w-7xl">
                        <header className="max-w-6xl mx-auto mb-12 md:mb-0">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-gray-800 leading-tight z-40">Beautiful
                                assignments for desktop, mobile and paper.
                            </h1>
                        </header>
                        <DesktopGraphic/>
                    </div>
                </div>

                <section className="w-full">
                    <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
                        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
                            <svg
                                className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
                                width="404" height="784" fill="none" viewBox="0 0 404 784">
                                <defs>
                                    <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20"
                                             height="20" patternUnits="userSpaceOnUse">
                                        <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                              fill="currentColor"/>
                                    </pattern>
                                </defs>
                                <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"/>
                            </svg>

                            <div className="relative">
                                <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                                    A better way to manage classwork
                                </h3>
                                <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
                                    Stop wrestling with formatting or buggy LMS quizzes. Start writing beautiful
                                    assignments that look great on desktop, mobile, and paper.
                                </p>
                            </div>

                            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                                <div className="relative">
                                    <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                                        Focus on writing content
                                    </h4>
                                    <p className="mt-3 text-lg leading-7 text-gray-500">
                                        Assignments are made up of the question types you already know: <InlineButton selected={itemTypeSelection === 0} onClick={() => setItemTypeSelection(0)}
                                        label="Multiple Choice"/>, <InlineButton selected={itemTypeSelection === 1} onClick={() => setItemTypeSelection(1)}
                                        label="Multiple Answers"/>, <InlineButton selected={itemTypeSelection === 2} onClick={() => setItemTypeSelection(2)} label="Short Answer"/>, <InlineButton
                                        selected={itemTypeSelection === 3}
                                        onClick={() => setItemTypeSelection(3)}
                                        label="Math"/>, and so on. Since Sheetroom takes care of formatting and scoring,
                                        you'll spend less time checking work and worrying about how your assignment
                                        looks.
                                    </p>

                                    <ul className="mt-10">
                                        <li>
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                             stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h5 className="text-lg leading-6 font-medium text-gray-900">Drag and
                                                        drop editor</h5>
                                                    <p className="mt-2 text-base leading-6 text-gray-500">
                                                        Rearrange sections, questions, and answer choices with drag and
                                                        drop. Easily insert math without using LaTeX, and add interactive graphs knowing that your content looks great everywhere.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mt-10">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                             stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h5 className="text-lg leading-6 font-medium text-gray-900">Customizable and intelligent scoring</h5>
                                                    <p className="mt-2 text-base leading-6 text-gray-500">
                                                        Spend less time grading with a simple, yet powerful autograder built into every question. Features such as typo-tolerance and alternate answer choices allow you to be as lenient as you'd like.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mt-10">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div
                                                        className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                             stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2" d="M9 12L11 14L15 10M20.6179 5.98434C20.4132 5.99472 20.2072 5.99997 20 5.99997C16.9265 5.99997 14.123 4.84453 11.9999 2.94434C9.87691 4.84446 7.07339 5.99985 4 5.99985C3.79277 5.99985 3.58678 5.9946 3.38213 5.98422C3.1327 6.94783 3 7.95842 3 9.00001C3 14.5915 6.82432 19.2898 12 20.622C17.1757 19.2898 21 14.5915 21 9.00001C21 7.95847 20.8673 6.94791 20.6179 5.98434Z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <h5 className="text-lg leading-6 font-medium text-gray-900">Share and collect results securely</h5>
                                                    <p className="mt-2 text-base leading-6 text-gray-500">
                                                        Share your assignment and collect results using a link or a join
                                                        code. You're in control over who can see your assignment, and you can always disable links you've created.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-10 -mx-4 relative lg:mt-0">
                                    <svg
                                        className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                                        width="784" height="404" fill="none" viewBox="0 0 784 404">
                                        <defs>
                                            <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20"
                                                     height="20" patternUnits="userSpaceOnUse">
                                                <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                                      fill="currentColor"/>
                                            </pattern>
                                        </defs>
                                        <rect width="784" height="404"
                                              fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"/>
                                    </svg>
                                    <img className="relative mx-auto" width="490"
                                         src="https://tailwindui.com/img/features/feature-example-1.png" alt=""/>
                                </div>
                            </div>

                            {/*<svg*/}
                            {/*    className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"*/}
                            {/*    width="404" height="784" fill="none" viewBox="0 0 404 784">*/}
                            {/*    <defs>*/}
                            {/*        <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20"*/}
                            {/*                 height="20" patternUnits="userSpaceOnUse">*/}
                            {/*            <rect x="0" y="0" width="4" height="4" className="text-gray-200"*/}
                            {/*                  fill="currentColor"/>*/}
                            {/*        </pattern>*/}
                            {/*    </defs>*/}
                            {/*    <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>*/}
                            {/*</svg>*/}

                            {/*<div className="relative mt-12 sm:mt-16 lg:mt-24">*/}
                            {/*    <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">*/}
                            {/*        <div className="lg:col-start-2">*/}
                            {/*            <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">*/}
                            {/*                Always in the loop*/}
                            {/*            </h4>*/}
                            {/*            <p className="mt-3 text-lg leading-7 text-gray-500">*/}
                            {/*                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex*/}
                            {/*                obcaecati natus eligendi delectus, cum deleniti sunt in labore nihil quod*/}
                            {/*                quibusdam expedita nemo.*/}
                            {/*            </p>*/}

                            {/*            <ul className="mt-10">*/}
                            {/*                <li>*/}
                            {/*                    <div className="flex">*/}
                            {/*                        <div className="flex-shrink-0">*/}
                            {/*                            <div*/}
                            {/*                                className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">*/}
                            {/*                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"*/}
                            {/*                                     stroke="currentColor">*/}
                            {/*                                    <path strokeLinecap="round" strokeLinejoin="round"*/}
                            {/*                                          strokeWidth="2"*/}
                            {/*                                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>*/}
                            {/*                                </svg>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                        <div className="ml-4">*/}
                            {/*                            <h5 className="text-lg leading-6 font-medium text-gray-900">Mobile*/}
                            {/*                                notifications</h5>*/}
                            {/*                            <p className="mt-2 text-base leading-6 text-gray-500">*/}
                            {/*                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.*/}
                            {/*                                Maiores impedit perferendis suscipit eaque, iste dolor*/}
                            {/*                                cupiditate blanditiis ratione.*/}
                            {/*                            </p>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </li>*/}
                            {/*                <li className="mt-10">*/}
                            {/*                    <div className="flex">*/}
                            {/*                        <div className="flex-shrink-0">*/}
                            {/*                            <div*/}
                            {/*                                className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">*/}
                            {/*                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"*/}
                            {/*                                     stroke="currentColor">*/}
                            {/*                                    <path strokeLinecap="round" strokeLinejoin="round"*/}
                            {/*                                          strokeWidth="2"*/}
                            {/*                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>*/}
                            {/*                                </svg>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                        <div className="ml-4">*/}
                            {/*                            <h5 className="text-lg leading-6 font-medium text-gray-900">Reminder*/}
                            {/*                                emails</h5>*/}
                            {/*                            <p className="mt-2 text-base leading-6 text-gray-500">*/}
                            {/*                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.*/}
                            {/*                                Maiores impedit perferendis suscipit eaque, iste dolor*/}
                            {/*                                cupiditate blanditiis ratione.*/}
                            {/*                            </p>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}

                            {/*        <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">*/}
                            {/*            <svg*/}
                            {/*                className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"*/}
                            {/*                width="784" height="404" fill="none" viewBox="0 0 784 404">*/}
                            {/*                <defs>*/}
                            {/*                    <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x="0" y="0"*/}
                            {/*                             width="20" height="20" patternUnits="userSpaceOnUse">*/}
                            {/*                        <rect x="0" y="0" width="4" height="4" className="text-gray-200"*/}
                            {/*                              fill="currentColor"/>*/}
                            {/*                    </pattern>*/}
                            {/*                </defs>*/}
                            {/*                <rect width="784" height="404"*/}
                            {/*                      fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"/>*/}
                            {/*            </svg>*/}
                            {/*            <img className="relative mx-auto" width="490"*/}
                            {/*                 src="https://tailwindui.com/img/features/feature-example-2.png" alt=""/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>


                </section>
            </div>
            <Footer/>
        </>
    )
};


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});


    if (session) {
        res.writeHead(302, {location: '/dashboard'})
        res.end()
    }

    return {
        props: {
            session
        },
    };
};

export default Index;


