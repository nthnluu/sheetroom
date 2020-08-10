import {useRouter} from 'next/router'
import {useSubscription, useMutation} from "urql";
import {getSession} from "next-auth/client";
import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import QuizContext from "../../components/AssignmentEditor/QuizContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import {v4 as uuidv4} from 'uuid';
import {debounce} from 'lodash'
import EditorLayout from "../../components/AssignmentEditor/EditorLayout";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {assignmentSubscription, updateAssignmentContent} from "../../lib/graphql/Assignments";
import Transition from "../../components/Transition";

const PageContent: React.FC<{ pageData, aid: string, session: string }> = ({pageData, aid, session}) => {
    // A client ID to identify the current user working on the project
    const [clientId] = useState(uuidv4())

    //Stores the current state of the document
    // const [assignment, setAssignment] = useState(data.assignments_assignment_by_pk.content ? data.assignments_assignment_by_pk.content : initialDocumentContent);
    const [document, setDocument] = useState(pageData.assignments_assignment_by_pk.content);
    const [documentHistory, setDocumentHistory] = useState([pageData.assignments_assignment_by_pk.content]);
    const [currentItem, setCurrentItem] = useState(document.sections[document.config.sections[0]] ? document.sections[document.config.sections[0]].items[0] : null);
    const [currentPage, setCurrentPage] = useState(1);

    //Tracks the save status -- 0: saved; 1: saving; 2: error
    const [saveStatus, setSaveStatus] = useState(0);
    const [invalidSession, setInvalidSession] = useState(false);

    const [prevClientId, setPrevClientId] = useState(pageData.assignments_assignment_by_pk.last_edited_by);

    const [mutateAssignmentResult, mutateAssignment] = useMutation(updateAssignmentContent)

    const [currentNotification, setCurrentNotification] = useState(null)

    const sendNotification = (newNotification) => {
        setCurrentNotification(null);
        setCurrentNotification(newNotification);
        setTimeout(() => setCurrentNotification(null), 4000)
    }

    const saveAssignment = (newDocument) => {
        if (!invalidSession) {
            setDocumentHistory([document, ...documentHistory])
            setSaveStatus(1)
            mutateAssignment({clientId: clientId, id: aid, content: newDocument})
                .then(() => setSaveStatus(0))
                .catch(() => setSaveStatus(2))
        }

    }



    //Autosave Logic
    const delayedMutation = useCallback(debounce(newDocument => saveAssignment(newDocument), 1000), []);
    useEffect(() => {
        delayedMutation(document)
    }, [document])

    //Checks if  session is expired
    useEffect(() => {
        if (prevClientId !== pageData.assignments_assignment_by_pk.last_edited_by) {
            setInvalidSession(true)
        } else {
            setPrevClientId(pageData.assignments_assignment_by_pk.last_edited_by)
        }

    }, [pageData])


    // If the document is saving, prevents the window from navigating away
    useEffect(() => {
        window.addEventListener('beforeunload', handleWindowClose);
        return () => {
            window.removeEventListener('beforeunload', handleWindowClose);
        };
    }, []);


    const handleWindowClose = (e) => {
        if (saveStatus !== 0) {
            e.preventDefault();
            return e.returnValue = 'You have unsaved changes - are you sure you wish to close?';
        }

    };


    return (
        <QuizContext.Provider value={{
            document,
            aid,
            saveStatus,
            setSaveStatus,
            setDocument,
            clientId,
            invalidSession,
            currentItem,
            setCurrentItem,
            currentPage,
            setCurrentPage
        }}>
            {/*// @ts-ignore*/}
            <EditorLayout aid={aid} pageData={pageData} windowTitle="Sheetroom" session={session}/>
        </QuizContext.Provider>
    )
};

const LoadingPlaceholder: React.FC = () => {
    return (
        <div className="pt-56">
            <Head>
                <title>Sheetroom</title>
            </Head>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
            </div>

        </div>
    )
};

const ErrorScreen = () => {
    // window.location.href = '/dashboard'
    return (<div className="pt-56">
        <Head>
            <title>Sheetroom</title>
        </Head>
        <div className="mx-auto p-3">

            <img className="h-36 mx-auto text-center" src="https://i.imgur.com/jZR71Ox.png"/>
            <h1 className="text-center text-gray-600 mt-6 text-lg font-semibold">Sorry, the assignment you're looking
                for does not exist.</h1>
            <h1 className="text-center text-gray-400 mt-2 text-sm">Make sure you have entered the correct URL.</h1>
            <div className="w-full mt-8">
                <button type="button" onClick={() => window.location.href = "/dashboard"}
                        className="mx-auto block items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                    <i className="fas fa-chevron-left mr-2"/>Back to dashboard
                </button>
            </div>

        </div>

    </div>)
}

const QuizEditor: InferGetServerSidePropsType<typeof getServerSideProps> = ({session}) => {

//get Quiz ID from URL
    const router = useRouter();
    const {aid} = router.query;
    const [pageData, setPageData] = useState()

    // @ts-ignore


    const [result] = useSubscription({
        query: assignmentSubscription,
        variables: {
            assignmentId: aid
        }
    });

    const {data, fetching, error} = result


    if (error) return <Dialog aria-labelledby="simple-dialog-title"
                              open={true}>
        <div className="p-2 pr-4">
            <DialogTitle id="simple-dialog-title">There was a problem loading this assignment</DialogTitle>
            <DialogContent>
                <p>{JSON.stringify(error)}</p>
            </DialogContent>

            <DialogActions>
                <button type="button" onClick={() => window.location.reload()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-gray-600 text-base leading-6 font-medium rounded-md text-white bg-transparent hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:shadow-outline active:bg-gray-200 transition ease-in-out duration-150">
                    Retry
                </button>
                <button type="button" onClick={() => {
                    window.location.href = '/dashboard'
                }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                    Back to dashboard
                </button>
            </DialogActions>
        </div>


    </Dialog>;


    return (
        <div className="min-h-screen bg-gray-50">
            {fetching ? <LoadingPlaceholder/> : ((!data.assignments_assignment_by_pk) ? <ErrorScreen/> :
                // @ts-ignore
                <PageContent pageData={data} aid={aid} session={session}/>)}
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req});

    return {
        props: {
            session,
        },
    };
};


export default QuizEditor
