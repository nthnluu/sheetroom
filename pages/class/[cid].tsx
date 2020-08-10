import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import PageLayout from "../../components/ClassPage/PageLayout";



const ClassPage = ({session}) => {
    const router = useRouter();
    const {cid} = router.query;

    return <PageLayout session={session}/>
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req});

    return {
        props: {
            session,
        },
    };
};

export default ClassPage
