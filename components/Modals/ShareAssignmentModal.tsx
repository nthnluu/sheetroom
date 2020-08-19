import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {nanoid} from "nanoid";
import {useMutation, useQuery} from "urql";
import {createInvite, getAssignmentInvites} from "../../lib/graphql/Invites";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";


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
            <ul className="rounded-lg border border-gray-300 overflow-y-scroll my-2 text-left flex justify-center items-center" style={{height: '11.1rem'}}>
                <div className="mx-auto">
                    <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                </div>
            </ul>
        </>
    )

    return (
        <>
            {data.assignments_invite.length > 0 ? <><ul className="rounded-lg border border-gray-300 overflow-y-scroll my-2 text-left" style={{maxHeight: '11.1rem'}}>
                {data.assignments_invite.map((invite, index) => <li key={invite.id} className={"p-3 border-gray-300 leading-tight " + (index === (data.assignments_invite.length - 1) ? null : "border-b")}>
                    <h1 className="font-medium text-gray-700 text-sm">{moment(invite.created_at).format("dddd, MMMM Do YYYY")} ({invite.join_code})</h1>
                    <p className="text-sm text-gray-500">{invite.is_public ? "Public" : `Assigned to ${invite.classByClass.title}`}</p>
                </li>)}
            </ul><h2 className="font-medium text-gray-700 mt-4">Create New Invite</h2></> : null}


        </>
    )
}

const ShareAssignmentModal = ({isOpen, onCancel, session, assignmentId}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const [createInviteResult, createNewInvite] = useMutation(createInvite);
    const [isLoading, toggleLoading] = useState(false);


    function cancelModal() {
        onCancel();
        toggleLoading(false)
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
        <button type="button" onClick={() => {
            if (modalStep === 0) {
                toggleLoading(true)
                createNewInvite({
                    code: newInviteCode,
                    userId: session.id,
                    assignmentId: assignmentId,
                    isPublic: sharingSetting === "public"
                })
                    .then(() => setModalStep(1))
                    .catch(() => console.log(createInviteResult.error))

            } else if (modalStep === 1) {
                cancelModal()
            }
        }}
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          {isLoading && modalStep === 0 ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null} {modalStep === 0 ? "Create Invite" : "Done"}
        </button>
      </span>
            {modalStep === 0 ? <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span> : null}

        </div>

    </div>} isOpen={isOpen} onCancel={cancelModal} title="Share Assignment" content={modalStep === 0 ? <>
        <ExistingInvitesSection aid={assignmentId}/>


        {/*@ts-ignore*/}
        <fieldset onChange={(e) => setSharingSetting(e.target.value)}>
            <div className="my-4 text-left">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="comments" type="radio" name="form-input share_scope" value="public"
                               className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                               defaultChecked/>
                    </div>
                    <div className="ml-3 text-sm leading-5">
                        <label htmlFor="comments" className="font-medium text-gray-700">Anyone with a link</label>
                        <p className="text-gray-500">Anyone with the link can view and submit this assignment.</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="candidates" type="radio" name="form-input share_scope" value="class"
                                   className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                        </div>
                        <div className="ml-3 text-sm leading-5">
                            <label htmlFor="candidates" className="font-medium text-gray-700">Assign to class</label>
                            <p className="text-gray-500">Only class members can view and submit this assignment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </> : <div className="w-full">
        <label htmlFor="email" className="sr-only">Email</label>
        <div className="rounded-md shadow-sm w-full">
            {/*//@ts-ignore*/}
            <input onClick={(e) => e.target.select()} id="email" value={currentValue}
                   className="form-input block w-full mt-4 sm:text-sm sm:leading-5" readOnly
                   placeholder="Untitled Assignment"/>
        </div>
    </div>}
    />)
}

export default ShareAssignmentModal
