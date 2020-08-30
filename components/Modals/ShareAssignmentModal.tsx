import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {nanoid} from "nanoid";
import {useMutation, useQuery} from "urql";
import {createInvite, getAssignmentInvites} from "../../lib/graphql/Invites";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import ToggleRow from "../Misc/ToggleRow";
import Datetime from 'react-datetime'
import {searchClasses} from "../../lib/graphql/Class";
import update from "immutability-helper";
import Tabs from "./ModalTabs";
import JsonDebugBox from "../JsonDebugBox";


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
            <ul className="rounded-lg border border-gray-300 overflow-y-auto my-2 text-left flex justify-center items-center"
                style={{height: '11.1rem'}}>
                <div className="mx-auto">
                    <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                </div>
            </ul>
        </>
    )

    return (
        <>
            {data.assignments_invite.length > 0 ? <>
                <ul className="rounded-lg border border-gray-300 overflow-y-scroll my-2 text-left"
                    style={{maxHeight: '11.1rem'}}>
                    {data.assignments_invite.map((invite, index) => <li key={invite.id}
                                                                        className={"p-3 border-gray-300 leading-tight " + (index === (data.assignments_invite.length - 1) ? null : "border-b")}>
                        <h1 className="font-medium text-gray-700 text-sm">{moment(invite.created_at).format("dddd, MMMM Do YYYY")} ({invite.join_code})</h1>
                        <p className="text-sm text-gray-400">{invite.is_public ? <><i
                            className="fas fa-globe-americas mr-1"/>Public</> : `Assigned to ${invite.classByClass ? invite.classByClass.title : "a class"}`}</p>
                    </li>)}
                </ul>
                <h2 className="font-medium text-gray-700 mt-4">Create New Invite</h2></> : null}


        </>
    )
}

const SearchResults = ({value, setClass, session}) => {
    const [result] = useQuery({
        query: searchClasses,
        variables: {
            searchValue: `%${value}%`,
            userId: session.id
        }
    });

    const {fetching, data} = result


    return (data ?
        (data.classes_class.length > 0 ?
            <ul className="bg-white border rounded-md shadow absolute mt-1 overflow-hidden w-full z-50 divide-y">
                {data.classes_class.map(course =>
                    <li>
                        <button onClick={() => setClass({title: course.title, id: course.id})}
                                className="text-sm text-gray-700 p-2 w-full text-left focus:outline-none focus:bg-gray-50">{course.title}</button>
                    </li>)}
            </ul> : null) : null)


}

const ClassSearch = ({selectedClass, setSelectedClass, session}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [dropdownActive, toggleDropdown] = useState(false)

    const handleChange = (event) => {
        const newValue = event.target.value

        if (searchTerm.length === 0) {
            toggleDropdown(true)
            setSearchTerm(newValue)
        } else {
            setSearchTerm(newValue)
        }
    }

    return <>
        {selectedClass ? <div className="relative">
            <label htmlFor="assigned_to" className="sr-only">Assigning to</label>
            <div className="relative rounded-md shadow-sm">
                <button id="assigned_to" className="form-input w-full text-left text-sm"
                        onClick={() => setSelectedClass(undefined)}>{selectedClass.title}</button>
            </div>
        </div> : <div className="relative">
            <label htmlFor="assign_to" className="sr-only">Assign to</label>
            <div className="relative rounded-md shadow-sm">
                <input id="assign_to" className="form-input block w-full sm:text-sm sm:leading-5"
                       placeholder="Assign to class" onChange={handleChange} value={searchTerm} autoComplete="off"/>
            </div>
            {dropdownActive ? <SearchResults session={session} value={searchTerm} setClass={id => setSelectedClass(id)}/> : null}
        </div>}

    </>

}

