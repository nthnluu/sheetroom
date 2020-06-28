import Navbar from "../Components/Navbar/Navbar";
import React from 'react';
import auth0 from "../utils/auth0";
import Dashboard from "./dashboard";

const Index = ({user}) => {
    const navBarItems = {
        links: [{label: 'Features'}, {label: 'About us'}, {label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up', href: '/api/login'}, secondary: {label: 'Log in', href: '/api/login'}}
    };

    return (
        <>
            <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons}/>
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900">Online
                        assignments that just work
                    </h1>
                </header>
            </div>
        </>
    )
};

Index.getInitialProps = async ({req, res}) => {
    if (typeof window === 'undefined') {
        const session = await auth0.getSession(req);
        if (!session || !session.user) {
            return {user: 'not authenticated'};
        } else {
            res.writeHead(302, {
                Location: '/dashboard'
            });
            res.end();
            return;
        }


    }
};

// export default withApollo({ ssr: true })(Index);
export default Index;


