import {useRouter} from 'next/router'
import {QUIZ} from "../../../gql/quizzes";
import {useQuery} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import DnDList from "../../../Components/QuizEditor/DragAndDrop";
import AppLayout from "../../../Components/AppLayout";
import CreateQuizModal from "../../../Components/Modals/CreateQuizModal";

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
        },{
            id: '333333333', type: "MC", question: "How many days are in a month?", choices: [
                {id: "333333333a", text: "30 days", isCorrect: true},
                {id: "333333333b", text: "33 days", isCorrect: false},
                {id: "333333333c", text: "35 days", isCorrect: false},
                {id: "333333333d", text: "37 days", isCorrect: false}
            ]
        },
        {
            id: '4444444', type: "MC", question: "How many days are in a month?", choices: [
                {id: "344444443333a", text: "30 days", isCorrect: true},
                {id: "3333444444433333b", text: "33 days", isCorrect: false},
                {id: "3333444444433333c", text: "35 days", isCorrect: false},
                {id: "3333444444433333d", text: "37 days", isCorrect: false}
            ]
        }
    ]
};

const PageContent = () =>{
    return (
        <div>
            <DnDList items={quizSampleData.items}/>
        </div>
    )
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
        <div className="min-h-screen bg-gray-50">
            <AppLayout title={quizSampleData.title} content={<PageContent/>} questionMenu editableTitle/>
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
