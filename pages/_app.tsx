import '../styles/index.css'
import '../styles/quill.snow.css'
import {ApolloProvider} from '@apollo/react-hooks';
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getSession, Provider} from 'next-auth/client'
import {WebSocketLink} from 'apollo-link-ws';
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import type {AppContext, AppProps /*, AppContext */} from 'next/app'
import {GetServerSideProps} from "next";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import CryptoJS from "crypto-js";
import App from 'next/app'

const MuiTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#1B65F1',
        },
        secondary: {
            main: '#ABABAB',
        },
    },
    typography: {
        fontFamily: [
            'Inter var',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

const MyApp = ({Component, pageProps}: AppProps) => {
    const {session, token} = pageProps;

    console.log(token)
    const wsLink = process.browser ? new WebSocketLink({

        uri: `ws://api.homework.gg/v1/graphql`,
        options: {
            reconnect: true,
            timeout: 30000,
            connectionParams: {
                headers: {
                    Authorization: `Bearer ${token}`
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

    return <ThemeProvider theme={MuiTheme}>
        <Provider options={{site: process.env.SITE, clientMaxAge: 86400}} session={session}>
            <ApolloProvider
                client={client}>
                <Component {...pageProps} />
            </ApolloProvider></Provider></ThemeProvider>;
};

function getCookieValue(cookie, a) {
    var b = cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    try {
        // Get token from cookie (names differ on local vs production)
        const encryptedToken = getCookieValue(appContext.ctx.req.headers.cookie, '__Secure-next-auth.session-token') || getCookieValue(appContext.ctx.req.headers.cookie, 'next-auth.session-token');
        // Decrypt using secret and return as string
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET);
        const newObject = {token: decryptedBytes.toString(CryptoJS.enc.Utf8)}
        appProps.pageProps.token = JSON.stringify(newObject)
    } catch (error) {
        appProps.pageProps.token = undefined
    }


    return {...appProps}
}


export default MyApp;

