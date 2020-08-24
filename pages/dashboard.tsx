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
            <AppLayout session={session}
                       content={<><PageContent session={session} profile={profileData}/></>
                       }
            />

        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};

export default Dashboard;