const InviteSettingsSection = ({isPublic, selectedClass, setSelectedClass, settingsObject, setSettingsObject, session}) => {
    const [currentTab, setCurrentTab] = useState(0)
    const [dueDate, toggleDueDate] = useState(false);
    const [dueDateValue, setDueDateValue] = useState(() => (new Date()));

    const [restrictResults, toggleRestrictResults] = useState(false);
    const [hideUntilLastAttempt, setHideUntilLastAttempt] = useState(false);
    const [multipleAttempts, setMultipleAttempts] = useState(false)

    const [collectStudentInfo, toggleCollectStudentInfo] = useState(false);
    const [collectName, toggleCollectName] = useState(false);
    const [collectEmail, toggleCollectEmail] = useState(false);
    const [collectId, toggleCollectId] = useState(false);


    const [ipAddress, setIpAddress] = useState(false)
    const [ipAddressValue, setIpAddressValue] = useState("")


    const setConfigValue = (configValue, value) => {
        setSettingsObject(prevState => {
                return update(prevState, {
                        [configValue]: {
                            $set: value
                        }
                    }
                )
            }
        )
    }

    const yesterday = moment().subtract( 1, 'day' );
    const valid = ( current ) =>{
        return current.isAfter( yesterday );
    };

    return (<div className="w-full">
        <JsonDebugBox content={settingsObject}/>
        <Tabs activeTab={currentTab} setActiveTab={index => setCurrentTab(index)}
              tabs={["General", "Visibility", "Advanced"]}/>
        {currentTab === 0 ? <>
            {/*@ts-ignore*/}
            {isPublic ? <><ToggleRow label="Collect student info" value={settingsObject.collectStudentInfo}
                                     onEnable={() => setConfigValue("collectStudentInfo", true)}
                                     onDisable={() => setConfigValue("collectStudentInfo", false)}/>
                {settingsObject.collectStudentInfo ?
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-2 mt-4">
                        <button type="button"
                                onClick={() => setConfigValue("collectStudentName", !settingsObject.collectStudentName)}
                                className={settingsObject.collectStudentName ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>
                            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectStudentName ? "inline" : "hidden")}/>Name
                        </button>
                        <button type="button"
                                onClick={() => setConfigValue("collectEmail", !settingsObject.collectEmail)}
                                className={settingsObject.collectEmail ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>
                            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectEmail ? "inline" : "hidden")}/>Email
                        </button>
                        <button type="button" onClick={() => setConfigValue("collectId", !settingsObject.collectId)}
                                className={settingsObject.collectId ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>
                            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectId ? "inline" : "hidden")}/>ID
                        </button>
                    </div>
                    : null}</> : <div className="mt-6">
                <label htmlFor="email" className="sr-only">Assign to</label>
                <div className="relative rounded-md shadow-sm">
                    <ClassSearch session={session} selectedClass={selectedClass} setSelectedClass={setSelectedClass}/>
                </div>
            </div>
            }
            {/*@ts-ignore*/}
            <ToggleRow label="Due date" value={settingsObject.dueDateEnabled}
                       onEnable={() => setConfigValue("dueDateEnabled", true)}
                       onDisable={() => setConfigValue("dueDateEnabled", false)}/>
            {settingsObject.dueDateEnabled ? <div className="grid grid-cols-1 gap-4 text-left">
                <div className="flex-row justify-start items-center mt-2">
                    <label htmlFor="allowedAttempts" className="sr-only">
                        DUE AT
                    </label>
                    <div className="hidden sm:block">
                        {/*// @ts-ignore*/}
                        <Datetime isValidDate={valid} value={settingsObject.dueDate} onChange={moment => setConfigValue("dueDate", moment)}
                                  inputProps={{className: "w-full h-full form-input focus:outline-none"}}/>
                    </div>
                    <div className="block sm:hidden">
                        {/*// @ts-ignore*/}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative rounded-md shadow-sm">
                                {/*// @ts-ignore*/}
                                <Datetime isValidDate={valid} value={settingsObject.dueDate} onChange={moment => setConfigValue("dueDate", moment)} className="rdtPickerOpenUpwards"
                                          inputProps={{className: "w-full h-full form-input focus:outline-none"}}/>
                            </div>
                        </div>

                    </div>


                </div>
            </div> : null}


            {/*@ts-ignore*/}
            <ToggleRow label="Allow multiple attempts" value={multipleAttempts}
                       onEnable={() => setMultipleAttempts(true)}
                       onDisable={() => setMultipleAttempts(false)}/>
            {multipleAttempts ? <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="flex-row justify-start items-center mt-2">
                        <label htmlFor="keepScore" className="block text-xs uppercase leading-5 text-gray-400">
                            Keep
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <select id="keepScore"
                                    className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                <option>Highest score</option>
                                <option>Latest score</option>
                                <option>Average of all attempts</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-row justify-start items-center mt-2">
                        <label htmlFor="allowedAttempts" className="block text-xs uppercase leading-5 text-gray-400">
                            Allowed attempts
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="allowedAttempts" className="form-input block w-full sm:text-sm sm:leading-5"
                                   placeholder="Unlimited" autoComplete="none"/>
                        </div>
                    </div>
                </div>
                : null}
        </> : null}

        {currentTab === 1 ? <>
            {/*@ts-ignore*/}
            <ToggleRow label="Restrict results" value={restrictResults}
                       onEnable={() => toggleRestrictResults(true)}
                       onDisable={() => toggleRestrictResults(false)}/>
            {restrictResults && multipleAttempts ? <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">
                <button type="button" onClick={() => setHideUntilLastAttempt(true)}
                        className={hideUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>
                    <i className={"fas fa-check mr-1.5 " + (hideUntilLastAttempt ? "inline" : "hidden")}/>Hide until
                    final attempt
                </button>
                <button type="button" onClick={() => setHideUntilLastAttempt(false)}
                        className={!hideUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>
                    <i className={"fas fa-check mr-1.5 " + (!hideUntilLastAttempt ? "inline" : "hidden")}/>Hide results
                </button>
            </div> : null}
        </> : null}

        {currentTab === 2 ? <><ToggleRow label="Restrict IP address" value={ipAddress}
                                         onEnable={() => setIpAddress(true)}
                                         onDisable={() => setIpAddress(false)}/>
            {ipAddress ? <div>
                <label htmlFor="ipAddress" className="sr-only">Enter a comma-seperated list of allowed IP
                    addresses</label>
                <div className="relative rounded-md shadow-sm mt-3">
                    <input id="ipAddress" className="form-input block w-full sm:text-sm sm:leading-5"
                           autoComplete="none"
                           placeholder="Enter a comma-seperated list of allowed IP addresses" value={ipAddressValue}
                           onChange={event => setIpAddressValue(event.target.value)}/>
                </div>
                <button className="text-sm text-gray-400">Current IP Address</button>
            </div> : null}</> : null}


    </div>)
}

const ShareAssignmentModal = ({isOpen, onCancel, session, assignmentId}) => {
    const [newInviteCode, setInviteCode] = useState(nanoid(8))
    const [modalStep, setModalStep] = useState(0)
    const [sharingSetting, setSharingSetting] = useState("public")
    const [currentValue, setCurrentValue] = useState("https://sheetroom.com/join/" + newInviteCode)
    const [createInviteResult, createNewInvite] = useMutation(createInvite);
    const [isLoading, toggleLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState(undefined)
    const [settingsObject, setSettingsObject] = useState({})


    function cancelModal() {
        onCancel();
        toggleLoading(false)
        setSelectedClass(undefined);
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
                            classId: selectedClass ? selectedClass.id : null
                        })
                            .then(() => setModalStep(2))
                            .catch(() => console.log(createInviteResult.error))
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
                             <InviteSettingsSection session={session} settingsObject={settingsObject}
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
