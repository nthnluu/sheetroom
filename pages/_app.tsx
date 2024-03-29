import '../styles/index.css'
import "katex/dist/katex.min.css";
import '../styles/quill.bubble.css'
import '../styles/datetimepicker.css'
import {Provider as NextAuthProvider} from "next-auth/client";
import type {AppProps /*, AppContext */} from 'next/app'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React, {useEffect} from "react";
import WithGraphQL from "../lib/with-graphql";
import {useAnalytics} from "../components/useAnalytics";
import {Router} from "next/router";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import { CloudinaryContext } from "cloudinary-react";
import Head from "next/head";

const stripePromise = loadStripe('pk_live_51HM11eI8UDkQvU4dUPMNb1kEmsBuFORTIxwxfeaGksA0xyPalSLA4SdhXMiCUTlJtxHvjE3eBRhuUYbWIXMWfAoQ00EmQDBG2g');

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


    return <CloudinaryContext cloudName="sheetroom"><Elements stripe={stripePromise}><NextAuthProvider session={session}><WithGraphQL session={session}>
        <ThemeProvider theme={MuiTheme}>
            <Head>
                <title>Sheetroom</title>
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    </WithGraphQL></NextAuthProvider></Elements></CloudinaryContext>;
};

export default MyApp;

