import '../styles/index.css'
import '../styles/quill.bubble.css'
import {Provider as NextAuthProvider} from "next-auth/client";
import type {AppContext, AppProps /*, AppContext */} from 'next/app'
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import React from "react";
import WithGraphQL from "../lib/with-graphql";

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

    return <NextAuthProvider session={session}><WithGraphQL session={session}>
        <ThemeProvider theme={MuiTheme}>

            <Component {...pageProps} />
        </ThemeProvider>
    </WithGraphQL></NextAuthProvider>;
};


export default MyApp;

