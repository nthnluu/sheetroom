import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Content from "./Content";

interface Props {
    windowTitle: string;
    session: string;
    pageData: object;
    profileData;
}

const EditorLayout: React.FC<Props> = ({windowTitle, session, pageData, profileData}) => {



    return (

        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Sheetroom") : "Sheetroom"}</title>
            </Head>
            {/*// @ts-ignore*/}

            <Navbar  session={session} content={<Content/>} pageData={pageData} profileData={profileData}/>

        </div>
    )

}

export default EditorLayout
