import React from "react";
import PageContent from "../PageLayouts/AppLayout/PageContent";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";

interface Props {
    session: string;
    profileData: any;
    proData?: any;
}


const Content: React.FC<Props> = ({session, profileData, proData}) => {

    return (<PageContent session={session} sidebar={<Sidebar proData={proData} session={session} profile={profileData}/>} mainContent={<ProjectList proData={proData} session={session} profileData={profileData}/>}/>)
}

export default Content
