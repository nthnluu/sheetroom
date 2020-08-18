import QuestionCard from "../../components/AssignmentViewer/QuestionCard";
import {useMutation, useQuery, useSubscription} from "urql";
import AssignmentViewerContext from "../../components/AssignmentViewer/AssignmentViewerContext";
import React, {useCallback, useEffect, useState} from "react";
import {getSubmissionByPk, updateSubmissionContent} from "../../lib/graphql/Submissions";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {useRouter} from "next/router";
import {assignmentSubscription, updateAssignmentContent} from "../../lib/graphql/Assignments";
import JsonDebugBox from "../../components/JsonDebugBox";
import {debounce} from 'lodash'

const PageContent = ({pageRawData, iid}) => {

    const [pageData, setPageData] = useState(pageRawData)
    const [document, setDocument] = useState(pageData.content);
    const [currentSection, setCurrentSection] = useState(0)
    const sectionId = document.config.sections[currentSection]
    const [saveStatus, setSaveStatus] = useState(0)

    const [mutateSubmissionResult, mutateSubmission] = useMutation(updateSubmissionContent)

    const saveAssignment = (newDocument) => {
        console.log(newDocument)
        setSaveStatus(1)
        mutateSubmission({submissionId: iid, content: newDocument})
            .then((result) => console.log(result))
            .catch(() => setSaveStatus(2))

    }

    //Autosave Logic
    const delayedMutation = useCallback(debounce(newDocument => saveAssignment(newDocument), 1000), []);
    useEffect(() => {
        console.log({content: document, ...pageData})
        delayedMutation({content: document, title: pageData.title})
    }, [document])




    return (
        <AssignmentViewerContext.Provider value={{document, setDocument}}>
            <div className="min-h-screen text-gray-800">
                <div
                    className="py-3 px-4 md:px-8 bg-white shadow flex justify-between items-center fixed w-full navbar">
                    <h1 className="text-lg font-semibold text-gray-800">{pageData.title}</h1>
                </div>
                <div className="mx-auto max-w-4xl pt-20 px-4 space-y-4 mb-16">
                    <div className="leading-tight">
                        <span
                            className="text-sm uppercase rounded-full font-semibold text-gray-400">Section {document.config.sections.findIndex(element => element === sectionId) + 1} of {document.config.sections.length}</span>
                        <h1 className="text-3xl font-semibold text-gray-800 mr-2">{document.sections[sectionId].title}</h1>
                    </div>
                    {document.sections[sectionId].items.map(item => (<QuestionCard item={item} key={item}/>))}
                    <div className="flex-row sm:flex items-center justify-between mt-4">
                        {document.config['timing'] !== 1 ? <span className="text-red-600 rounded-lg px-2 py-1 border border-red-600 items-center flex justify-start">
                            <svg className="h-5 inline mr-1" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            You can't return to this section.</span> : <div/>}

                            <div className="flex-row-reverse">
                                {currentSection !== 0 ? <button type="button" onClick={() => {window.scrollTo(0, 0);
                                setCurrentSection(currentSection - 1)}}
                                                                className="w-full sm:w-auto mt-2 sm:mt-0 items-center px-4 py-2 mr-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150">
                                    Previous
                                </button> : null}

                                <button type="button" onClick={() => setCurrentSection(prevState => {if (prevState !== document.config.sections.length -1) {
                                    window.scrollTo(0, 0);
                                    return currentSection + 1
                                }})}
                                        className="w-full sm:w-auto mt-2 sm:mt-0 items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                    Continue
                                </button>
                            </div>

                    </div>
                </div>
            </div>
        </AssignmentViewerContext.Provider>)
}

const ExamViewer = ({session}) => {
    const router = useRouter();
    const {iid} = useRouter().query

    // @ts-ignore
    const handleSubscription = (messages = [], response) => {
        return response;
    };


    const [res] = useSubscription({
        query: getSubmissionByPk,
        variables: {
            submissionId: iid
        }
    }, handleSubscription);

    const {data, fetching, error} = res
    if (!data) return <h1>loading</h1>

    if (error) return <h2>{JSON.stringify(error)}</h2>

    return <PageContent pageRawData={data.assignments_submission_by_pk.content} iid={iid}/>

}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (!session) {
        return {
            props: {
                session: null
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};

export default ExamViewer
