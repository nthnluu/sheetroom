import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Footer from "../components/Misc/Footer";

const Features = () => {

    return <>
        <Navbar unfixed/>
        <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
            <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
                <svg className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
                     width={404} height={784} fill="none" viewBox="0 0 404 784">
                    <defs>
                        <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x={0} y={0} width={20} height={20}
                                 patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"/>
                </svg>
                <div className="relative">
                    <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                        How Sheetroom Works
                    </h3>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
                        Discover how easy it is to create and share assignments.
                    </p>
                </div>
                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="relative">
                        <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                            Build your assignment
                        </h4>
                        <p className="mt-3 text-lg leading-7 text-gray-500">
                            Get started by crafting your assignment inside the Assignment Builder.
                        </p>
                        <ul className="mt-10">
                            <li>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">Forget about
                                            formatting</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            Focus on writing content knowing your assignments will look great on both
                                            desktops and phones.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">Rich content</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            Easily embed formulas, graphs, and images straight into your question.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">Customizable scoring
                                            and more</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            Customize anything about your question, from its point value to its typo
                                            tolerance.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10 -mx-4 relative lg:mt-0">
                        <svg className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                             width={784} height={404} fill="none" viewBox="0 0 784 404">
                            <defs>
                                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x={0} y={0} width={20} height={20}
                                         patternUnits="userSpaceOnUse">
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200"
                                          fill="currentColor"/>
                                </pattern>
                            </defs>
                            <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"/>
                        </svg>
                        <video muted autoPlay src="/ui_vid.mp4" className="relative mx-auto rounded-lg shadow lg:-mr-24"
                               loop width={1000}/>
                    </div>
                </div>

                <div className="relative mt-12 sm:mt-16 lg:mt-24">
                    <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div className="lg:col-start-2">
                            <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                                Share your assignment
                            </h4>
                            <p className="mt-3 text-lg leading-7 text-gray-500">
                                Next, start collecting results by sharing your assignment with an invite link.
                            </p>
                            <ul className="mt-10">
                                <li>
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h5 className="text-lg leading-6 font-medium text-gray-900">Share privately
                                                or publically</h5>
                                            <p className="mt-2 text-base leading-6 text-gray-500">
                                                You can create invites that are open to anyone with a link or just
                                                members of a specific clas.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-10">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h5 className="text-lg leading-6 font-medium text-gray-900">Always in
                                                control</h5>

                                            <p className="mt-2 text-base leading-6 text-gray-500">
                                                You have complete control over who can view your assignment and any
                                                submissions derived from it. You can always disable links you've
                                                created.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                            <svg className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                                 width={784} height={404} fill="none" viewBox="0 0 784 404">
                                <defs>
                                    <pattern id="e80155a9-dfde-425a-b5ea-1f6fadd20131" x={0} y={0} width={20}
                                             height={20} patternUnits="userSpaceOnUse">
                                        <rect x={0} y={0} width={4} height={4} className="text-gray-200"
                                              fill="currentColor"/>
                                    </pattern>
                                </defs>
                                <rect width={784} height={404} fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"/>
                            </svg>
                            <img className="relative mx-auto rounded-lg shadow-xl lg:-ml-24" width={1000}
                                 src="/step2.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="relative">
                        <h4 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                            Connect your class
                        </h4>
                        <p className="mt-3 text-lg leading-7 text-gray-500">
                            Add students to a class for easier assignment sharing and more powerful controls.
                        </p>
                        <ul className="mt-10">
                            <li>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">See student
                                            results</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            Assigning an assignment to a class allows you to collect student names and
                                            organize all their results in one place.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">Automatically
                                            receive assignments</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            When students join your class, they can see any pending assignments right on
                                            their dashboard.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-10">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h5 className="text-lg leading-6 font-medium text-gray-900">Get more
                                            control</h5>
                                        <p className="mt-2 text-base leading-6 text-gray-500">
                                            Get control over attempts, due dates, and more.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10 -mx-4 relative lg:mt-0">
                        <svg className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                             width={784} height={404} fill="none" viewBox="0 0 784 404">
                            <defs>
                                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x={0} y={0} width={20} height={20}
                                         patternUnits="userSpaceOnUse">
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200"
                                          fill="currentColor"/>
                                </pattern>
                            </defs>
                            <rect width={784} height={404} fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"/>
                        </svg>
                        <img src="/student_grid.png" className="relative mx-auto rounded-lg lg:-mr-24" width={1000}/>
                    </div>
                </div>
                <svg className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
                     width={404} height={784} fill="none" viewBox="0 0 404 784">
                    <defs>
                        <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x={0} y={0} width={20} height={20}
                                 patternUnits="userSpaceOnUse">
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor"/>
                        </pattern>
                    </defs>
                    <rect width={404} height={784} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"/>
                </svg>
            </div>
        </div>
        <Footer/>
    </>
}


export default Features
