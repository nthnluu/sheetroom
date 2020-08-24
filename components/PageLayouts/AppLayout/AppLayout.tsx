import React from "react";
import Navbar from "./Navbar";
import ActivityFeed from "../../Dashboard/ActivityFeed";
import NewAssignmentModal from "../../Modals/NewAssignmentModal";


interface Props {
    content?: JSX.Element;
    session: string;
}

const AppLayout: React.FC<Props> = ({content, session}) => {
    return (<div>
        {/* Background color split screen for large screens */}
        <div className="fixed top-0 left-0 w-1/2 h-full bg-white" />
        <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" />
        <div className="relative min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar session={session}/>
            {/* 3 column wrapper */}
            <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex mt-14">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    {content}
                </div>
                {/* Activity feed */}
                <ActivityFeed session={session}/>
            </div>
        </div>
    </div>)
}

export default AppLayout
