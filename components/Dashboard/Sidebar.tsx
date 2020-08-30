import React from "react";



interface Props {
    session: string;
    profile: any;
}


const Sidebar: React.FC<Props> = ({session, profile}) => {
    return (
        <>
        <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
        <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div
                        className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        {/* Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-12 w-12">
                                <img className="h-12 w-12 rounded-full"
                                    // @ts-ignore
                                     src={session.picture ? session.picture : "/profile.jpg"}
                                     alt=""/>
                            </div>

                            <div className="space-y-1">
                                {/*//@ts-ignore*/}
                                <div className="text-sm leading-5 font-medium text-gray-900 truncate">{`${profile.data.users_by_pk.first_name} ${profile.data.users_by_pk.last_name}`}</div>
                                <a href="#" className="group flex items-center space-x-2.5">
                                    {profile.data.users_by_pk.account_type === "teacher" ? <div
                                        className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                                        {profile.data.users_by_pk.is_pro ?  <div className="flex items-center space-x-2 text-blue-500">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span className="text-sm  leading-5 font-medium">Pro Member</span>
                                        </div> :  <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-500 leading-5 font-medium">Free Account</span>
                                        </div>}

                                    </div> : <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500 leading-5 font-medium">Student</span>
                                    </div>}
                                </a>
                            </div>
                        </div>
                        {/* Action buttons */}
                        {/*<div*/}
                        {/*    className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">*/}
                        {/*    <span className="inline-flex rounded-md shadow-sm">*/}

                        {/*    <button type="button" onClick={() => toggleCreateAssignmentDialog(true)}*/}
                        {/*            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">*/}
                        {/*      New Assignment*/}
                        {/*    </button>*/}
                        {/*  </span>*/}
                        {/*    <span className="inline-flex rounded-md shadow-sm">*/}
                        {/*    <button type="button"*/}
                        {/*            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">*/}
                        {/*      Assign to Class*/}
                        {/*    </button>*/}
                        {/*  </span>*/}
                        {/*</div>*/}
                    </div>
                    {/* Meta info */}


                </div>
            </div>
        </div>
    </div>
            </>)
}

export default Sidebar
