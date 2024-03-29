import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {createAssignment} from "../../lib/graphql/Assignments";
import {newInitialDocumentContent} from "../AssignmentEditor/Templates";
import ReactGA from "react-ga";
import CircularProgress from "@material-ui/core/CircularProgress";


const NewAssignmentModal = ({isOpen, onCancel, session}) => {
    const [createAssignmentResult, createNewAssignment] = useMutation(createAssignment);
    const [currentValue, setNewValue] = useState("Untitled Assignment");
    const [isLoading, toggleLoading] = useState(false)

    function closeModal() {
        onCancel();
        setTimeout(() => setNewValue("Untitled Assignment"), 900)
    }


    return (<SimpleModal buttons={<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={(event) => {
            event.preventDefault()
            toggleLoading(true)
            // @ts-ignore
            createNewAssignment({
                title: currentValue,
                content: newInitialDocumentContent(),
                userId: session.id
            })
                .then((data) => {
                    window.location.href = '/assignment/' + data.data.insert_assignments_assignment.returning[0].id
                    ReactGA.event({
                        category: 'User',
                        action: 'Created an assignment',
                        label: `${currentValue}(${data.data.insert_assignments_assignment.returning[0].id})`
                    })
                })
                .catch(() => ReactGA.exception({
                    description: createAssignmentResult.error,
                    fatal: false
                }));
        }}
            // @ts-ignore
                disabled={currentValue.length === 0 || isLoading}
                className={"inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm  transition ease-in-out duration-150 sm:text-sm sm:leading-5 " + (currentValue.length === 0 ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue")}>
          {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Create
        </button>
      </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={closeModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span>
        </div>
    </div>} isOpen={isOpen} onCancel={closeModal} title="New Assignment" content={
        <div className="w-full">
            <label htmlFor="assignment-title" className="sr-only">New Assignment Title</label>
            <div className="rounded-md shadow-sm w-full">
                {/*//@ts-ignore*/}
                <input id="assignment-title" value={currentValue} onChange={event => setNewValue(event.target.value)}
                       className="form-input block w-full mt-4 sm:text-sm sm:leading-5" autoFocus
                    //                  @ts-ignore
                       placeholder="Untitled Assignment" onClick={(e) => e.target.select()}/>
            </div>
        </div>}/>)
}

export default NewAssignmentModal
