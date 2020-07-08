import {getSession} from "next-auth/client";
import AppLayout from "../Components/AppLayout";


const PageContent = ({session}) => {
    return (<div>
        <h1 className="font-medium mb-2 ">Rich Text Editor</h1>
    </div>)
};

const SandboxPage = ({session}) => {
    return (
        <AppLayout content={<PageContent session={session}/>} windowTitle="New Course" title="Component Sandbox"/>)
};

SandboxPage.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
            return {};
        } else {
            return {session: session, user: session.user}
        }
    }
};

export default SandboxPage
