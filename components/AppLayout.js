import React from "react";
import Head from "next/head";

export default function ({content, windowTitle, navbar}) {


    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Homework") : "Homework"}</title>
            </Head>
            <nav className="fixed w-full z-50">
                {navbar}
            </nav>

            <main className="pt-14">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        {content}
                    </div>
                </div>
            </main>



        </div>
    )

}
