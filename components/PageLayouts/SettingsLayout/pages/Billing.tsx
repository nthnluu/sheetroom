import React from "react";

const Billing = () => {
    return (
        <div>
            <div
                className="pt-4 pb-4 border-b border-t border-gray-200 px-4 sm:px-6 lg:px-8 xl:px-6 xl:pt-6 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg leading-7 font-medium">Billing</h1>
                </div>
            </div>
            <div>
                <div className="mt-2 sm:mt-0">
                    <div
                        className="px-4 sm:px-6 lg:px-8 xl:px-6 mt-6 sm:mt-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
                        <label htmlFor="photo"
                               className="block text-sm leading-5 font-medium text-gray-700">
                            Upgrade
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
                                <span className="ml-5 rounded-md shadow-sm">
                <button type="button"
                        className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                  Change
                </button>
              </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billing
