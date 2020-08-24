import React from "react";
import PageContent from "../PageLayouts/AppLayout/PageContent";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";

interface Props {
    session: string;
    profile: any;
}


const Content: React.FC<Props> = ({session, profile}) => {

    return (<PageContent session={session} sidebar={<Sidebar session={session} profile={profile}/>} mainContent={<ProjectList session={session}/>}/>)
}

export default Content
