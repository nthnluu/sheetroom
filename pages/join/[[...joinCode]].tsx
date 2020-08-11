import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {useRouter} from 'next/router'
import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import JsonDebugBox from "../../components/JsonDebugBox";
import {useMutation, useQuery} from "urql";
import {classByJoinCode, createStudentProfile} from "../../lib/graphql/Class";
import {getInviteByJoinCode} from "../../lib/graphql/Invites";



const InviteFetch = ({joinCode, session}) => {

    function inviteType(code) {
        switch (code.length) {
            case(9):
                return {
                    type: "class_invite_code", query: {
                        query: classByJoinCode,
                        variables: {
                            joinCode: joinCode
                        }
                    }, mutation: createStudentProfile
                }
            case(8):
                return {
                    type: "assignment_invite_code", query: {
                        query: getInviteByJoinCode,
                        variables: {
                            joinCode: joinCode
                        }
                    }, mutation: createStudentProfile
                }
            default:
                return "invalid"
        }
    }

    // @ts-ignore
    const queryObject = inviteType(joinCode).query
    const [result] = useQuery(queryObject)

    // @ts-ignore
    const [joinClassResult, joinClass] = useMutation(inviteType(joinCode).mutation)


    const {fetching, data} = result
    if (fetching) {
        return (<div>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
            </div>
        </div>)
    } else {
        return (
            <>
                {data.classes_class ? <div className="border border-gray-200 bg-white rounded-lg shadow-sm h-64 p-12 w-full text-center">
                    <div>
                        <h2 className="font-medium text-lg">{data.classes_class[0].user.name}</h2>
                    </div>
                    <h2 className="font-light">has invited you to join</h2>
                    <h2 className="font-semibold text-3xl">{data.classes_class[0].title}</h2>

                    {session ? <button type="button" onClick={() => joinClass({
                        studentId: session.id,
                        classId: data.classes_class[0].id
                    })
                        .then(() => window.location.href = "/class/" + data.classes_class[0].id)
                    }
                                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Continue
                    </button> : <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-5 text-gray-700">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="email" className="form-input block w-full sm:text-sm sm:leading-5"
                                   placeholder="you@example.com"/>
                        </div>
                    </div>
                    }

                </div> : null}
                {data.assignments_invite ? <div className="border border-gray-200 bg-white rounded-lg shadow-sm  p-12 w-full text-left">
                    <div className="mb-6">
                        <h2 className="font-semibold text-3xl">{data.assignments_invite[0].assignmentByAssignment.title}</h2>
                        <h2 className="font-light text-gray-600 text-lg">Assigned by {data.assignments_invite[0].assignmentByAssignment.user.name}</h2>
                    </div>


                    {session ? <button type="button" onClick={() => joinClass({
                        studentId: session.id,
                        classId: data.assignments_invite[0].id
                    })
                        .then(() => window.location.href = "/class/" + data.assignments_invite[0].id)
                    }
                                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                        Start
                    </button> : <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-5 text-gray-700">Email</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="email" className="form-input block w-full sm:text-sm sm:leading-5"
                                   placeholder="you@example.com"/>
                        </div>
                    </div>
                    }

                </div> : null}

            </>
        )
    }

}


const JoinCode = ({session}) => {
    return (<div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Enter your join code</h1>
        <div>
            <label htmlFor="join-code" className="sr-only">Join Code</label>
            <div className="relative rounded-lg shadow-sm mt-4">
                <input id="join-code"
                       className="form-input block w-full text-xl sm:text-2xl sm:leading-5 p-3 text-center placeholder-gray-200"
                       placeholder="42069RAWRXD"/>
            </div>
        </div>
        <button type="button"
                className="items-center w-full mt-6 px-3 py-3 border border-transparent leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            Continue
        </button>

    </div>)
}

const JoinPage = ({session}) => {
    const router = useRouter()
    const {joinCode} = router.query

    const [isSearching, toggleIsSearching] = useState(false);

    return (<div className="h-screen bg-gray-100">
        <Navbar session={session}/>
        <div className="h-full flex justify-center items-center max-w-xl mx-auto">
            {joinCode ? <InviteFetch joinCode={joinCode[0]} session={session}/> : <JoinCode session={session}/>}


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
