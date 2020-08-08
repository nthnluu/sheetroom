import React from "react";

const Profile = () => {
    return (
        <div>
            <div
                className="pt-4 pb-4 border-b border-t border-gray-200 px-4 sm:px-6 lg:px-8 xl:px-6 xl:pt-6 xl:border-t-0">
                <div className="flex items-center">
                    <h1 className="flex-1 text-lg leading-7 font-medium">Profile settings</h1>
                </div>
            </div>
            <div>
                <div className="mt-2 sm:mt-0">
                    <div
                        className="px-4 sm:px-6 lg:px-8 xl:px-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:pt-5">
                        <label htmlFor="first_name"
                               className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                            First name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                                <input id="first_name"
                                       className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-4 sm:px-6 lg:px-8 xl:px-6 mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="last_name"
                               className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                            Last name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg rounded-md shadow-sm sm:max-w-xs">
                                <input id="last_name"
                                       className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-4 sm:px-6 lg:px-8 xl:px-6 mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                            Email address
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg rounded-md shadow-sm">
                                <input id="email" type="email"
                                       className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="px-4 sm:px-6 lg:px-8 xl:px-6 mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="photo"
                               className="block text-sm leading-5 font-medium text-gray-700">
                            Photo
                        </label>
                        <div className="mt-2 sm:mt-0 sm:col-span-2">
                            <div className="flex items-center">
              <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </span>
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

export default Profile
