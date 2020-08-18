import {useContext} from "react";
import QuizContext from "./QuizContext";
import update from "immutability-helper";

const SettingsPage = () => {
    const {aid, setDocument, document} = useContext(QuizContext)

    const setConfigValue = (configValue, value) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    config: {
                        [configValue]: {
                            $set: value
                        }
                    }
                }
            )
            return newData
        })
    }
    return (<div>
        <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold leading-7 text-gray-800 sm:text-2xl sm:leading-9 sm:truncate">
                    Settings
                </h2>
            </div>
        </div>

        <div className="flex flex-col mt-8 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-4 py-5 sm:p-0">
                <ul>
                    <li className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <label className="text-sm leading-5 font-medium text-gray-700">
                            Timing
                        </label>
                        <div className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 space-x-2 justify-between flex">
                            <span className="space-x-2">
                                <span className="inline-flex rounded-md shadow-sm">
                                <button type="button" onClick={() => setConfigValue("timing", 0)}
                                        className={(document.config['timing'] === 0 ? "text-blue-500 border-blue-500 hover:text-blue-400 active:text-blue-500" : "border-gray-300 text-gray-700 hover:text-gray-500 active:text-gray-700") + " inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md  bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150"}>
                                    Untimed
                                </button>
                            </span>
                                <span className="inline-flex rounded-md shadow-sm">
                                <button type="button" onClick={() => setConfigValue("timing", 1)}
                                        className={(document.config['timing'] === 1 ? "text-blue-500 border-blue-500 hover:text-blue-400 active:text-blue-500" : "border-gray-300 text-gray-700 hover:text-gray-500 active:text-gray-700") + " inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md  bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150"}>
                                    Per-section
                                </button>
                            </span>
                                <span className="inline-flex rounded-md shadow-sm">
                                <button type="button" onClick={() => setConfigValue("timing", 2)}
                                        className={(document.config['timing'] === 2 ? "text-blue-500 border-blue-500 hover:text-blue-400 active:text-blue-500" : "border-gray-300 text-gray-700 hover:text-gray-500 active:text-gray-700") + " inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md  bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150"}>
                                    Global
                                </button>
                            </span>
                            </span>
                            {document.config.timing === 2 ? <span className="inline-flex items-center rounded-md space-x-1">
                                <span className="text-gray-300 mr-2">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                                <span>
                                    <label htmlFor="timing_hours" className="sr-only">Hours</label>
                                    <div className="rounded-md shadow-sm">
                                        <input id="timing_hours" value={document.config.hours} onChange={event => {
                                            //@ts-ignore
                                            if (isNaN(event.target.value)) {
                                                event.preventDefault()
                                                return false
                                            } else {
                                                setConfigValue("hours", event.target.value)
                                            }
                                        }}
                                               className="form-input w-10 h-auto text-sm leading-4 text-center"
                                               placeholder="H"/>
                                    </div>
                                </span>
                                <span>
                                    <label htmlFor="timing_hours" className="sr-only">Minutes</label>
                                    <div className="rounded-md shadow-sm">
                                        <input id="timing_hours" value={document.config.mins} onChange={event => {
                                            //@ts-ignore
                                            if (isNaN(event.target.value)) {
                                                event.preventDefault()
                                                return false
                                            } else {
                                                setConfigValue("mins", event.target.value)
                                            }
                                        }}
                                               className="form-input p-2 w-10 h-auto text-sm leading-4 text-center ste"
                                               placeholder="M"/>
                                    </div>
                                </span>
                            </span> : null}

                        </div>

                    </li>
                    <li className="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5 sm:border-t sm:border-gray-200">
                        <label className="text-sm leading-5 font-medium text-gray-700">
                            Calculator
                        </label>
                        <div className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 space-x-2">
                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Disabled
                                </button>
                            </span>

                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-blue-500 text-sm leading-4 font-medium rounded-md text-blue-500 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Scientific
                                </button>
                            </span>

                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Graphing
                                </button>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>)
}

export default SettingsPage
