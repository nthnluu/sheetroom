const SettingsToggleRow = () => {
    return (<li className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
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
    </li>)
}

export default SettingsToggleRow
