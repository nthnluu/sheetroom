import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {useQuery} from "urql";
import {getInviteByJoinCode} from "../../lib/graphql/Invites";
import JsonDebugBox from "../../components/JsonDebugBox";
import { useRouter } from 'next/router'
import {useState} from "react";


const ReturnedAssignment = ({joinCode}) => {
    const [result] = useQuery({
        query: getInviteByJoinCode,
        variables: {
            // @ts-ignore
            joinCode: joinCode
        }
    });

    const {data, fetching, error} = result;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    return (
        <JsonDebugBox content={data}/>
    );


}

const JoinPage = ({session}) => {
    const router = useRouter()
    const { joinCode } = router.query

    const [isSearching, toggleIsSearching] = useState(false);

    return (<div className="h-screen">
        <Navbar session={session}/>
        <div className="h-full flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Enter your join code</h1>
                <div>
                    <label htmlFor="join-code" className="sr-only">Join Code</label>
                    <div className="relative rounded-lg shadow-sm mt-4">
                        <input id="join-code" defaultValue={joinCode}
                               className="form-input block w-full text-xl sm:text-2xl sm:leading-5 p-3 text-center placeholder-gray-200"
                               placeholder="42069RAWRXD"/>
                    </div>
                </div>
                <button type="button" onClick={() => toggleIsSearching(true)}
                        className="items-center w-full mt-6 px-3 py-3 border border-transparent leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                    Continue
                </button>

            </div>

        </div>
    </div>)
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req});

    return {
        props: {
            session,
        },
    };
};


export default JoinPage
