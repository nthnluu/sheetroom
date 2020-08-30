import React, {useState} from "react";
import {useMutation} from "urql";
import {createStudentProfile} from "../../lib/graphql/Class";
import CircularProgress from "@material-ui/core/CircularProgress";


interface Props {
    firstName: string;
    lastName: string;
    title: string;
    classId: string;
    session: any;
    profileData: any;
}

const ClassCard: React.FC<Props> = ({firstName, lastName, title, classId, session, profileData}) => {
    const [mutateStudentProfileResult, mutateStudentProfile] = useMutation(createStudentProfile)
    const [isLoading, toggleLoading] = useState(false)

    return <div className="p-6 bg-white shadow rounded-lg">
        <h1 className="text-gray-400">{firstName} {lastName} invited you to join</h1>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        <div className="flex-row md:flex justify-end items-center mt-4 ">
            {profileData.data.users_by_pk.account_type === "teacher" ?  <p className="mb-1 md:mb-0 text-center text-red-500 px-2 py-1 border rounded-lg border-red-500"><i
                className="fas fa-exclamation-circle mr-1"/><a className="underline" href="/settings">Change to a student account</a> to join this class</p>:<button type="button" disabled={isLoading} onClick={() => {
                    toggleLoading(true)
                    mutateStudentProfile({studentId: session.id, classId: classId})
                        .then(result => window.location.href = "/class/"+classId)
                        .catch(() => toggleLoading(false))
                        .catch(error => console.log(error))
                }}
                                                                                className="w-full md:w-auto items-center justify-center flex px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Join class
            </button>}

        </div>
    </div>
}

export default ClassCard
