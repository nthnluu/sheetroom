import React from 'react';
import {getSession} from 'next-auth/client'
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";

interface Props {
    session: string;
}

const Dashboard: React.FC<Props> = ({session}) => {

    return (
        <>
            <AppLayout session={session}
                       content={
                <PageContent session={session}/>
            }
            />
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    if (!session) {
        res.writeHead(301, {location: '/'})
        res.end()
    }

    return {
        props: {
            session,
        },
    };
};

export default Dashboard;
