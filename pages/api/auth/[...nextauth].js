import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    debug: true,
    site: process.env.SITE || 'http://localhost:3000',

    // Configure one or more authentication providers
    providers: [
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
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
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
        synchronize: true,
        ssl: true
    },
    // database: process.env.DATABASE_URL,

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
    }
}

export default (req, res) => NextAuth(req, res, options)
