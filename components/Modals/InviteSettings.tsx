import React, {useState} from "react";
import update from "immutability-helper";
import moment from "moment";
import Tabs from "./ModalTabs";
import ToggleRow from "../Misc/ToggleRow";
import Datetime from "react-datetime";
import {useQuery} from "urql";
import {searchClasses} from "../../lib/graphql/Class";
import JsonDebugBox from "../JsonDebugBox";


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
                    <li key={course.id}>
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
            {dropdownActive ?
                <SearchResults session={session} value={searchTerm} setClass={id => setSelectedClass(id)}/> : null}
        </div>}

    </>

}


const InviteSettings = ({isPublic, selectedClass, setSelectedClass, settingsObject, setSettingsObject, session, profileData, standalone = false}) => {
    const [currentTab, setCurrentTab] = useState(0)

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

    const yesterday = moment();
    const valid = (current) => {
        return current.isAfter(yesterday);
    };

    const userIsPro = profileData.data.users_by_pk.is_pro


    return (<div className="w-full">
        <Tabs activeTab={currentTab} setActiveTab={index => setCurrentTab(index)}
              tabs={["General", "Visibility", "Advanced"]}/>
        {currentTab === 0 ? <>
            {/*@ts-ignore*/}
            {standalone ? null : <>{isPublic ? <>
                {/*<ToggleRow label="Collect student info" value={settingsObject.collectStudentInfo}*/}
                {/*                     onEnable={() => setConfigValue("collectStudentInfo", true)}*/}
                {/*                     onDisable={() => setConfigValue("collectStudentInfo", false)}/>*/}
                {/*{settingsObject.collectStudentInfo ?*/}
                {/*    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-2 mt-4">*/}
                {/*        <button type="button"*/}
                {/*                onClick={() => setConfigValue("collectStudentName", !settingsObject.collectStudentName)}*/}
                {/*                className={settingsObject.collectStudentName ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
                {/*            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectStudentName ? "inline" : "hidden")}/>Name*/}
                {/*        </button>*/}
                {/*        <button type="button"*/}
                {/*                onClick={() => setConfigValue("collectEmail", !settingsObject.collectEmail)}*/}
                {/*                className={settingsObject.collectEmail ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
                {/*            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectEmail ? "inline" : "hidden")}/>Email*/}
                {/*        </button>*/}
                {/*        <button type="button" onClick={() => setConfigValue("collectId", !settingsObject.collectId)}*/}
                {/*                className={settingsObject.collectId ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-gray-300 focus:bg-gray-50 active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
                {/*            <i className={"fas fa-check mr-1.5 " + (settingsObject.collectId ? "inline" : "hidden")}/>ID*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    : null}*/}
            </> : <div className="mt-6">
                <label htmlFor="email" className="sr-only">Assign to</label>
                <div className="relative rounded-md shadow-sm">
                    <ClassSearch session={session} selectedClass={selectedClass} setSelectedClass={setSelectedClass}/>
                </div>
            </div>
            }</>}

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
                        <Datetime isValidDate={valid}
                                  value={moment(settingsObject.dueDate)}
                                  onChange={moment => setConfigValue("dueDate", moment)}
                                  inputProps={{className: "w-full h-full form-input focus:outline-none"}}/>
                    </div>
                    <div className="block sm:hidden">
                        {/*// @ts-ignore*/}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative rounded-md shadow-sm">
                                {/*// @ts-ignore*/}
                                <Datetime isValidDate={valid}
                                          value={moment(settingsObject.dueDate)}
                                          onChange={moment => setConfigValue("dueDate", moment)}
                                          className="rdtPickerOpenUpwards"
                                          inputProps={{className: "w-full h-full form-input focus:outline-none"}}/>
                            </div>
                        </div>

                    </div>


                </div>
            </div> : null}


            {/*@ts-ignore*/}
            {isPublic ? null : <><ToggleRow label="Allow multiple attempts" value={settingsObject.multipleAttempts}
                                             onEnable={() => setConfigValue("multipleAttempts", true)}
                                             onDisable={() => setConfigValue("multipleAttempts", false)}/>
                {settingsObject.multipleAttempts ? <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="flex-row justify-start items-center mt-2">
                            <label htmlFor="keepScore" className="block text-xs uppercase leading-5 text-gray-400">
                                Keep
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select id="keepScore"
                                        onChange={event => setConfigValue("multipleAttemptsScoring", event.target.value)}
                                        className="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                                    <option selected={settingsObject.multipleAttemptsScoring === 1} value={1}>Highest score
                                    </option>
                                    <option selected={settingsObject.multipleAttemptsScoring === 2} value={2}>Latest score
                                    </option>
                                    <option selected={settingsObject.multipleAttemptsScoring === 3} value={3}>Average of all
                                        attempts
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-row justify-start items-center mt-2">
                            <label htmlFor="allowedAttempts" className="block text-xs uppercase leading-5 text-gray-400">
                                Allowed attempts
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input id="allowedAttempts" className="form-input block w-full sm:text-sm sm:leading-5"

                                       placeholder="Unlimited" autoComplete="none" value={settingsObject.allowedAttempts}
                                       onChange={event => {
                                           //@ts-ignore
                                           if (!isNaN(event.target.value)) {
                                               setConfigValue("allowedAttempts", event.target.value)
                                           }
                                       }}/>
                            </div>
                        </div>
                    </div>
                    : null}</>}

        </> : null}

        {currentTab === 1 ? <>
            <ToggleRow label="Hide score" value={settingsObject.hideScore}
                       onEnable={() => setConfigValue("hideScore", true)}
                       onDisable={() => setConfigValue("hideScore", false)}/>
            {/*{settingsObject.hideScore && settingsObject.multipleAttempts ?*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">*/}
            {/*        <button type="button" onClick={() => setConfigValue("hideScoreUntilLastAttempt", true)}*/}
            {/*                className={settingsObject.hideScoreUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
            {/*            <i className={"fas fa-check mr-1.5 " + (settingsObject.hideScoreUntilLastAttempt ? "inline" : "hidden")}/>Hide*/}
            {/*            until*/}
            {/*            final attempt*/}
            {/*        </button>*/}
            {/*        <button type="button" onClick={() => setConfigValue("hideScoreUntilLastAttempt", false)}*/}
            {/*                className={!settingsObject.hideScoreUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
            {/*            <i className={"fas fa-check mr-1.5 " + (!settingsObject.hideScoreUntilLastAttempt ? "inline" : "hidden")}/>Hide*/}
            {/*            results*/}
            {/*        </button>*/}
            {/*    </div> : null}*/}


            {/*@ts-ignore*/}
            <ToggleRow label="Hide answers" value={settingsObject.restrictResults}
                       onEnable={() => setConfigValue("restrictResults", true)}
                       onDisable={() => setConfigValue("restrictResults", false)}/>
            {/*{settingsObject.restrictResults && settingsObject.multipleAttempts ?*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4">*/}
            {/*        <button type="button" onClick={() => setConfigValue("hideUntilLastAttempt", true)}*/}
            {/*                className={settingsObject.hideUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
            {/*            <i className={"fas fa-check mr-1.5 " + (settingsObject.hideUntilLastAttempt ? "inline" : "hidden")}/>Hide*/}
            {/*            until*/}
            {/*            final attempt*/}
            {/*        </button>*/}
            {/*        <button type="button" onClick={() => setConfigValue("hideUntilLastAttempt", false)}*/}
            {/*                className={!settingsObject.hideUntilLastAttempt ? "items-center px-3 py-2 border border-blue-300 text-sm leading-4 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-blue-800 active:bg-blue-50 transition ease-in-out duration-150" : "items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}>*/}
            {/*            <i className={"fas fa-check mr-1.5 " + (!settingsObject.hideUntilLastAttempt ? "inline" : "hidden")}/>Hide*/}
            {/*            results*/}
            {/*        </button>*/}
            {/*    </div> : null}*/}
        </> : null}

        {currentTab === 2 ? <>
            <ToggleRow label="Restrict IP address" value={ipAddress}
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
            </div> : null}


            <ToggleRow label="Submit if student leaves window" value={ipAddress}
                       onEnable={() => setIpAddress(true)}
                       onDisable={() => setIpAddress(false)}/>

            <ToggleRow label="Disable text selection" value={ipAddress} proOnly isPro={userIsPro}
                       onEnable={() => setIpAddress(true)}
                       onDisable={() => setIpAddress(false)}/>

            <ToggleRow label="Disable paste" value={ipAddress} proOnly isPro={userIsPro}
                       onEnable={() => setIpAddress(true)}
                       onDisable={() => setIpAddress(false)}/>


            </> : null}





    </div>)
}
export default InviteSettings
