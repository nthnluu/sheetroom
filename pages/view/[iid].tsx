import QuestionCard from "../../components/AssignmentViewer/QuestionCard";
import {useMutation, useSubscription} from "urql";
import AssignmentViewerContext from "../../components/AssignmentViewer/AssignmentViewerContext";
import React, {useCallback, useEffect, useState} from "react";
import {getSubmissionByPk, scoreAssignment, updateSubmissionContent} from "../../lib/graphql/Submissions";
import {GetServerSideProps} from "next";
import {useRouter} from "next/router";
import {debounce} from 'lodash'
import Timer from "../../components/Misc/Timer";
import Head from "next/head";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckForUser from "../../lib/CheckForUser";
import update from "immutability-helper";
import moment from "moment";
import SubmittingModal from "../../components/Modals/SubmittingModal";
import {usePageVisibility} from "../../lib/useVisibility";
import shuffleArray from "../../lib/shuffleArray";

const PageContent = ({pageRawData, iid, inviteConfig}) => {

    const [pageData] = useState(pageRawData)
    const [document, setDocument] = useState(pageData.content);

    const [allowedSections, setAllowedSections] = useState(document.config.sections.filter(element => {
        if (!document.sections[element].config.end_time) {
            return true
        } else if (moment(document.sections[element].config.end_time).isAfter(moment())) {
            return true
        } else {
            return false
        }
    }))

    const [canContinue] = useState(() => {
        if (document.config.timing === 2) {
            if (document.config.end_time) {
                return moment(document.config.end_time).isAfter(moment())
            } else {
                return true
            }
        } else {
            return true
        }
    })

    const [currentSection, setCurrentSection] = useState(0)
    const sectionId = allowedSections[currentSection]

    const isLastSection = (sectionId) => {
        const lastSectionId = document.config.sections[document.config.sections.length - 1]
        return sectionId === lastSectionId
    }
    const [saveStatus, setSaveStatus] = useState(0)


    const [mutateSubmissionResult, mutateSubmission] = useMutation(updateSubmissionContent)
    const [scoreSubmissionResult, scoreSubmissionMutate] = useMutation(scoreAssignment)
    const [isLoading, toggleIsLoading] = useState(false);

    const inviteConfigObject = JSON.parse(inviteConfig)

    const saveAssignment = (newDocument) => {
        setSaveStatus(1)
        mutateSubmission({submissionId: iid, content: newDocument})
            .then((result) => console.log(result))
            .catch(() => setSaveStatus(2))

    }

    //Autosave Logic
    const delayedMutation = useCallback(debounce(newDocument => saveAssignment(newDocument), 1000), []);
    useEffect(() => {
        delayedMutation({content: document, title: pageData.title})
    }, [document])

    const isVisible = usePageVisibility();

    const logEvent = (label, data) => {
        setDocument(prevState => {
            return update(prevState, {
                    config: {
                        event_log: {
                            $push: [{[label]: data}]
                        }
                    }
                }
            )
        })

    }

    useEffect(() => {
        if (isVisible) {
            logEvent('user_in_tab', moment())
        } else {
            logEvent('user_exit_tab', moment())
            if (inviteConfigObject.submitOnLeave) {
                submitAssignment()
            }
        }

    }, [isVisible])

    const submitAssignment = () => {
        toggleIsLoading(true)
        setDocument(prevState => {
            return update(prevState, {
                    config: {
                        submitted_at: {
                            $set: Date.now()
                        }
                    }
                }
            )
        })
        saveAssignment({content: document, title: pageData.title})
        scoreSubmissionMutate({submissionId: iid})
            .then(() => window.location.href = '/results/' + iid + '?status=success')
            .catch(error => console.log(scoreSubmissionResult.error));
    }


    const handleContinue = () => {
        setCurrentSection(currentSection + 1)
        setShuffledItems(shuffleArray(document.sections[sectionId].items))
        if (document.config.timing === 1) {
            setDocument(prevState => {
                return update(prevState, {
                        config: {
                            current_section: {
                                $set: currentSection + 1
                            }
                        },
                        sections: {
                            [sectionId]: {
                                config: {
                                    end_time: {
                                        $set: Date.now()
                                    }
                                }
                            }
                        }
                    }
                )
            })
        } else {
            setCurrentSection(currentSection + 1)
        }
    }



    const [shuffledItems, setShuffledItems] = useState(shuffleArray(document.sections[sectionId].items))
    const shuffledOrNot = document.sections[sectionId].config.shuffle ? shuffledItems : document.sections[sectionId].items

    if (allowedSections.length < 1 || !canContinue) {
        scoreSubmissionMutate({submissionId: iid})
            .then(() => window.location.href = '/results/' + iid + '?status=success')
            .catch(error => console.log(scoreSubmissionResult.error));
        return <></>
    } else {
        return (
            <AssignmentViewerContext.Provider value={{document, setDocument, logEvent, inviteConfigObject}}>
                <SubmittingModal isOpen={isLoading}/>
                <div className={"min-h-screen text-gray-800 " + (inviteConfigObject.disableTextSelect ? "select-none" : null)}>
                    {/*//Navbar*/}
                    <div
                        className="py-3 px-4 lg:px-8 bg-white shadow flex justify-between items-center fixed w-full navbar">
                        <h1 className="text-lg font-semibold text-gray-800">{pageData.title}</h1>
                        {/*@ts-ignore*/}
                        {document.config.timing !== 0 ? <Timer global={document.config.timing === 2} section={sectionId}
                                                               onFinish={document.config.timing === 2 ? () => submitAssignment() : () => {
                                                                   if (isLastSection(sectionId)) {
                                                                       submitAssignment()
                                                                   } else {
                                                                       handleContinue()
                                                                   }
                                                               }}/> : null}
                    </div>
                    {/*Section Page*/}
                    <div className="mx-auto max-w-4xl pt-20 px-4 space-y-6 mb-16">
                        <div className="leading-tight">
                            {document.config.sections.length > 1 ? <span
                                className="font-medium text-gray-400 text-sm">{document.config.sections.findIndex(element => element === sectionId) + 1} of {document.config.sections.length}</span> : null}
                            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mr-2">{document.sections[sectionId].title}</h1>
                        </div>
                        {shuffledOrNot.map(item => (<QuestionCard item={item} key={item}/>))}
                        <div className="flex-row sm:flex items-center justify-between mt-4">
                            {(document.config['timing'] === 1 && (parseInt(document.sections[sectionId].config.hours) + parseInt(document.sections[sectionId].config.mins) > 0)) ?
                                <span
                                    className="text-red-600 rounded-lg px-2 py-1 border border-red-600 items-center flex justify-start">
                            <svg className="h-5 inline mr-1" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            You can't return to this section.</span> : <div/>}
                            <div className="flex-row-reverse sm:flex-row sm:flex">
                                {currentSection !== 0 && document.config.timing !== 1 ?
                                    <button type="button" onClick={() => {
                                        window.scrollTo(0, 0);
                                        setCurrentSection(currentSection - 1)
                                    }}
                                            className="w-full sm:w-auto mt-2 sm:mt-0 items-center px-4 py-2 mr-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150">
                                        Previous
                                    </button> : null}

                                {isLastSection(sectionId) || document.config.sections.length === 1 ?
                                    <button type="button" onClick={submitAssignment} disabled={isLoading}
                                            className={"w-full text-center sm:w-auto mt-2 sm:mt-0 flex px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-gray-300 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 " + (isLoading ? "items-center" : "items-end")}>
                                      <span className="mx-auto">
                                           {isLoading ? <CircularProgress color="inherit" size={15}
                                                                          className="mr-2 h-auto inline-block"/> :
                                               <svg className="h-6 mr-1 inline-block -mt-1" viewBox="0 0 24 24"
                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3"
                                                         strokeLinecap="round" strokeLinejoin="round"/>
                                               </svg>} {isLoading ? "Submitting" : "Submit"}
                                      </span>

                                    </button> : <button type="button" onClick={handleContinue}
                                                        className="w-full sm:w-auto mt-2 sm:mt-0 items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                        Continue
                                    </button>}

                            </div>

                        </div>
                    </div>
                </div>
            </AssignmentViewerContext.Provider>)
    }


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
    if (!data) return (<div className="pt-56">
        <Head>
            <title>Sheetroom</title>
        </Head>
        <div className="mx-auto">
            <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
            <h1 className="text-center text-gray-400 mt-4">Hang on, we're loading this page</h1>
        </div>

    </div>)

    if (error) return <h2>{JSON.stringify(error)}</h2>

    if (data.assignments_submission_by_pk.is_complete) {
        window.location.href = '/results/' + iid + '?status=success'
        return null
    } else {
        return <PageContent pageRawData={data.assignments_submission_by_pk.content} inviteConfig={data.assignments_submission_by_pk.inviteByInvite.config} iid={iid}/>
    }
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res)
};

export default ExamViewer
