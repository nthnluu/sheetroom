import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Transition from "../Transition";
import AssignmentList from "../Lists/AssignmentList";
import React, {useContext, useState} from "react";
import AuthContext from "../AuthContext";

interface Props {
    session: object;
    sidebar: JSX.Element;
    mainContent: JSX.Element;
}

const PageContent: React.FC<Props> = ({session, sidebar, mainContent}) => {


    return (<>
        {/* Sidebar */}
        {sidebar}


        {/* Main Content */}
        {mainContent}
    </>)
}

export default PageContent
