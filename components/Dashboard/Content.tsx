import React from "react";
import PageContent from "../PageLayouts/AppLayout/PageContent";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";

interface Props {
    session: string;
    profileData: any;
}


const Content: React.FC<Props> = ({session, profileData}) => {

    return (<PageContent session={session} sidebar={<Sidebar session={session} profile={profileData}/>} mainContent={<ProjectList session={session} profileData={profileData}/>}/>)
}

export default Content
