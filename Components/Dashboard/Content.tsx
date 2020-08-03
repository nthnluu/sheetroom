import React from "react";
import PageContent from "../PageLayouts/AppLayout/PageContent";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";

interface Props {
    session: Session;
}


const Content: React.FC<Props> = ({session}) => {

    return (<PageContent session={session} sidebar={<Sidebar session={session}/>} mainContent={<ProjectList session={session}/>}/>)
}

export default Content
