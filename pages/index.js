import Navbar from "../Components/Navbar/Navbar";
import Cookie from "js-cookie";
import {ME, REFRESH_TOKEN} from "../gql/getUser";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {ALL_ASSIGNMENTS} from "../gql/allAssignments";
import { useSession } from 'next-auth/client'


const Index = () => {
    const [ session, loading ] = useSession()

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
                        {JSON.stringify(data)}
                    </h1>
                </header>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
