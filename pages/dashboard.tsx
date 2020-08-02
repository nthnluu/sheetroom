import React from 'react';
import {getSession} from 'next-auth/client'
import {GetServerSideProps} from "next";
import PageContent from "../Components/Dashboard/Content";
import AppLayout from "../Components/PageLayouts/AppLayout/AppLayout";

interface Props {
    session: Session;
}

const Dashboard: React.FC<Props> = ({session}) => {

    return (
        <>
            <AppLayout session={session} content={<PageContent session={session}/>}/>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            context.res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            context.res.end();

        } else {
            return {props: {session: session, user: session.user}}
        }
    }
};


export default Dashboard;
