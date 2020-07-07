import React, {useState} from 'react';
import {getSession} from 'next-auth/client'
import AppLayout from "../Components/AppLayout";
import QuizList from "../Components/Lists/QuizList";
import CourseCards from "../Components/GridLists/CourseCards";

const PageContent = ({userId}) => {

    return (
        <>
            <CourseCards header="My Classes" userId={userId}/>
            <QuizList userId={userId}/>
        </>
    )
};

const Dashboard = ({session}) => {
    return (
        <>
            <AppLayout sidebar={1} title="Dashboard" content={<PageContent userId={session.userId}/>} newButton windowTitle="Dashboard"/>
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
            return;
        } else {
            return {session: session, user: session.user}
        }
    }
};


export default Dashboard;
