import '../styles/index.css'
import '../styles/quill.snow.css'
import {ApolloProvider} from '@apollo/react-hooks';
import {createHttpLink} from "apollo-link-http";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getSession} from 'next-auth/client'
import { Provider as NextAuthProvider } from "next-auth/client";
import {WebSocketLink} from 'apollo-link-ws';
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import type {AppContext, AppProps /*, AppContext */} from 'next/app'
import {GetServerSideProps} from "next";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import CryptoJS from "crypto-js";
import App from 'next/app'
import jwt from 'next-auth/jwt'

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
        <NextAuthProvider session={session}>
            <ApolloProvider
                client={client}>
                <Component {...pageProps} />
            </ApolloProvider></NextAuthProvider></ThemeProvider>;
};





export default MyApp;

