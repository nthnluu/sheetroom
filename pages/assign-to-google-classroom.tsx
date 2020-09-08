import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import InviteSettings from "../components/Modals/InviteSettings";
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import {useMutation} from "urql";
import {createInvite} from "../lib/graphql/Invites";
import {nanoid} from "nanoid";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import JsonDebugBox from "../components/JsonDebugBox";

const AssignToGoogleClassroom = ({profileData, session}) => {
    const router = useRouter()
    const {assignmentId, gclass, gClass1, gClass2, title} = router.query
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [classList, setClassList] = useState()
    const [googleClassId, setGoogleClassId] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, toggleLoading] = useState(false)
    const [error, setError] = useState(null)

    const getStudentInfo = () => {
        fetch("https://classroom.googleapis.com/v1/courses", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gclass}`
            }
        })
            .then(result => result.json())
            .then(json => setClassList(json))
    }

    useEffect(() => {
        if (gclass) {
            getStudentInfo()
        }
    }, [gclass])

    const defaultConfig = {
        "g_class_title": title,
        "g_class_desc": undefined,
        "g_class_points": undefined,
        "dueDateEnabled": false,
        "dueDate": new Date(),
        "multipleAttempts": false,
        "multipleAttemptsScoring": "1",
        "allowedAttempts": "1",
        "restrictResults": false,
        "hideScore": false,
        "hideUntilLastAttempt": true,
        "collectStudentInfo": false,
        "collectStudentName": false,
        "collectEmail": false,
        "collectId": false,
        "disablePaste": false,
        "disableTextSelect": false,
        "submitOnLeave": false
    }
    const [settingsObject, setSettingsObject] = useState(defaultConfig)
    const [createInviteResult, createNewInvite] = useMutation(createInvite);


    const selectedDueDate = new Date(settingsObject.dueDate)

    const newGoogleClasswork = {
        "title": settingsObject.g_class_title,
        "description": settingsObject.g_class_desc,
        "workType": "ASSIGNMENT",
        "state": "PUBLISHED",
        "maxPoints": parseInt(settingsObject.g_class_points),
        "materials": [
            {
                "link": {
                    "url": "https://sheetroom.com/api/google-classroom/auth-student?joinCode=" + newInviteCode,
                    "title": title,
                    "thumbnailUrl": "https://sheetroom.s3.amazonaws.com/sheetroom-pro.png"
                }
            }
        ]
    }
    const newGoogleClassworkDueDate = {
        "title": settingsObject.g_class_title,
        "description": settingsObject.g_class_desc,
        "workType": "ASSIGNMENT",
        "state": "PUBLISHED",
        "maxPoints": parseInt(settingsObject.g_class_points),
        "materials": [
            {
                "link": {
                    "url": "https://sheetroom.com/api/google-classroom/auth-student?joinCode=" + newInviteCode,
                    "title": title,
                    "thumbnailUrl": "https://sheetroom.s3.amazonaws.com/sheetroom-pro.png"
                }
            }
        ],
        "dueDate": {
            "year": selectedDueDate.getFullYear(),
            "month": selectedDueDate.getMonth(),
            "day": selectedDueDate.getDate()
        },
        "dueTime": {
            "hours": selectedDueDate.getHours(),
            "minutes": selectedDueDate.getMinutes(),
            "seconds": selectedDueDate.getSeconds()
        },
    }

    const newInvite = () => {
        toggleLoading(true)

        const startFlow = () => {
            fetch(`https://classroom.googleapis.com/v1/courses/${googleClassId}/courseWork`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gclass}`
                },
                body: JSON.stringify(settingsObject.dueDateEnabled ? newGoogleClassworkDueDate : newGoogleClasswork)
            })
                .then(result => result.json())
                .then(json => {
                    if (json.id && json.courseId) {
                        createNewInvite({
                            code: newInviteCode,
                            userId: session.id,
                            assignmentId: assignmentId,
                            isPublic: true,
                            settingsObject: JSON.stringify(settingsObject),
                            isGoogleClass: true,
                            googleClassConfig: JSON.stringify({
                                courseworkId: json.id,
                                courseId: json.courseId,
                                credentials: {
                                    gclass: gclass,
                                    gClass1: gClass1,
                                    gClass2: gClass2
                                }
                            })
                        })
                            .then(result => window.location.href = '/invite/' + result.data.insert_assignments_invite_one.id)
                    }

                })
        }


        if (settingsObject.dueDateEnabled) {
            if (moment(settingsObject.dueDate).isBefore(moment())) {
                setError(true)
            } else {
                startFlow()
            }
        } else {
            startFlow()
        }


    }
    return (<>
        <Navbar unfixed session={session}/>
        {/*<JsonDebugBox content={newGoogleClassworkDueDate}/>*/}
        <div className="max-w-lg mx-auto mt-32 px-4">
            {currentPage === 0 ? <>
                <h1 className="text-center text-3xl font-semibold mb-4">Select a class</h1>
                <ul className="space-y-2">
                    {/*@ts-ignore*/}
                    {classList ? classList.courses.map(classItem => <button key={classItem.id}
                                                                            onClick={() => {
                                                                                setGoogleClassId(classItem.id)
                                                                                setCurrentPage(1)
                                                                            }}
                                                                            className="w-full p-3 form-input justify-between items-center flex font-medium shadow-sm rounded-lg text-left">

                        <div className="text-lg">{classItem.name}<span
                            className="font-light ml-2 text-gray-500">{classItem.section}</span></div>
                        <div>
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                    </button>) : null}
                </ul>
            </> : <>
                <h1 className="text-center text-3xl font-semibold mb-6">Post your assignment</h1>
                <div>
                    {/*@ts-ignore*/}
                    <InviteSettings session={session} isPublic={true} standalone={true} googleClass profileData={profileData} settingsObject={settingsObject}
                                    setSettingsObject={setSettingsObject}/>
                </div>
                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button type="submit" onClick={() => newInvite()} disabled={isLoading}
                                className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                            {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Post Assignment
                        </button>
                    </span>
                    {error ?
                        <p className="text-sm text-red-500 text-center mt-1">Set a due date in the future</p> : null}
                </div>
            </>}

        </div>
    </>)
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};

export default AssignToGoogleClassroom
