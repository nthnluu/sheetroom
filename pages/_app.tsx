import '../styles/index.css'
import '../styles/quill.snow.css'
import {ApolloProvider} from '@apollo/react-hooks';
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {Provider} from 'next-auth/client'
import {WebSocketLink} from 'apollo-link-ws';
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import type { AppProps /*, AppContext */ } from 'next/app'

const App = ({Component, pageProps}: AppProps) => {
    const {session} = pageProps;

    const wsLink = process.browser ? new WebSocketLink({
        uri: `ws://api.homework.gg/v1/graphql`,
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    'x-hasura-admin-secret': `Ik"*Aj=ho)P=Ekext"{P$+g@Ua0J'|`
                }
            },
        }
    }) : null;

    const httpLink = createHttpLink({
        uri: '/api/token',
    });

    const link = process.browser ? split(
        // split based on operation type
        ({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    ) : httpLink;

    const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache()
    });

    return <Provider options={{site: process.env.SITE, clientMaxAge: 86400}} session={session}><ApolloProvider
        client={client}>
        <Component {...pageProps} />
    </ApolloProvider></Provider>;
};

export default App;

