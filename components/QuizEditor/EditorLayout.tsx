import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Content from "./Content";
import {Navbar as PageNavbar} from "../PageLayouts/AppLayout/Navbar"

interface Props {
    windowTitle: string;
    session: string;
}

const EditorLayout: React.FC<Props> = ({windowTitle, session}) => {



    return (

        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>{windowTitle ? (windowTitle + " - Sheetroom") : "Sheetroom"}</title>
            </Head>
            {/*// @ts-ignore*/}

            <Navbar  session={session} content={<Content/>}/>

        </div>
    )

}

export default EditorLayout
