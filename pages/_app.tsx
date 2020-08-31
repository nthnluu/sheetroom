import '../styles/index.css'
import "katex/dist/katex.min.css";
import '../styles/quill.bubble.css'
import '../styles/datetimepicker.css'
import {Provider as NextAuthProvider} from "next-auth/client";
import type {AppContext, AppProps /*, AppContext */} from 'next/app'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React, {useEffect} from "react";
import WithGraphQL from "../lib/with-graphql";
import {useAnalytics} from "../components/useAnalytics";
import {Router} from "next/router";
import SimpleModal from "../components/Modals/SimpleModal";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51HM11eI8UDkQvU4dcFBIfj4XvOA97im3W2WjzkzBGtxvaJV33L5txdtFvF0zCGIlbZJx0wu9YDYp7YT7mE7wFrMt00svbOJBLI');

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


    return <Elements stripe={stripePromise}><NextAuthProvider session={session}><WithGraphQL session={session}>
        <ThemeProvider theme={MuiTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </WithGraphQL></NextAuthProvider></Elements>;
};

export default MyApp;

