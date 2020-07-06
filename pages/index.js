import Navbar from "../Components/Navbar/Navbar";
import React from 'react';
import { getSession } from 'next-auth/client';
import RichTextEditor from "../Components/Editor/RichTextEditor";

const Index = ({user, session}) => {
    const navBarItems = {
        links: [{label: 'Features'}, {label: 'About us'}, {label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up', href: '/api/login'}, secondary: {label: 'Log in', href: '/api/auth/signin'}}
    };
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900 leading-tight">Online assignments that just work
                    </h1>
                    <RichTextEditor/>
                </header>
            </div>
        </>
    )
};

Index.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            return {session: 'annonymous'}
        } else {
            res.writeHead(302, {
                Location: '/dashboard'
            });
            res.end();
            return;
        }
    }
};

// export async function getServerSideProps({req, res}) {
//     if (typeof window === 'undefined') {
//         const session = await getSession(req);
//         if (!session || !session.user) {
//             return {props: {user: 'not authenticated'}};
//         } else {
//             res.writeHead(302, {
//                 Location: '/dashboard'
//             });
//             res.end();
//             return;
//         }
//     }
// };

export default Index;


