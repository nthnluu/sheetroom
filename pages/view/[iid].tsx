import QuestionCard from "../../components/AssignmentViewer/QuestionCard";
import {useQuery} from "urql";
import AssignmentViewerContext from "../../components/AssignmentViewer/AssignmentViewerContext";
import {useState} from "react";
import {getSubmissionByPk} from "../../lib/graphql/Submissions";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import JsonDebugBox from "../../components/JsonDebugBox";
import {useRouter} from "next/router";

const PageContent = ({pageData}) => {

    const [document, setDocument] = useState(pageData.content);


    return (
        <AssignmentViewerContext.Provider value={{document}}>
            <div className="min-h-screen text-gray-800">
                <div
                    className="py-2 px-4 md:px-8 bg-white shadow flex justify-between items-center fixed w-full navbar">
                    <h1 className="text-lg font-semibold text-gray-800">{pageData.title}</h1>
                    <button type="button"
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        Submit
                    </button>
                </div>
                <div className="mx-auto max-w-4xl pt-20 px-4 space-y-4">
                    {document.sections["2ab8decd-b38e-4348-a8bb-92f3b6f400d3"].items.map(item => (<QuestionCard item={item}/>))}

                </div>
            </div>
        </AssignmentViewerContext.Provider>)
}

const ExamViewer = ({session}) => {
    const router = useRouter();
    const {iid} = useRouter().query
    const [result, reexecuteQuery] = useQuery({
        query: getSubmissionByPk,
        variables: {
            submissionId: iid
        }
    })
    const {data, fetching, error} = result;
    const [submission, setSubmission] = useState()


    if (fetching) return <h1>loading</h1>

    if (error) return <h2>{JSON.stringify(error)}</h2>

    return <PageContent pageData={data.assignments_submission_by_pk.content}/>
    // return <JsonDebugBox content={data}/>
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

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
