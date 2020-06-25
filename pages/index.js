import Navbar from "../Components/Navbar/Navbar";
import UserContext from "../Components/AuthProvider";
import React, {useContext} from 'react';

const Index = () => {
    const user = useContext(UserContext);

    const navBarItems = {
        links: [{label: 'Features'}, {label: 'About us'}, {label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up', href: '/signup'}, secondary: {label: 'Log in', href: '/login'}}
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
                <p>{user}</p>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
