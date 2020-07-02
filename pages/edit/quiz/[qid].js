import {useRouter} from 'next/router'
import {QUIZ} from "../../../gql/quizzes";
import {useQuery} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import DnDList from "../../../Components/QuizEditor/DragAndDrop";

const quizSampleData = {
    title: "Semester 2 Final",
    description: "Lorem ipsum dolor sit anem.",
    items: [
        {
            id: '11111111', type: "MC", question: "How many days are in a week?", choices: [
                {id: "11111a", text: "365 days", isCorrect: true},
                {id: "11111b", text: "366 days", isCorrect: false},
                {id: "11111c", text: "367 days", isCorrect: false},
                {id: "11111d", text: "368 days", isCorrect: false}
            ]
        },
        {
            id: '22222222', type: "MC", question: "How many days are in a month?", choices: [
                {id: "22222a", text: "30 days", isCorrect: true},
                {id: "22222b", text: "33 days", isCorrect: false},
                {id: "22222c", text: "35 days", isCorrect: false},
                {id: "22222d", text: "37 days", isCorrect: false}
            ]
        }
    ]
}

const QuizEditor = ({user}) => {
    const router = useRouter();
    const {qid} = router.query;

    const {loading, error, data} = useQuery(QUIZ, {
        variables: {id: qid},
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto">
                <DnDList items={quizSampleData.items}/>
            </div>
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
