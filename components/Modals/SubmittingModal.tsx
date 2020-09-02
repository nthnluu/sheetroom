import Transition from "../Transition";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPlaceholder = () => {
    return (<div className="p-6">
        <div className="mx-auto">
            <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
        </div>
    </div>)
};


const SubmittingModal = ({isOpen}) => {


    return (<div
            className={"fixed bottom-0 inset-x-0 px-2 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center " + (isOpen ? "modalOverlay" : "modalOverlay pointer-events-none")}>

            <Transition show={isOpen} appear={isOpen} enter="ease-out duration-300" enterFrom="opacity-0"
                        enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                </div>
            </Transition>

            <Transition show={isOpen} appear={isOpen} enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-10 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">

                <div
                    className="bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-5"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="sm:flex sm:items-start w-full">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                Submitting assignment
                            </h3>
                            <div className="mt-4 w-full">
                                <LoadingPlaceholder/>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default SubmittingModal
