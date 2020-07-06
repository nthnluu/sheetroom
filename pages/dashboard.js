import React, {useState} from 'react';
import {getSession} from 'next-auth/client'
import AppLayout from "../Components/AppLayout";
import QuizList from "../Components/Lists/QuizList";
import CourseCards from "../Components/GridLists/CourseCards";
import Modal from 'react-modal';
import QuizModal from "../Components/Modals/Modal";


const CreateQuizContent = () => {
    return (<form>
        <div>
            <label htmlFor="title" className="sr-only">Title</label>
            <div className="relative rounded-md shadow-sm">
                <input required id="title" className="form-input block w-full sm:text-sm sm:leading-5"
                       placeholder="Assignment Title"/>
            </div>
        </div>
        <div className="mt-4">
            <label htmlFor="description" className="sr-only">Description</label>
            <div className="relative rounded-md shadow-sm">
                <textarea id="description" className="form-input block w-full sm:text-sm sm:leading-5"
                       placeholder="Description (optional)"/>
            </div>
        </div>
    </form>)
}
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
