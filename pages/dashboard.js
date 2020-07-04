import React, {useState} from 'react';
import AdminPageLayout from "../Components/AdminPageLayout";
import gql from "graphql-tag";
import {getSession} from 'next-auth/client'
import {useQuery} from '@apollo/react-hooks';
import Transition from "../Components/Transition";
import NewNavbar from "../Components/Navbar/NewNavbar";
import AppLayout from "../Components/AppLayout";
import SimpleCards from "../Components/GridLists/SimpleCards";
import QuizList from "../Components/Lists/QuizList";

const QUIZZES = gql`
query Quizzes($userId: Int!){
  quiz(where: {created_by: {_eq: $userId}}) {
    id,
    title,
    description
  }
}
`;

const PageContent = () => {
    return (
        <>
            <SimpleCards header="Pinned Cards"/>
            <QuizList/>
        </>
    )
}

const Dashboard = ({user, session}) => {
    const userId = session.userId;

    return (
        <AppLayout sidebar={1} title="Dashboard" content={PageContent()}/>
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
