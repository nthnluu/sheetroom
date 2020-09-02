import React from 'react';
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";
import CheckForUser from "../lib/CheckForUser";
import Head from "next/head";
import {useQuery} from "urql";
import {getSubmissionWithScore} from "../lib/graphql/Submissions";
import {proStats} from "../lib/graphql/User";
import JsonDebugBox from "../components/JsonDebugBox";


interface Props {
    session: any;
    profileData: any;
}

const Dashboard: React.FC<Props> = ({session, profileData}) => {

    const [result] = useQuery({query: proStats, variables: {userId: session.id}})
    const {data, fetching, error} = result

    if (fetching) {
        return <></>
    } else {
        return (
            <>
                <Head>
                    <title>Dashboard | Sheetroom</title>
                </Head>

                <AppLayout session={session} profileData={profileData}
                           content={<PageContent session={session} proData={data} profileData={profileData}/>}

                />

            </>
        )
    }

};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};


export default Dashboard;
