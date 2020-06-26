import Navbar from "../Components/Navbar/Navbar";
import UserContext from "../Components/AuthProvider";
import React, {useContext} from 'react';
import AuthenticatedNavbar from "../Components/Navbar/AuthenticatedNavbar";
import {useQuery} from "@apollo/react-hooks";
import {ME} from "../gql/authentication";

const Index = () => {
    const user = useContext(UserContext);
    const {loading, error, data} = useQuery(ME, {variables: {token: user}});
    if (loading) return '';
    if (error) return `Error! ${error.message}`;

    const navBarItems = {
        links: [{label: 'Library'}, {label: 'Your Classes'}, {label: 'More'}],
        actionButtons: {primary: {label: 'Sign up', href: '/signup'}, secondary: {label: 'Log in', href: '/login'}}
    };

    return (
        <>
            <AuthenticatedNavbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} token={user}/>
            <div className="max-w-6xl mx-auto pt-24 px-4 xl:px-0">
                <header>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-left font-black text-gray-900">Welcome back,
                        <span className="ml-2">{data.me.firstName}</span>
                    </h1>
                </header>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
