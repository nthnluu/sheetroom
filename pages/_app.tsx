import '../styles/index.css'
import "katex/dist/katex.min.css";
import '../styles/quill.bubble.css'
import {Provider as NextAuthProvider} from "next-auth/client";
import type {AppContext, AppProps /*, AppContext */} from 'next/app'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React, {useEffect} from "react";
import WithGraphQL from "../lib/with-graphql";
import {useAnalytics} from "../components/useAnalytics";
import {Router} from "next/router";
import App from "next/app";
import jwt from 'next-auth/jwt'
import axios from 'axios';

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
    const {session} = pageProps;
    const {init, trackPageViewed} = useAnalytics();

    useEffect(() => {
        init("UA-174935077-1");
        trackPageViewed();
        Router.events.on("routeChangeComplete", () => {
            trackPageViewed();
        });
    }, []);


    return <NextAuthProvider session={session}><WithGraphQL session={session}>
        <ThemeProvider theme={MuiTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </WithGraphQL></NextAuthProvider>;
};

export default MyApp;

