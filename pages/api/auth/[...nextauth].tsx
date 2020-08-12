import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from "next";
import iToken from "../../../types/token";
import IUser from "../../../types/user";
import ISession from "../../../types/session";
import ReactGA from "react-ga";
import Adapters from "next-auth/adapters"
import Models from "../../../lib/models";



const options = {
    debug: true,
    secret: process.env.NEXT_AUTH_SECRET,
    site: process.env.SITE || 'http://localhost:3000',

    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Providers.GitHub({
            clientId: "7acf870d9c90d729eb81",
            clientSecret: "55505558a1d8785347d8d02e9cb5eeeb86f616fd"
        })
    ],
    // database: "postgres://rkofrjdyqoidnj:5e700ce4e559ae08a4306f70d66e203c9d6933b4afa5990f5766f31b26666c85@ec2-52-72-65-76.compute-1.amazonaws.com:5432/d2rnd6jboqu0mq"+"?sslmode=require",
    // adapter: Adapters.TypeORM.Adapter(
    //     // The first argument should be a database connection string or TypeORM config object
    //     {
    //         type: 'postgres',
    //         host: "ec2-52-72-65-76.compute-1.amazonaws.com",
    //         port: 5432,
    //         username: "rkofrjdyqoidnj",
    //         password: "5e700ce4e559ae08a4306f70d66e203c9d6933b4afa5990f5766f31b26666c85",
    //         database: "d2rnd6jboqu0mq",
    //         synchronize: true,
    //         ssl: {
    //             rejectUnauthorized: false
    //         }
    //     },
    //     // The second argument can be used to pass custom models and schemas
    //     {
    //         models: {
    //             User: Models.User,
    //         },
    //     }
    // ),
    // A database is optional, but required to persist accounts in a database
    database: {
        type: 'postgres',
        host: "ec2-52-72-65-76.compute-1.amazonaws.com",
        port: 5432,
        username: "rkofrjdyqoidnj",
        password: "5e700ce4e559ae08a4306f70d66e203c9d6933b4afa5990f5766f31b26666c85",
        database: "d2rnd6jboqu0mq",
        synchronize: true,
        ssl: {
            rejectUnauthorized: false
        }
    },
    callbacks: {
        session: async (session: ISession, user: IUser) => {
            return Promise.resolve(user);
        },
        jwt: async (token: iToken, user: IUser) => {
            const isSignIn = !user

            if (!isSignIn) {
                token.id = user.id
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
    }
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth
