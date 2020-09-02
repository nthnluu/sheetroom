import React from 'react';
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";
import Head from "next/head";
import {dashboardMe, me, proStats} from "../lib/graphql/User";
import {getSession} from "next-auth/client";


interface Props {
    session: any;
    profileData: any;
}

const Dashboard: React.FC<Props> = ({session, profileData}) => {

    return (
        <>
            <Head>
                <title>Dashboard | Sheetroom</title>
            </Head>

            <AppLayout session={session} profileData={profileData}
                       content={<PageContent session={session} profileData={profileData}/>}

            />

        </>
    )

};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    let session = await getSession({req});
    let profileData;

    if (session) {
        if (session.id) {
            profileData = await fetch('https://api.sheetroom.com/v1/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS'
                },
                body: JSON.stringify({query: dashboardMe, variables: {userId: session.id}}),
            })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            if (profileData.data.users_by_pk.account_type === "new") {
                res.writeHead(302, {location: '/welcome'})
                res.end()
            } else {
                return {
                    props: {
                        session,
                        profileData
                    },
                };
            }
        } else {
            return {
                props: {
                    session
                },
            };
        }

    } else {
        res.writeHead(302, {location: '/'})
        res.end()
    }
};


export default Dashboard;
