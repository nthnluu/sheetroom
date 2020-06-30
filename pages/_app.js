import '../styles/index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Provider} from 'next-auth/client'
import {setContext} from "apollo-link-context";


const App = ({Component, pageProps}) => {
    const {session} = pageProps;

    const httpLink = createHttpLink({
        uri: 'http://api.homework.gg/v1/graphql',
    });

    const authLink = setContext((_, {headers}) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token');
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });

    return <Provider options={{site: process.env.SITE, clientMaxAge: 86400}} session={session}><ApolloProvider
        client={client}>
        <Component {...pageProps} />
    </ApolloProvider></Provider>;
};

export default App;

