import fetch from "isomorphic-unfetch";
import { Client, defaultExchanges, subscriptionExchange, Provider } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ws from "isomorphic-ws";
import { ReactNode } from "react";
import session from "../types/session";

const WithGraphQL = ({
                         session,
                         children,
                     }: {
    session: session;
    children: ReactNode;
}) => {
    const userIdInString = session ? (session.id ? session.id.toString() : 'annon') : 'anon';

    const subscriptionClient = new SubscriptionClient(
        process.env.NEXT_PUBLIC_WS_URL || "ws://api.homework.gg/v1/graphql",
        {
            reconnect: true,
            connectionParams: {
                headers: { "X-Hasura-User-Id": userIdInString, "X-Hasura-Admin-Secret": "HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS" },
            },
        },
        ws
    );

    const client = new Client({
        url: process.env.NEXT_PUBLIC_API_URL || "http://api.homework.gg/v1/graphql",
        fetch,
        fetchOptions: {
            headers: { "X-Hasura-User-Id": userIdInString, "X-Hasura-Admin-Secret": "HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS" },
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
