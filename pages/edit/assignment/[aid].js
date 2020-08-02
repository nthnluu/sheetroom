import {useRouter} from 'next/router'
import {useMutation, useSubscription} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import Head from 'next/head'
import React, {useCallback, useEffect, useState} from "react";
import QuizContext from "../../../Components/QuizEditor/QuizContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import {UPDATE_ASSIGNMENT_CONTENT} from "../../../gql/assignmentAutosave";
import {v4 as uuidv4} from 'uuid';
import {ASSIGNMENT_WS} from "../../../gql/quizzes";
import {debounce} from 'lodash'
import EditorLayout from "../../../Components/QuizEditor/EditorLayout";
import JsonDebugBox from "../../../Components/JsonDebugBox";
import Navbar from "../../../Components/PageLayouts/AppLayout/Navbar";
import {Snackbar} from "@material-ui/core";


const PageContent = ({pageData, aid}) => {
    // A client ID to identify the current user working on the project
    const [clientId] = useState(uuidv4())

    //Stores the current state of the document
    // const [assignment, setAssignment] = useState(data.assignments_assignment_by_pk.content ? data.assignments_assignment_by_pk.content : initialDocumentContent);
    const [document, setDocument] = useState(pageData.assignments_assignment_by_pk.content);
    const [documentHistory, setDocumentHistory] = useState([pageData.assignments_assignment_by_pk.content]);
    const [undoIndex, setUndoIndex] = useState(0);

    //Tracks the save status -- 0: saved; 1: saving; 2: error
    const [saveStatus, setSaveStatus] = useState(0);
    const [invalidSession, setInvalidSession] = useState(false);

    const [mutateAssignment] = useMutation(UPDATE_ASSIGNMENT_CONTENT)

    const saveAssignment = (newDocument) => {
        setDocumentHistory([document, ...documentHistory])
        setSaveStatus(1)
        mutateAssignment({variables: {clientId: clientId, id: aid, content: newDocument}})
            .then(() => setSaveStatus(0))
            .catch(() => setSaveStatus(2))
    }

    const delayedMutation = useCallback(debounce(newDocument => saveAssignment(newDocument), 1000), []);

    useEffect(() => {
        delayedMutation(document)
    }, [document])


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

    const undo = () => {
        setDocument(documentHistory[undoIndex])
        setUndoIndex(undoIndex+1)
    }

    return (
        <QuizContext.Provider value={{
            document,
            aid,
            saveStatus,
            setSaveStatus,
            undo,
            setDocument,
            clientId,
            invalidSession,
        }}>

            {/*<button onClick={() => setDocument(documentHistory[0])}>undo</button>*/}
            <EditorLayout aid={aid} windowTitle="Sheetroom"/>
        </QuizContext.Provider>
    )
};

const LoadingPlaceholder = () => {
    return (
        <div className="pt-56">
            <Head>
                <title>Homework</title>
            </Head>
            <div className="mx-auto">
                <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
                <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
            </div>

        </div>
    )
};


const QuizEditor = ({user, session}) => {

//get Quiz ID from URL
    const router = useRouter();
    const {aid} = router.query;


    const {loading, error, data} = useSubscription(ASSIGNMENT_WS, {
        variables: {assignmentId: aid},
    });
    if (error) return `Error! ${JSON.stringify(error)}`;


    return (
        <div className="min-h-screen bg-gray-50" key={aid}>
            {loading ? <LoadingPlaceholder/> : <PageContent pageData={data} aid={aid}/>}
        </div>
    )
};

QuizEditor.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
        } else {
            return {session: session, user: session.user}
        }
    }


};

export default QuizEditor
