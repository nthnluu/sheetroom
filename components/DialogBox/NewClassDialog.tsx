import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {newInitialDocumentContent} from "../QuizEditor/Templates";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import {useMutation} from "urql";
import {createClass} from "../../lib/graphql/Class";

interface Props {
    onClose: any;
    open: boolean;
    session: string;
    unfixed?: boolean;
}

const NewClassDialog:React.FC<Props> = ({onClose, open, session}) => {
    const [createClassResult, createNewClass] = useMutation(createClass);


    return ( <Dialog onClose={onClose} aria-labelledby="simple-dialog-title"
                     open={open}>
        <div className="p-2">
            <DialogTitle id="simple-dialog-title">New class</DialogTitle>

            <form onSubmit={(event) => {
                event.preventDefault()
                // @ts-ignore
                createNewClass({title: event.target.title.value, userId: session.id})
                    .then((data) => window.location.href = '/edit/assignment/' + data.data.insert_assignments_assignment.returning[0].id)
                    .catch(() => console.log(createClassResult.error))

            }}>
                <DialogContent>
                    <div className="w-full">
                        <label htmlFor="title" className="sr-only">Title</label>
                        <div className="relative rounded-md shadow-sm">
                            <input id="title" className="form-input block w-full sm:leading-6 w-full"
                                   placeholder="Untitled Class" defaultValue="Untitled Assignment"
                                   autoFocus/>
                        </div>
                    </div>
                </DialogContent>

                <DialogActions>
                    <button type="button" onClick={onClose}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-gray-600 text-base leading-6 font-medium rounded-md text-white bg-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline active:bg-gray-200 transition ease-in-out duration-150">
                        Cancel
                    </button>
                    <button type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                        Create
                    </button>
                </DialogActions>
            </form>

        </div>


    </Dialog>)
}

export default NewClassDialog
