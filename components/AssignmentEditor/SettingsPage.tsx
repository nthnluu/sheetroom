const SettingsPage = () => {
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
                        <div className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2 space-x-2">
                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Untimed
                                </button>
                            </span>

                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-blue-500 text-sm leading-4 font-medium rounded-md text-blue-500 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Per-section
                                </button>
                            </span>

                            <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    Global
                                </button>
                            </span>
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
