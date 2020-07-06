import NewNavbar from "./Navbar/NewNavbar";
import React from "react";
import HeaderWithAction from "./PageHeadings/HeaderWithActions";
import Head from "next/head";

export default function ({sidebar, thirdArea, title, content, newButton, editableTitle, questionMenu, setModal, windowTitle}) {

    const SidebarItem = ({sidebar, number, label, icon}) => {
        return (
            <a href="#"
               className={(sidebar === number) ? "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" : "mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"}>
                <svg
                    className={(sidebar === number) ? "mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" : "mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                </svg>
                {label}
            </a>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Homework") : "Homework"}</title>
            </Head>
            <div className="h-screen overflow-hidden bg-white">
                <NewNavbar/>
                <div className="h-full flex">
                    {/*// <!-- Static sidebar for desktop -->*/}
                    {sidebar ? <div className="hidden md:flex md:flex-shrink-0">
                        <div className="flex flex-col border-r border-gray-200 bg-white px-4 lg:px-6" style={{width: '17rem'}}>
                            <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                {/*// <!-- Sidebar component, swap this element with another sidebar if you like -->*/}
                                <nav className="flex-1 px-2 bg-white">
                                    <SidebarItem sidebar={sidebar} number={1} label="Dashboard"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>}/>
                                    <SidebarItem sidebar={sidebar} number={2} label="Classes"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>}/>
                                    <SidebarItem sidebar={sidebar} number={3} label="Projects"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>}/>
                                    <SidebarItem sidebar={sidebar} number={4} label="Calendar"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>}/>
                                    <SidebarItem sidebar={sidebar} number={5} label="Documents"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>}/>
                                    <SidebarItem sidebar={sidebar} number={6} label="Reports"
                                                 icon={<path stroke-linecap="round" stroke-linejoin="round"
                                                             stroke-width="2"
                                                             d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>}/>
                                </nav>
                            </div>
                        </div>
                    </div> : null}

                    {/*Content Area*/}
                    <div className="flex flex-col w-0 flex-1 overflow-hidden mt-4 md:mt-0">
                        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none lg:px-6" tabIndex="0">
                            <div className="pt-2 pb-6 md:py-6">
                                <div className="mx-auto px-4 sm:px-6 lg:px-2 my-4">
                                    <HeaderWithAction title={title} setModal={setModal} newButton={newButton} questionMenu={questionMenu} editableTitle={editableTitle}/>
                                </div>
                                <div className="mx-auto px-4 sm:px-6 lg:px-2">
                                    {/*// <!-- Replace with your content -->*/}
                                    <div className="py-4">
                                        {content}
                                    </div>
                                    {/*// <!-- /End replace -->*/}
                                </div>
                            </div>
                        </main>
                    </div>

                    {/*Tertiary Sidebar*/}
                    {thirdArea ? <div className="hidden md:flex md:flex-shrink-0">
                        <div className="flex flex-col w-auto border-l border-gray-200 bg-white">
                            <div className="h-0 flex-1 flex flex-col w-96 overflow-y-auto">
                                {/*// <!-- Sidebar component, swap this element with another sidebar if you like -->*/}
                                {thirdArea}
                            </div>
                        </div>
                    </div> : null}
                </div>
            </div>
        </div>
    )

}
