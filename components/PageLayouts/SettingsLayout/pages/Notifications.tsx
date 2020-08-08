import React from "react";

const Notifications = () => {
    return (<div>
        <div
            className="pt-4 pb-4 border-b border-t border-gray-200 px-4 sm:px-6 lg:px-8 xl:px-6 xl:pt-6 xl:border-t-0">
            <div className="flex items-center">
                <h1 className="flex-1 text-lg leading-7 font-medium">Notifications</h1>
            </div>
        </div>
        <div>
            <div className="sm:border-gray-200 sm:pt-5 px-4 sm:px-6 lg:px-8 xl:px-6">
                <div role="group" aria-labelledby="label-email">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                        <div>
                            <div
                                className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                                id="label-email">
                                By Email
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="comments" type="checkbox"
                                               className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                    </div>
                                    <div className="ml-3 text-sm leading-5">
                                        <label htmlFor="comments"
                                               className="font-medium text-gray-700">Comments</label>
                                        <p className="text-gray-500">Get notified when
                                            someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="candidates" type="checkbox"
                                                   className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        </div>
                                        <div className="ml-3 text-sm leading-5">
                                            <label htmlFor="candidates"
                                                   className="font-medium text-gray-700">Candidates</label>
                                            <p className="text-gray-500">Get notified
                                                when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="offers" type="checkbox"
                                                   className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        </div>
                                        <div className="ml-3 text-sm leading-5">
                                            <label htmlFor="offers"
                                                   className="font-medium text-gray-700">Offers</label>
                                            <p className="text-gray-500">Get notified
                                                when a candidate accepts or rejects an
                                                offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:mt-5 sm:border-t sm:border-gray-200 sm:pt-5 px-4 sm:px-6 lg:px-8 xl:px-6">
                <div role="group" aria-labelledby="label-notifications">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                        <div>
                            <div
                                className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
                                id="label-notifications">
                                Push Notifications
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="max-w-lg">
                                <p className="text-sm leading-5 text-gray-500">These are
                                    delivered via SMS to your mobile phone.</p>
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <input id="push_everything"
                                               name="form-input push_notifications"
                                               type="radio"
                                               className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        <label htmlFor="push_everything"
                                               className="ml-3">
                                                                                <span
                                                                                    className="block text-sm leading-5 font-medium text-gray-700">Everything</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <input id="push_email"
                                               name="form-input push_notifications"
                                               type="radio"
                                               className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        <label htmlFor="push_email"
                                               className="ml-3">
                                                                                <span
                                                                                    className="block text-sm leading-5 font-medium text-gray-700">Same as email</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <input id="push_nothing"
                                               name="form-input push_notifications"
                                               type="radio"
                                               className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                        <label htmlFor="push_nothing"
                                               className="ml-3">
                                                                                <span
                                                                                    className="block text-sm leading-5 font-medium text-gray-700">No push notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Notifications
