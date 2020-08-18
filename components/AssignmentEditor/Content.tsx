import React, {useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import QuizContext from "./QuizContext";
import Section from "./DragAndDropEditor/Section";
import ResultPage from "./ResultPage";
import {DragDropContext} from 'react-beautiful-dnd';
import update from "immutability-helper";
import arrayMove from "array-move";
import SettingsPage from "./SettingsPage";

interface Props {

}


const Content: React.FC<Props> = ({}) => {
    const {invalidSession, document, setDocument, aid, currentPage} = useContext(QuizContext)

    const onSortEnd = (result) => {
        const {source, destination} = result;
        const section = source.droppableId
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            setDocument(prevState => {
                const newData = update(prevState, {
                        sections: {
                            [section]: {
                                items:
                                    {$set: arrayMove(prevState.sections[section].items, source.index, destination.index)}
                            }
                        }
                    }
                )
                return newData
            })

        } else {
            setDocument(prevState => {
                    let newData;
                    if (prevState.sections[section].items.length > 1) {
                        newData = update(prevState, {
                            sections: {
                                [destination.droppableId]: {
                                    items: {
                                        $splice: [[destination.index, 0, prevState.sections[section].items[source.index]]]
                                    }
                                },
                                [section]: {
                                    items: {
                                        $splice: [[source.index, 1]]
                                    }
                                }
                            }
                        })
                    } else {
                        let sectionIndex = prevState.config.sections.findIndex(element => element === section)
                        newData = update(prevState, {
                            config: {
                                sections: {
                                    $splice: [[sectionIndex, 1]]
                                }
                            },
                            sections: {
                                [destination.droppableId]: {
                                    items: {
                                        $splice: [[destination.index, 0, prevState.sections[section].items[source.index]]]
                                    }
                                },
                                $unset: [section]
                            }
                        })
                    }

                    return newData
                })
        }
    }

    return (<main className="pt-0">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
            <div className="px-2 py-8 sm:px-0">
                <div key={aid} className="max-w-7xl mx-auto">
                    <Dialog aria-labelledby="simple-dialog-title"
                            open={invalidSession}>
                        <div className="p-2 pr-4">
                            <DialogTitle id="simple-dialog-title">Someone has made changes to this
                                assignment</DialogTitle>
                            <DialogContent>
                                <DialogContentText gutterBottom>Someone ― perhaps you ― has made changes to
                                    this assignment that aren't shown here.</DialogContentText>
                                <DialogContentText>You need to refresh this page to get the latest changes.
                                    You’ll lose any changes you made in this current
                                    session.</DialogContentText>
                            </DialogContent>


                            <DialogActions>
                                <button type="button" onClick={() => location.reload()}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
                                    Update my assignment
                                </button>
                            </DialogActions>

                        </div>


                    </Dialog>

                    <DragDropContext onDragEnd={onSortEnd}>
                        {currentPage === 1 ? document.config.sections.map((sectionId, i) => <Section key={sectionId}
                                                                                                     section={sectionId}
                                                                                                     index={i}/>) : null}
                    </DragDropContext>
                    {currentPage === 2 ? <ResultPage/> : null}
                    {currentPage === 4 ? <SettingsPage/> : null}
                </div>
            </div>
        </div>
    </main>)

}

// @ts-ignore
export default Content;
