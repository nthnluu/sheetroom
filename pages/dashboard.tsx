import React from 'react';
import {getSession} from 'next-auth/client'
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";
import JsonDebugBox from "../components/JsonDebugBox";
import gql from "graphql-tag";

interface Props {
    session: string;
    profileData: any;
}

const Dashboard: React.FC<Props> = ({session, profileData}) => {

    return (
        <>
            <AppLayout session={session}
                       content={<><PageContent session={session}/></>
                       }
            />

        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});


    const me = `
query Me($userId: Int!) {
  users_by_pk(id: $userId) {
    first_name
    last_name
    account_type
    __typename
  }
}
`;

    if (!session) {
        res.writeHead(301, {location: '/'})
        res.end()
    }

    const profileData = await fetch('https://api.sheetroom.com/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS'
        },
        body: JSON.stringify({query: me, variables: {userId: session.id}}),
    })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });

    if (profileData.data.users_by_pk.account_type === "new") {
        res.writeHead(301, {location: '/welcome'})
        res.end()
    }


    return {
        props: {
            session,
            profileData
        },
    };
};

export default Dashboard;
