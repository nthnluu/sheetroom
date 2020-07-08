import AssignmentLayout from "../Components/AssignmentLayout";
import QuestionFrame from "../Components/Questions/QuestionFrame";
import {useQuery} from "@apollo/react-hooks";
import {ASSIGNMENT} from "../gql/quizzes";
import {getSession} from "next-auth/client";
import Dashboard from "./dashboard";


const PageContent = ({data}) => {
    const assignment = {
        title: 'Semester 2 Final',
        config: {},
        questions: [
            {
                id: '129frgbs',
                type: "MC",
                content: 'The conditions shown in the image depict which of the following trends in the late nineteenth century?',
                choices: ['The growing gap between wealthy people and people living in poverty',
                    'The rise of the settlement house and Populist movements',
                    'The increased corruption in urban politics',
                    'The migration of African Americans to the North'],
                response: ''
            }, {
                id: '12dawdad9bs',
                type: "SA",
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
                response: 'Choice A'
            },
            {
                id: '129basasdadsds',
                type: "MC",
                content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                response: ''
            }
        ]

    };

    return (
        <>
            {data.assignments_assignment_by_pk.sections[0].items.map((item, index) => <article key={item.id} className="bg-white overflow-hidden rounded-lg my-8 border border-gray-300 shadow-sm">
                <div className="p-6 sm:p-8">
                    <QuestionFrame item={item} index={index}/>
                </div>
            </article>)}
        </>

    )
}
const Assignment = () => {
    const aid = "cd451222-0116-4e3b-b33a-0e21efa02837";
    const {loading, error, data} = useQuery(ASSIGNMENT, {
        variables: {id: aid},
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (<AssignmentLayout title={data.assignments_assignment_by_pk.title} content={<PageContent data={data}/>}/>)
}

Assignment.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
            return;
        } else {
            return {session: session, user: session.user}
        }
    }
};
export default Assignment
