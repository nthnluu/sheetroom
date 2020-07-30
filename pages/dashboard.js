import React from 'react';
import {getSession} from 'next-auth/client'
import PageLayout from "../Components/PageLayout";


const Dashboard = ({session}) => {
    return (
        <>
            <PageLayout userId={session.userId}/>
        </>
    )
};

Dashboard.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();

        } else {
            return {session: session, user: session.user}
        }
    }
};


export default Dashboard;
