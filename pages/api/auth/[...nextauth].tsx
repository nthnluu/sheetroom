import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from "next";
import iToken from "../../../types/token";
import IUser from "../../../types/user";
import ISession from "../../../types/session";
import ReactGA from "react-ga";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const submissionMutation = `
mutation SetStripeId($userPk: Int!, $stripeId: String!) {
  update_users_by_pk(pk_columns: {id: $userPk}, _set: {stripeCustomerId: $stripeId}) {
    __typename
  }
}
`

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
            session.iat = user.iat
            //@ts-ignore
            return Promise.resolve(user);

        },
        jwt: async (token: iToken, user: IUser) => {
            const isSignIn = !user

            if (!isSignIn) {
                token.id = user.id
                //@ts-ignore
                token.name = `${user.firstName} ${user.lastName}`
                //@ts-ignore
                token.accountType = user.accountType
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
        signIn: async (message) => {
            if (message.isNewUser) {
                const customer = await stripe.customers.create({
                    email: message.user.email
                });

                fetch('https://api.sheetroom.com/v1/graphql', {
                    method: 'POST',
                    body: JSON.stringify({ query: submissionMutation, variables: { userPk: message.user.id, stripeId: customer.id } }),
                    headers: { 'Content-Type': 'application/json', 'x-hasura-admin-secret': "HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS" },
                })
                    .then(() => ReactGA.event({
                        category: 'User',
                        action: 'Stripe Account Crated'
                    }))
                    .catch(error => console.log(error))
            }

            ReactGA.event({
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
