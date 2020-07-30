import React, {useState} from 'react';
import {getSession} from 'next-auth/client'
import AppLayout from "../Components/AppLayout";
import QuizList from "../Components/Lists/QuizList";
import CourseCards from "../Components/GridLists/CourseCards";
import PageLayout from "../Components/PageLayout";


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
            <PageLayout/>
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
