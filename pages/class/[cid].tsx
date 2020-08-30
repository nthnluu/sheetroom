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

const ErrorScreen = () => {
    // window.location.href = '/dashboard'
    return (<div className="pt-56">
        <Head>
            <title>Sheetroom</title>
        </Head>
        <div className="mx-auto p-3">

            <img className="h-36 mx-auto text-center" src="https://i.imgur.com/jZR71Ox.png"/>
            <h1 className="text-center text-gray-600 mt-6 text-lg font-semibold">Sorry, the class you're looking
                for does not exist.</h1>
            <h1 className="text-center text-gray-400 mt-2 text-sm">Make sure this class exists and you've joined it.</h1>
            <div className="w-full mt-8">
                <button type="button" onClick={() => window.location.href = "/dashboard"}
                        className="mx-auto block items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                    <i className="fas fa-chevron-left mr-2"/>Back to dashboard
                </button>
            </div>

        </div>

    </div>)
}


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
        if (data.classes_class_by_pk) {
            return <PageLayout courseId={cid} session={session} profileData={profileData} course={data.classes_class_by_pk}/>
        } else {
            return <ErrorScreen/>
        }

    }
}


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};


export default ClassPage
