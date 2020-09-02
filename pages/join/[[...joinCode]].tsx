import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import {useRouter} from 'next/router'
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useQuery} from "urql";
import AssignmentCard from "../../components/JoinScreen/AssignmentCard";
import ReactGA from "react-ga";
import ClassCard from "../../components/JoinScreen/ClassCard";
import CheckForUser from "../../lib/CheckForUser";
import {fetchJoinCode} from "../../lib/graphql/FetchJoinCode";
import JsonDebugBox from "../../components/JsonDebugBox";


const InviteFetch = ({joinCode, profileData, session}) => {

    // @ts-ignore
    const [result] = useQuery({query: fetchJoinCode, variables: {joinCode: joinCode}})


    const {fetching, data, error} = result

    if (error) {
        console.log(error)
        ReactGA.event({
            category: 'Error',
            action: 'Join Code Fetch Error (GraphQL QUERY)',
            // @ts-ignore
            label: error
        })

        return <JoinCode error/>
    }

    if (fetching) {
        return (<div>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
            </div>
        </div>)
    } else {
        switch (data.processJoinCode.type) {
            case("assignment"):
                if (data.processJoinCode.payload.is_public) {
                    //@ts-ignore
                    return <AssignmentCard inviteId={data.processJoinCode.payload.id}
                                           userAttempts={data.processJoinCode.payload.submissions_aggregate.aggregate.count}
                        firstName={data.processJoinCode.payload.user.first_name}
                        lastName={data.processJoinCode.payload.user.last_name}
                        title={data.processJoinCode.payload.assignmentByAssignment.title} config={data.processJoinCode.payload.config}/>
                } else {
                    if (session) {
                        if (data.processJoinCode.payload.classByClass.studentProfiles.length > 0 || data.processJoinCode.payload.user.id === session.id) {
                            return <><AssignmentCard inviteId={data.processJoinCode.payload.id}
                                                     submissions={data.processJoinCode.payload.submissions.length}
                                                   userAttempts={data.processJoinCode.payload.submissions.length}
                                firstName={data.processJoinCode.payload.user.first_name}
                                lastName={data.processJoinCode.payload.user.last_name}
                                title={data.processJoinCode.payload.assignmentByAssignment.title} config={data.processJoinCode.payload.config}/></>
                        } else {
                            return <JoinCode error/>
                        }
                    } else {
                        return <JoinCode error/>
                    }

                }

            case("class"):
                if (session) {
                    const studentProfileIds = data.processJoinCode.payload.studentProfiles.map(item => item.user.id)
                    if (studentProfileIds.includes(session.id) || data.processJoinCode.payload.user.id === session.id) {
                        window.location.href = '/class/' + data.processJoinCode.payload.id
                        return <></>
                    } else {
                        return <ClassCard classId={data.processJoinCode.payload.id} session={session}
                                          profileData={profileData}
                                          firstName={data.processJoinCode.payload.user.first_name}
                                          lastName={data.processJoinCode.payload.user.last_name}
                                          title={data.processJoinCode.payload.title}/>
                    }
                } else {
                    return <ClassCard classId={data.processJoinCode.payload.id} session={session}
                                      profileData={profileData} firstName={data.processJoinCode.payload.user.first_name}
                                      lastName={data.processJoinCode.payload.user.last_name}
                                      title={data.processJoinCode.payload.title}/>
                }

        }
    }

}

const JoinCode = ({error = false}) => {
    return (<div className="text-center max-w-sm mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Enter your join code</h1>
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
            {error ? <p className="text-sm text-red-500 mt-2">The code you entered was invalid.</p> : null}
        </form>


    </div>)
}


const InviteFetcher = ({joinCode, session, profileData}) => {
    if (!joinCode) {
        return <JoinCode/>
    } else if (joinCode[0].length === 8 || joinCode[0].length === 9) {
        return <InviteFetch session={session} profileData={profileData} joinCode={joinCode[0]}/>
    } else {
        return <JoinCode error/>
    }

}

const JoinPage = ({session, profileData}) => {
    const router = useRouter()
    const {joinCode} = router.query

    return (<div className="h-screen bg-gray-100">
        <Navbar session={session}/>
        <div className="h-full flex justify-center items-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="w-full">
                <InviteFetcher profileData={profileData} session={session} joinCode={joinCode}/>
            </div>
        </div>
    </div>)
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};


export default JoinPage
