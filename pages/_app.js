import '../styles/index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";
import UserContext, {UserContextProvider, UserProvider} from "../Components/AuthProvider";
import Cookies from 'js-cookie';


function App({Component, pageProps}) {

    const token = Cookies.get("homework.AuthToken");
    const refreshToken = Cookies.get("homework.RefreshToken");
    const createdToken = Cookies.get("homework.AuthTokenCreated");

    return <ApolloProvider client={apolloClient()}>
        <UserContextProvider token={token} refreshToken={refreshToken} createdToken={createdToken} children={<Component {...pageProps} />}/>
    </ApolloProvider>;
}

export default App;

