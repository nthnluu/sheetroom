import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import auth0 from "./utils/auth0";


const httpLink = () => new HttpLink({
    uri: 'https://homework-gg-graphql.herokuapp.com/v1/graphql', // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    fetch,
});

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: httpLink,
        cache: new InMemoryCache().restore(initialState),
    });
}


