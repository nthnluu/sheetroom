import fetch from "isomorphic-unfetch";
import {Client, defaultExchanges, subscriptionExchange, Provider} from "urql";
import {SubscriptionClient} from "subscriptions-transport-ws";
import ws from "isomorphic-ws";
import {ReactNode} from "react";
import session from "../types/session";
import jwt from "jsonwebtoken";

const WithGraphQL = ({
                         session,
                         children,
                     }: {
    session: session;
    children: ReactNode;
}) => {
    const userIdInString = session ? (session.id ? session.id.toString() : 'annon') : 'anon';
    const secret = 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'

    const payload = {
        "https://hasura.io/jwt/claims": {
            "X-Hasura-User-Id": userIdInString,
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user"]
        }
    }

    if (session) {
        //@ts-ignore
        payload.iat = session.iat
    }

    const newToken = jwt.sign(payload, secret)


    const subscriptionClient = new SubscriptionClient(
        process.env.NEXT_PUBLIC_WS_URL || "ws://api.sheetroom.com/v1/graphql",
        {
            reconnect: true,
            connectionParams: {
                headers: session ? {Authorization: `Bearer ${newToken}`} : undefined
            },
        },
        ws
    );

    const client = new Client({
        url: process.env.NEXT_PUBLIC_API_URL || "http://api.sheetroom.com/v1/graphql",
        fetch,
        fetchOptions: {
            headers: session ? {Authorization: `Bearer ${newToken}`} : undefined

        },
        requestPolicy: "cache-and-network",
        exchanges: [
            ...defaultExchanges,
            subscriptionExchange({
                forwardSubscription(operation) {
                    return subscriptionClient.request(operation);
                },
            }),
        ],
    });

    return <Provider value={client}>{children}</Provider>;
};

export default WithGraphQL;
