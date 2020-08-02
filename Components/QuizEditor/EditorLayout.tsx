import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Content from "./Content";

interface Props {
    windowTitle: string;
    aid: string;
}

const EditorLayout: React.FC<Props> = ({aid, windowTitle}) => {


    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Sheetroom") : "Sheetroom"}</title>
            </Head>
            <Navbar/>

            <Content/>


        </div>
    )

}

export default EditorLayout
