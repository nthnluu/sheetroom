import React from "react";

interface Props {
    session: string;
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
