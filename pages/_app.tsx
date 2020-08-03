import '../styles/index.css'
import '../styles/quill.snow.css'
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

    return<WithGraphQL session={session}>
        <ThemeProvider theme={MuiTheme}>
            <NextAuthProvider session={session}>
                <Component {...pageProps} />
            </NextAuthProvider></ThemeProvider>
    </WithGraphQL>;
};


export default MyApp;

