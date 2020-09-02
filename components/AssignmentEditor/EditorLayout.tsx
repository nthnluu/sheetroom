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
            {/*// @ts-ignore*/}

            <Navbar  session={session} content={<Content profileData={profileData}/>} pageData={pageData} profileData={profileData}/>

        </div>
    )

}

export default EditorLayout
