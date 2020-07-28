import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const options = {
    debug: false,
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
        }),
    ],

    // A database is optional, but required to persist accounts in a database
    database: {
        type: 'postgres',
        host: "ec2-52-72-65-76.compute-1.amazonaws.com",
        port: 5432,
        username: "rkofrjdyqoidnj",
        password: "5e700ce4e559ae08a4306f70d66e203c9d6933b4afa5990f5766f31b26666c85",
        database: "d2rnd6jboqu0mq",
        synchronize: false,
        ssl: true
    },
    // database: process.env.DATABASE_URL,

    callbacks: {
        // The JWT callback is called any time a token is written to
        jwt: async (token, oAuthProfile) => {
            // * The first argument is the NextAuth.js token.
            // * The second argument is the full profile returned by the Provider.
            //   The second argument is only present on the first write (token)
            //   If tokenId is used (must be supported by the provider) it will be the
            //   the contents of the token from the provider.

            const isSignIn = oAuthProfile ? true : false;

            // Return the object you want to be stored in the token here
            // e.g. `token.auth0 = oAuthProfile`
            token.auth0 = oAuthProfile;
            token.hasura = {
                "x-hasura-default-role": "admin",
                "x-hasura-allowed-roles": ["user", "admin"],
                "x-hasura-user-id": token.user.id.toString(),
            };
            // Note: Try to only store information you need in the JWT to avoid the
            // cookie size growing too large (should not exceed 4KB)
            return Promise.resolve(token)
        },
        // The session callback is called before a session object is returned to the client
        session: async (session, token) => {
            // The first object is the default session contents that is returned
            // The second object is the NextAuth.js JWT (aways passed if JWT enabled)
            session.userId = token.user.id;
            session.isDisabled = token.user.isDisabled;
            session.tenant = token.user.tenant;
            session.oAuthProfile = token.auth0;

            // As with the JWT, you can add properties to the 'session' object
            // from the 'token' here (e.g. `session.someProperty = token.someProperty`)
            return Promise.resolve(session)
        },
    },

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: process.env.SECRET, // Secret auto-generated if not specified.

        // By default the JSON Web Token is signed with SHA256 and encrypted with AES.
        //
        // You can define your own encode/decode functions for signing + encryption if
        // you want to override the default behaviour (or to add/remove information
        // from the JWT when it is encoded).
        // encode: async ({ secret, key, token, maxAge }) => {
        //     if (maxAge) {
        //         if (token.iat) { delete token.iat }
        //         if (token.exp) { delete token.exp }
        //     }
        //     const signedToken = jwt.sign(token, secret, { expiresIn: maxAge });
        //     const encryptedToken = CryptoJS.AES.encrypt(signedToken, key).toString();
        //     return encryptedToken
        // },
        // decode: async ({ secret, key, token, maxAge }) => {
        //     if (!token) return null;
        //     const decryptedBytes = CryptoJS.AES.decrypt(token, key);
        //     const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
        //     const verifiedToken = jwt.verify(decryptedToken, secret, { maxAge });
        //     return verifiedToken
        // },
    }
};

export default (req, res) => NextAuth(req, res, options)
