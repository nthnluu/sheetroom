import AdminPageLayout from "../../../Components/AdminPageLayout";
import {useRouter} from 'next/router'
import {QUIZ} from "../../../gql/quizzes";
import {useQuery} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";


const QuizEditor = ({user}) => {
    const router = useRouter();
    const {qid} = router.query;

    const { loading, error, data } = useQuery(QUIZ, {
        variables: { id: qid },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (<AdminPageLayout user={user}>
        <div className="py-12">
            <header>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                        {data.quiz_by_pk.title}
                    </h1>
                    <h2 className="text-gray-500 mt-1">{data.quiz_by_pk.description}</h2>
                </div>
            </header>
            <main className="mt-6">
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                </section>
            </main>
        </div>
    </AdminPageLayout>)
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
