import React from "react";
import Navbar from "./Navbar";
import ActivityFeed from "./ActivityFeed";


interface Props {
    sidebar?: JSX.Element;
    session: object
}

const PageLayout: React.FC<Props> = ({sidebar, session}) => {
    return (<div>
        {/* Background color split screen for large screens */}
        <div className="fixed top-0 left-0 w-1/2 h-full bg-white" />
        <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" />
        <div className="relative min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar session={session}/>
            {/* 3 column wrapper */}
            <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex mt-16">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    {sidebar}
                </div>
                {/* Activity feed */}
                <ActivityFeed/>
            </div>
        </div>
    </div>)
}

export default PageLayout
