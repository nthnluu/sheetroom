import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {useRouter} from 'next/router'
import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useMutation, useQuery} from "urql";
import {classByJoinCode, createStudentProfile} from "../../lib/graphql/Class";
import {
    getInviteByJoinCodeWithoutSession,
    getInviteByJoinCodeWithSession
} from "../../lib/graphql/Invites";
import AssignmentCard from "../../components/JoinScreen/AssignmentCard";
import ReactGA from "react-ga";
import ClassCard from "../../components/JoinScreen/ClassCard";
import {prepareSubmission} from "../../lib/graphql/Submissions";


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
                if (session.id) {
                    return {
                        type: "assignment_invite_code", query: {
                            query: getInviteByJoinCodeWithSession,
                            variables: {
                                joinCode: joinCode,
                                userId: session.id
                            }
                        }, mutation: prepareSubmission
                    }
                } else {
                    return {
                        type: "assignment_invite_code", query: {
                            query: getInviteByJoinCodeWithoutSession,
                            variables: {
                                joinCode: joinCode
                            }
                        }, mutation: prepareSubmission
                    }
                }

            default:
                return "invalid"
        }
    }

    // @ts-ignore
    const [result] = useQuery(inviteType(joinCode).query)

    // @ts-ignore
    const [joinClassResult, joinClass] = useMutation(inviteType(joinCode).mutation)


    const {fetching, data, error} = result

    if (error) {
        console.log(error)
        ReactGA.event({
            category: 'Error',
            action: 'Join Code Fetch Error (GraphQL QUERY)',
            // @ts-ignore
            label: error
        })

        return <JoinCode session={session}/>
    }

    if (fetching) {
        return (<div>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
            </div>
        </div>)
    } else {
        switch (joinCode.length) {
            case(9):
                if (data.classes_class[0]) {
                    if (session) {
                        const studentsInClass = data.classes_class[0].studentProfiles.map(profile => (profile.user ? profile.user.id : null))
                        if (studentsInClass.includes(session ? session.id : null) || data.classes_class[0].created_by === session.id) {
                            return (
                                <div className="text-center px-8">
                                    <img src="/a-ok-monochrome.svg" className="h-64 md:h-96 mb-8 mx-auto" alt=""/>
                                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">You've
                                        already
                                        joined {data.classes_class[0].title}</h1>
                                    <h2 className="text-sm sm:text-lg md:text-xl font-light text-gray-600 max-w-md mx-auto">You're
                                        signed in as {session.email}.<br/> If this isn't you, you can <a href="#"
                                                                                                         className="underline text-gray-700 hover:text-blue-600 font-semibold">switch
                                            accounts.</a></h2>
                                    <button type="button"
                                            onClick={() => window.location.href = "/class/" + data.classes_class[0].id}
                                            className="inline-flex mt-4 items-center px-8 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                        Continue
                                    </button>
                                </div>
                            )
                        } else {
                            return (<ClassCard course={data.classes_class}/>)
                        }
                    } else {
                        return <ClassCard course={data.classes_class[0]}/>
                    }
                }
            case(8):
                let element;
                if (data.assignments_invite[0]) {
                    element = <><AssignmentCard
                        data={data.assignments_invite[0]} onStart={() => {
                        joinClass({inviteId: data.assignments_invite[0].id})
                            .then(result => window.location.href = "/view/" + result.data.prepareSubmission.id)
                    }

                    }/></>
                } else {
                    element = <JoinCode session={session}/>
                }
                return element
            default:
                return <JoinCode session={session}/>

        }


    }

}

const JoinCode = ({session}) => {
    return (<div className="text-center max-w-sm mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Enter your join code</h1>
        {/*//@ts-ignore*/}
        <form onSubmit={event => {
            event.preventDefault();
            //@ts-ignore
            window.location.href = '/join/' + event.target.joincode.value
        }}>
            <div>
                <label htmlFor="joincode" className="sr-only">Join Code</label>
                <div className="relative rounded-lg shadow-sm mt-4">
                    <input id="joincode"
                           className="form-input block w-full text-xl sm:text-2xl sm:leading-5 p-3 text-center placeholder-gray-200"
                           placeholder="42069RAWRXD"/>
                </div>
            </div>
            <button type="submit"
                    className="items-center w-full mt-6 px-3 py-3 border border-transparent leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                Continue
            </button>
        </form>


    </div>)
}

const JoinPage = ({session}) => {
    const router = useRouter()
    const {joinCode} = router.query

    return (<div className="h-screen bg-gray-100">
        <Navbar session={session}/>
        <div className="h-full flex justify-center items-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="w-full">
                {joinCode ? <InviteFetch joinCode={joinCode[0]} session={session}/> : <JoinCode session={session}/>}
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
