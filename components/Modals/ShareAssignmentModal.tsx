import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {nanoid} from "nanoid";
import {useMutation, useQuery} from "urql";
import {createInvite, getAssignmentInvites} from "../../lib/graphql/Invites";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import InviteSettings from "./InviteSettings";


const ExistingInvitesSection = ({aid}) => {
    const [result] = useQuery({
        query: getAssignmentInvites,
        variables: {
            // @ts-ignore
            assignmentId: aid
        }
    });

    const {fetching, data} = result

    if (fetching) return (
        <>
        </>
    )

    return (
        <>
            {data.assignments_invite.length > 0 ? <>
                <ul className="rounded-lg border border-gray-300 overflow-y-scroll my-2 text-left"
                    style={{maxHeight: '11.1rem'}}>
                    {data.assignments_invite.map((invite, index) => <li key={invite.id}
                                                                        className={"p-3 border-gray-300 leading-tight " + (index === (data.assignments_invite.length - 1) ? null : "border-b")}>
                        <a href={"/invite/" + invite.id}
                           className="font-medium text-gray-700 text-sm hover:text-blue-600 focus:underline">{moment(invite.created_at).format("dddd, MMMM Do YYYY")} ({invite.join_code})</a>
                        <p className="text-sm text-gray-400">
                            {invite.is_google_class ? <>
                                Google Classroom
                            </> : <>{invite.is_public ? <><i
                                className="fas fa-globe-americas mr-1"/>Public</> : `Assigned to ${invite.classByClass ? invite.classByClass.title : "a class"}`}</>}

                        </p>
                    </li>)}
                </ul>
                <h2 className="font-medium text-gray-700 mt-4">Create New Invite</h2></> : null}


        </>
    )
}

