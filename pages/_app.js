import '../styles/index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";
import auth0 from "../utils/auth0";

const App = ({Component, pageProps}) => {

    return <ApolloProvider client={apolloClient()}>
        <Component {...pageProps} />
    </ApolloProvider>;
};

// App.getInitialProps = async ({ req, res }) => {
//     if (typeof window === 'undefined') {
//         const session = await auth0.getSession(req);
//         if (!session || !session.user) {
//             return {token: undefined};
//         } else {
//             const tokenCache = await auth0.tokenCache(req, res);
//             const { accessToken } = await tokenCache.getAccessToken();
//             return {token: accessToken };
//         }
//     }
// };

export default App;

