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
                        <a href={"/invite/" + invite.id} className="font-medium text-gray-700 text-sm hover:text-blue-600 focus:underline">{moment(invite.created_at).format("dddd, MMMM Do YYYY")} ({invite.join_code})</a>
                        <p className="text-sm text-gray-400">{invite.is_public ? <><i
                            className="fas fa-globe-americas mr-1"/>Public</> : `Assigned to ${invite.classByClass ? invite.classByClass.title : "a class"}`}</p>
                    </li>)}
                </ul>
                <h2 className="font-medium text-gray-700 mt-4">Create New Invite</h2></> : null}


        </>
    )
}

const ShareAssignmentModal = ({isOpen, onCancel, session, assignmentId,  profileData}) => {
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
                        setModalStep(1)
                    } else if (modalStep === 1) {
                        toggleLoading(true)
                        createNewInvite({
                            code: newInviteCode,
                            userId: session.id,
                            assignmentId: assignmentId,
                            isPublic: sharingSetting === "public",
                            settingsObject: JSON.stringify(settingsObject),
                            classId: selectedClass ? selectedClass.id : null
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
                                                 <input id="comments" type="radio" name="form-input share_scope"
                                                        value="public" defaultChecked={sharingSetting === "public"}
                                                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                             </div>
                                             <div className="ml-3 text-sm leading-5">
                                                 <label htmlFor="comments"
                                                        className="font-medium text-gray-700">Public</label>
                                                 <p className="text-gray-500">Anyone with the link can view and submit
                                                     this
                                                     assignment.</p>
                                             </div>
                                         </div>
                                         <div className="mt-4">
                                             <div className="flex items-start">
                                                 <div className="flex items-center h-5">
                                                     <input id="candidates" type="radio" name="form-input share_scope"
                                                            value="class" defaultChecked={sharingSetting !== "public"}
                                                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                                 </div>
                                                 <div className="ml-3 text-sm leading-5">
                                                     <label htmlFor="candidates" className="font-medium text-gray-700">Assign
                                                         to class</label>
                                                     <p className="text-gray-500">Only class members can view and submit
                                                         this assignment.</p>
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
