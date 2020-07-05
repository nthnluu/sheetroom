import React, {useState} from 'react';
import {getSession} from 'next-auth/client'
import AppLayout from "../Components/AppLayout";
import QuizList from "../Components/Lists/QuizList";
import CourseCards from "../Components/GridLists/CourseCards";
import CreateQuizModal from "../Components/Modals/CreateQuizModal";


const PageContent = ({userId}) => {

    return (
        <>
            <CourseCards header="My Classes" userId={userId}/>
            <QuizList userId={userId}/>
        </>
    )
};

const Dashboard = ({session}) => {
    const [activeModal, setActiveModal] = useState(0);

    return (
        <>
            <CreateQuizModal isOpen={activeModal === 1} setModal={(index)=>setActiveModal(index)}/>
            <AppLayout setModal={(index)=>setActiveModal(index)} sidebar={1} title="Dashboard" content={<PageContent userId={session.userId}/>} newButton/>
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
