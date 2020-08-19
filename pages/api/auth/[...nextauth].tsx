import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from "next";
import iToken from "../../../types/token";
import IUser from "../../../types/user";
import ISession from "../../../types/session";
import ReactGA from "react-ga";



const options = {
    debug: false,
    secret: process.env.NEXT_AUTH_SECRET,
    site: process.env.SITE || 'http://localhost:3000',

    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ],
    database: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: false,
        ssl: {
            rejectUnauthorized: false
        }
    },
    callbacks: {
        session: async (session: ISession, user: IUser) => {
            //@ts-ignore
            return Promise.resolve(user);
        },
        jwt: async (token: iToken, user: IUser) => {
            const isSignIn = !user

            if (!isSignIn) {
                token.id = user.id
                //@ts-ignore
                token.name = `${user.firstName} ${user.lastName}`
                token['X-Hasura-User-Id'] = user.id.toString()
                token['X-Hasura-Role'] = "user"
                token['X-Hasura-Allowed-Roles'] = ["user"]
            }

            return Promise.resolve(token);
        },
    },
    session: {
        jwt: true,
    },
    jwt: {
        secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
    },
    events: {
        signIn: async (message) => { ReactGA.event({
            category: 'User',
            action: 'Signed in'
        }) },
    },
    pages: {
        signIn: '/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/7747278844', // (used for check email message)
        newUser: '/welcome' // If set, new users will be directed here on first sign in
    }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth
