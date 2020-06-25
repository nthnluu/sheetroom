import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';


const httpLink = new HttpLink({
    uri: 'https://homework-gg-backend.herokuapp.com/graphql', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
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