const ShareAssignmentModal = ({isOpen, onCancel, session, assignmentId, profileData, title}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const [createInviteResult, createNewInvite] = useMutation(createInvite);
    const [isLoading, toggleLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(undefined)

    const defaultConfig = {
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


    function cancelModal() {
        onCancel();
        toggleLoading(false)
        setSharingSetting("public")
        setSelectedClass(undefined);
        setSettingsObject(defaultConfig)
        setTimeout(() => {
            const newId = nanoid(8)
            setInviteCode(newId)
            setModalStep(0)
            // @ts-ignore
            setCurrentValue("https://sheetroom.com/join/" + newId)
        }, 200)

    }


    return (<SimpleModal buttons={<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" disabled={sharingSetting !== "public" && !selectedClass && modalStep === 1}
                onClick={() => {
                    if (modalStep === 0) {
                        if (sharingSetting === "gclass") {
                            window.location.href = `/api/google-classroom/auth-teacher?assignmentId=${assignmentId}&title=${title}`

                        } else {
                            setModalStep(1)
                        }
                    } else if (modalStep === 1) {
                        toggleLoading(true)
                        createNewInvite({
                            code: newInviteCode,
                            userId: session.id,
                            assignmentId: assignmentId,
                            isPublic: sharingSetting === "public",
                            settingsObject: JSON.stringify(settingsObject),
                            classId: selectedClass ? selectedClass.id : null,
                            isGoogleClass: false
                        })
                            .then(() => setModalStep(2))
                            .then(result => console.log(createInviteResult))
                            .then(result => console.log(result))
                            .catch((error) => console.log(error))
                    } else if (modalStep === 2) {
                        cancelModal()
                    }
                }}
                className={"inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5 " + (sharingSetting !== "public" && !selectedClass && modalStep === 1 ? "opacity-50 cursor-not-allowed" : "opacity-100")}>
          {isLoading && modalStep === 0 ? <CircularProgress color="inherit" size={15}
                                                            className="mr-2 h-auto"/> : null} {modalStep === 0 ? "Continue" : (modalStep === 1 ? "Create Invite" : "Done")}
        </button>
      </span>
            {modalStep === 0 || modalStep === 1 ?
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={modalStep === 0 ? cancelModal : () => setModalStep(0)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
        {modalStep === 0 ? "Cancel" : "Back"}
            </button>
            </span> : null}

        </div>

    </div>} isOpen={isOpen} onCancel={cancelModal}
                         title={modalStep === 0 || modalStep === 2 ? "Share Assignment" : "Invite Options"}
                         content={modalStep === 0 ? <>
                             <ExistingInvitesSection aid={assignmentId}/>
                             {/*@ts-ignore*/}
                             <form onChange={(e) => setSharingSetting(e.target.value)}>
                                 <fieldset>
                                     <div className="my-4 text-left">
                                         <div className="flex items-start">
                                             <div className="flex items-center h-5">
                                                 <input id="public_radio" type="radio" name="form-input share_scope"
                                                        value="public" defaultChecked={sharingSetting === "public"}
                                                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                             </div>
                                             <div className="ml-3 text-sm leading-5">
                                                 <label htmlFor="public_radio"
                                                        className="font-medium text-gray-700">Public</label>
                                                 <p className="text-gray-500">Anyone with the link can view and submit
                                                     this
                                                     assignment.</p>
                                             </div>
                                         </div>
                                         <div className="mt-4">
                                             <div className="flex items-start">
                                                 <div className="flex items-center h-5">
                                                     <input id="class_radio" type="radio" name="form-input share_scope"
                                                            value="class" defaultChecked={sharingSetting === "class"}
                                                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                                 </div>
                                                 <div className="ml-3 text-sm leading-5">
                                                     <label htmlFor="class_radio" className="font-medium text-gray-700">Assign
                                                         to class</label>
                                                     <p className="text-gray-500">Only class members can view and submit
                                                         this assignment.</p>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="mt-4">
                                             <div className="flex items-start">
                                                 <div className="flex items-center h-5">
                                                     <input id="gclass_radio" type="radio" name="form-input share_scope"
                                                            value="gclass" defaultChecked={sharingSetting === "gclass"}
                                                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                                 </div>
                                                 <div
                                                     className="ml-3 text-sm leading-5 flex justify-start items-center text-gray-700">
                                                     <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32px" height="32px"><path d="M 7 5 C 5.355469 5 4 6.355469 4 8 L 4 24 C 4 25.644531 5.355469 27 7 27 L 25 27 C 26.644531 27 28 25.644531 28 24 L 28 8 C 28 6.355469 26.644531 5 25 5 Z M 7 7 L 25 7 C 25.566406 7 26 7.433594 26 8 L 26 24 C 26 24.566406 25.566406 25 25 25 L 23 25 L 23 23 L 18 23 L 18 25 L 7 25 C 6.433594 25 6 24.566406 6 24 L 6 8 C 6 7.433594 6.433594 7 7 7 Z M 16 11 C 14.894531 11 14 11.894531 14 13 C 14 14.105469 14.894531 15 16 15 C 17.105469 15 18 14.105469 18 13 C 18 11.894531 17.105469 11 16 11 Z M 11.5 13 C 10.671875 13 10 13.671875 10 14.5 C 10 15.328125 10.671875 16 11.5 16 C 12.328125 16 13 15.328125 13 14.5 C 13 13.671875 12.328125 13 11.5 13 Z M 20.5 13 C 19.671875 13 19 13.671875 19 14.5 C 19 15.328125 19.671875 16 20.5 16 C 21.328125 16 22 15.328125 22 14.5 C 22 13.671875 21.328125 13 20.5 13 Z M 16 16 C 14.453125 16 13.394531 16.660156 12.75 17.21875 C 12.414063 17.09375 12.039063 17 11.59375 17 C 9.902344 17 9 18 9 18 L 9 20 L 23 20 L 23 18 C 23 18 22.082031 17 20.59375 17 C 20.082031 17 19.644531 17.089844 19.28125 17.21875 C 18.636719 16.65625 17.558594 16 16 16 Z"/></svg>
                                                     <label htmlFor="gclass_radio" className="font-medium">Assign
                                                         through Google Classroom</label>
                                                 </div>
                                             </div>
                                         </div>
                                     </div>
                                 </fieldset>
                             </form>

                         </> : (modalStep === 1 ?
                             <InviteSettings profileData={profileData} session={session} settingsObject={settingsObject}
                                             setSettingsObject={setSettingsObject}
                                             selectedClass={selectedClass} setSelectedClass={setSelectedClass}
                                             isPublic={sharingSetting === "public"}/> :
                             <div className="relative">
                                 <label htmlFor="newinvitelink" className="sr-only">Link to this invite</label>
                                 <div className="relative rounded-md shadow-sm">

                                     <input id="newinvitelink"
                                            className="form-input block w-full sm:text-sm sm:leading-5"
                                         //@ts-ignore
                                            onClick={event => event.target.select()}
                                            placeholder="https://sheetroom.com/join/" readOnly
                                            value={`https://sheetroom.com/join/${newInviteCode}`} autoComplete="off"/>
                                 </div>
                             </div>)}
    />)
}

export default ShareAssignmentModal
