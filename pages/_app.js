import '../styles/index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";
import auth0 from "../utils/auth0";
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Provider} from 'next-auth/client'

const App = ({Component, pageProps}) => {
    const {session} = pageProps;

    const client = new ApolloClient({
        link: createHttpLink({
            uri: "/api/graph",
            credentials: 'include',
            fetch,
        }),
        cache: new InMemoryCache()
    })


    return <Provider options={{site: process.env.SITE}} session={session}><ApolloProvider client={client}>
        <Component {...pageProps} />
    </ApolloProvider></Provider>;
};

export default App;

