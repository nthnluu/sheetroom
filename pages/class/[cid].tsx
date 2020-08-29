import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import PageLayout from "../../components/ClassPage/PageLayout";
import React from "react";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery, useSubscription} from "urql";
import {classByPk} from "../../lib/graphql/Class";
import ClassContext from "../../components/ClassPage/ClassContext";
import CheckForUser from "../../lib/CheckForUser";


const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="pt-56">
            <Head>
                <title>Sheetroom</title>
            </Head>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
            </div>

        </div>
    )
};


const ClassPage = ({session, profileData}) => {
    const router = useRouter();
    const {cid} = router.query;

    const handleSubscription = (messages = [], response) => {
        return response;
    };

    const [result] = useSubscription({query: classByPk, variables: {classId: cid}}, handleSubscription)
    const {data, fetching, error} = result

    if (fetching && !data) {
        return <LoadingPlaceholder/>
    } else {
        return <PageLayout session={session} profileData={profileData} course={data.classes_class_by_pk}/>
    }
}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};


export default ClassPage
