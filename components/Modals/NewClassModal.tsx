import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import ReactGA from "react-ga";
import {createClass} from "../../lib/graphql/Class";
import {nanoid} from "nanoid";


const NewClassModal = ({isOpen, onCancel, session}) => {
    const [createClassResult, createNewClass] = useMutation(createClass);
    const [currentValue, setNewValue] = useState("Untitled Class");

    const colors = ["teal", "green", "red", "pink", "orange", "purple", "red"]

    function closeModal () {
        onCancel();
        setTimeout(() => setNewValue("Untitled Class"), 900)
    }

    return (<SimpleModal buttons={<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={(event) => {
            event.preventDefault()
            // @ts-ignore

            createNewClass({
                title: currentValue,
                userId: session.id,
                color: colors[Math.floor(Math.random() * colors.length)],
                joinCode: nanoid(9).toLowerCase()
            })
                .then((data) => {
                    window.location.href = '/class/' + data.data.insert_classes_class_one.id;
                    ReactGA.event({
                        category: 'User',
                        action: 'Created a class',
                        label: `${currentValue}(${data.data.insert_classes_class_one.id})`
                    });
                })
                .catch(() => ReactGA.event({
                    category: 'Error',
                    action: 'Class Insertion Error (GraphQL MUTATION)',
                    // @ts-ignore
                    label: createClassResult.error
                }));
        }}
            // @ts-ignore
                disabled={currentValue.length === 0} className={"inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm  transition ease-in-out duration-150 sm:text-sm sm:leading-5 " + (currentValue.length === 0 ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue")}>
          Create
        </button>
      </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={closeModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span>
        </div>
    </div>} isOpen={isOpen} onCancel={closeModal} title="New Class" content={<div className="w-full">
        <label htmlFor="class-title" className="sr-only">New Class Title</label>
        <div className="rounded-md shadow-sm w-full">
            {/*//@ts-ignore*/}
            <input id="class-title" value={currentValue} onChange={event => setNewValue(event.target.value)}
                   className="form-input block w-full mt-4 sm:text-sm sm:leading-5" autoFocus
//                  @ts-ignore
                   placeholder="Untitled Class" onClick={(e) => e.target.select()}/>
        </div>
    </div>}/>)
}

export default NewClassModal
