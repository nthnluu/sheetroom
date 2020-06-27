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
            <div className="max-w-6xl mx-auto pt-16 px-4 xl:px-0">
                <header>
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
                                Welcome back,{" " + data.me.firstName}
                            </h2>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <span className="shadow-sm rounded-md">
                                <button type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                    Edit
                                </button>
                            </span>
                            <span className="ml-3 shadow-sm rounded-md">
                                <button type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline-purple focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out">
                                    New Assignment
                                </button>
                            </span>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
