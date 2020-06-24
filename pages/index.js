import Navbar from "../Components/Navbar/Navbar";
import Cookie from "js-cookie";


const Index = () => {
    const token = Cookie.get("homework.authToken");
    const refreshToken = Cookie.get("homework.refreshToken");

    function verifyToken() {
        return;
    }

    function refreshTokenAuth() {
        return;
    }

    if (token) {
        //deal with token
        verifyToken();
    } else {
        if (refreshToken) {
            //deal with refresh token
            refreshTokenAuth();
        } else {
            //user is not logged in

        }
    }

    // const {loading, error, data} = useQuery(ALL_ASSIGNMENTS);
    // if (error) return <h1>{error.message}</h1>;
    // if (loading) return <h1>Loading...</h1>;


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
                        assignments that just work</h1>
                </header>
            </div>
        </>
    )
};

// export default withApollo({ ssr: true })(Index);
export default Index;
