import AppNavbar from "./Navbar/AppNavbar";
import React from "react";
import HeaderWithAction from "./PageHeadings/HeaderWithActions";
import Head from "next/head";

export default function ({sidebar, thirdArea, title, content, newButton, editableTitle, questionMenu, windowTitle, onTitleBlur, pageId, navbar}) {

    const SidebarItem = ({sidebar, number, label, icon, link}) => {
        return (
            <a href={link}
               className={(sidebar === number) ? "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" : "mt-1 group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"}>
                <svg
                    className={(sidebar === number) ? "mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150" : "mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                </svg>
                {label}
            </a>
        )
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Homework") : "Homework"}</title>
            </Head>
            <nav className="fixed w-full z-50">
                {navbar}
            </nav>

            <main className="pt-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        {content}
                    </div>
                </div>
            </main>



        </div>
    )

}
