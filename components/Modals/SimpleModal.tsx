import Transition from "../Transition";

const SimpleModal = ({isOpen, onCancel, title, content}) => {

    return (<div className={"fixed bottom-0 inset-x-0 px-2 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center " + (isOpen ? "modalOverlay" : "modalOverlay pointer-events-none")}>

            <Transition show={isOpen} appear={isOpen} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onCancel}></div>
                </div>
            </Transition>

        <Transition show={isOpen} appear={isOpen} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-10 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
                className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-5"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button type="button" onClick={onCancel}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                            aria-label="Close">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            {title}
                        </h3>
                        <div className="mt-2">
                            {content}
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
                    <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Create Invite
        </button>
      </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={onCancel}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span>
                    </div>

                    <span className="mt-3 w-full rounded-md sm:mt-0 sm:w-auto hidden sm:flex">
        <button type="button" onClick={onCancel}
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-base leading-6 font-medium text-gray-400 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          View previous invites
        </button>
      </span>
                </div>
            </div>
        </Transition>
        </div>
    )
}

export default SimpleModal
