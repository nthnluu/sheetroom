import React from 'react';
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";
import CheckForUser from "../lib/CheckForUser";

interface Props {
    session: string;
    profileData: any;
}

const Dashboard: React.FC<Props> = ({session, profileData}) => {

    return (
        <>
            <AppLayout session={session} profileData={profileData}
                       content={<PageContent session={session} profileData={profileData}/>}
            />
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};


export default Dashboard;
