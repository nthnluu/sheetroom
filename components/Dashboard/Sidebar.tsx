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
                                    <div
                                        // @ts-ignore
                                        className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium truncate">{session.email}
                                    </div>
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
                    {profile.data.users_by_pk.account_type === "teacher" ? <div
                        className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                        <div className="flex items-center space-x-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm text-gray-500 leading-5 font-medium">Pro Member</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                            </svg>
                            <span className="text-sm text-gray-500 leading-5 font-medium">8 Projects</span>
                        </div>
                    </div> : null}

                </div>
            </div>
        </div>
    </div>
            </>)
}

export default Sidebar
