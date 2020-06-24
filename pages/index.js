import Navbar from "../Components/Navbar/Navbar";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import SecondaryButton from "../Components/Buttons/SecondaryButton";
import {withApollo} from '../libs/apollo';
import {useQuery} from '@apollo/react-hooks';
import {ALL_ASSIGNMENTS} from '../gql/allAssignments';

const Index = () => {
    // const {loading, error, data} = useQuery(ALL_ASSIGNMENTS);
    // if (error) return <h1>{error.message}</h1>;
    // if (loading) return <h1>Loading...</h1>;

    const navBarItems = {
        links: [{label: 'Features'}, {label: 'About us'}, {label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up'}, secondary: {label: 'Log in'}}
    };

    return (
        <>
            <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons}/>
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900">Online
                        assignments that just work</h1>
                    <div className="flex">
                        <div className="mt-1 relative rounded-md shadow-sm flex-grow">
                            <input id="email" className="form-input block w-full sm:text-lg sm:leading-5 py-5"
                                   placeholder="Enter assignment code"/>
                        </div>
                        <PrimaryButton size="lg" color="orange" text="Button A" className="inline-flex"/>
                    </div>

                    <SecondaryButton size="md" color="red" text="Button B"/>
                    <button className="bg-red-50">shadow</button>
                </header>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
