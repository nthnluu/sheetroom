import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {initialDocumentContent} from "../QuizEditor/Templates";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {useMutation} from "@apollo/react-hooks";
import {CREATE_ASSIGNMENT} from "../../gql/getAssignment";

interface Props {
    session: object;
}

const Sidebar: React.FC<Props> = ({session}) => {
    const [createNewAssignment] = useMutation(CREATE_ASSIGNMENT)
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);

    return (
        <>
            <Dialog onClose={() => toggleCreateAssignmentDialog(false)} aria-labelledby="simple-dialog-title"
                    open={createAssignmentDialog}>
                <div className="p-2 pr-4">
                    <DialogTitle id="simple-dialog-title">New assignment</DialogTitle>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        createNewAssignment({
                            variables: {
                                //@ts-ignore
                                title: event.currentTarget.title.value,
                                content: initialDocumentContent,
                                userId: session.userId
                            }
                        })
                            .then((result) => window.location.href = '/edit/assignment/' + result.data.insert_assignments_assignment.returning[0].id)
                            .catch((error) => console.log(error));


                    }}>
                        <DialogContent>
                            <div className="w-64 sm:w-96 mb-2">
                                <label htmlFor="title" className="sr-only">Title</label>
                                <div className="relative rounded-md shadow-sm">
                                    <input id="title" className="form-input block w-full sm:leading-6"
                                           placeholder="Untitled Assignment" defaultValue="Untitled Assignment"
                                           autoFocus/>
                                </div>
                            </div>
                        </DialogContent>

                        <DialogActions>
                            <button type="button" onClick={() => toggleCreateAssignmentDialog(false)}
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


            </Dialog>
        <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
        <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-8">
                    <div
                        className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
                        {/* Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 h-12 w-12">
                                <img className="h-12 w-12 rounded-full"
                                     src={session.user.image ? session.user.image : "https://lh3.googleusercontent.com/proxy/Ge8IjXjwr-9jS3f5_gnxcIyi1OFQ-IMWCvHtmpCze2EeQi2TqNgtMx1oVZoFhiHATpISTmeXCZ_uQfiiauO2R6uEBFFLwI86huh6RNZjXn2csWFM6GIhulXwJ50oXU2Jb3I"}
                                     alt=""/>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm leading-5 font-medium text-gray-900">Nathan Luu</div>
                                <a href="#" className="group flex items-center space-x-2.5">
                                    {/*<svg className="w-5 h-5 text-gray-400 group-hover:text-gray-500"*/}
                                    {/*     viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*    <path fillRule="evenodd" clipRule="evenodd"*/}
                                    {/*          d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"*/}
                                    {/*          fill="currentcolor"/>*/}
                                    {/*</svg>*/}
                                    <div
                                        className="text-sm leading-5 text-gray-500 group-hover:text-gray-900 font-medium">{session.user.email}
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* Action buttons */}
                        <div
                            className="flex flex-col space-y-3 sm:space-y-0 sm:space-x-3 sm:flex-row xl:flex-col xl:space-x-0 xl:space-y-3">
                          <span className="inline-flex rounded-md shadow-sm">
                            <button type="button" onClick={() => toggleCreateAssignmentDialog(true)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                              New Assignment
                            </button>
                          </span>
                            <span className="inline-flex rounded-md shadow-sm">
                            <button type="button"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                              Assign to Class
                            </button>
                          </span>
                        </div>
                    </div>
                    {/* Meta info */}
                    <div
                        className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                        <div className="flex items-center space-x-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"/>
                            </svg>
                            <span className="text-sm text-gray-500 leading-5 font-medium">Pro Member</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                            </svg>
                            <span className="text-sm text-gray-500 leading-5 font-medium">8 Projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            </>)
}

export default Sidebar
