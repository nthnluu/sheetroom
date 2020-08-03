import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import iToken from "../../../types/token";
import IUser from "../../../types/user";
import ISession from "../../../types/session";


const options = {
    debug: true,
    site: process.env.SITE || 'http://localhost:3000',

    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,

    // A database is optional, but required to persist accounts in a database
    // database: {
    //     type: 'postgres',
    //     host: "ec2-52-72-65-76.compute-1.amazonaws.com",
    //     port: 5432,
    //     username: "rkofrjdyqoidnj",
    //     password: "5e700ce4e559ae08a4306f70d66e203c9d6933b4afa5990f5766f31b26666c85",
    //     database: "d2rnd6jboqu0mq",
    //     synchronize: false,
    //     ssl: true
    // },
    callbacks: {
        session: async (session: ISession, user: IUser) => {
            session.id = user.id;
            return Promise.resolve(session);
        },
        jwt: async (token: iToken, user: IUser) => {
            const isSignIn = !!user;
            if (isSignIn) {
                token.id = user.id;
            }

            return Promise.resolve(token);
        },
    },
    session: {
        jwt: true,
    },
    jwt: {
        encode: async ({ token, secret }: { token: iToken; secret: string }) => {
            const tokenContents = {
                id: token.id,
                name: token.name,
                email: token.email,
                picture: token.picture,
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["admin", "user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": token.id,
                    "x-hasura-admin-secret": "HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS"
                },
                iat: Date.now() / 1000,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                sub: token.id,
            };

            const signOptions = {
                algorithm: "RS256",
            };

            const encodedToken = jwt.sign(
                tokenContents,
                process.env.AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n") || secret,
                // @ts-ignore
                signOptions
            );

            return encodedToken;
        },
        decode: async ({ token, secret }: { token: string; secret: string }) => {
            const signOptions = {
                algorithms: ["RS256"],
            };

            const decodedToken = jwt.verify(
                token,
                process.env.AUTH_PRIVATE_KEY.replace(/\\n/gm, "\n") || secret,
                // @ts-ignore
                signOptions
            );

            return decodedToken;
        },
    },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth
