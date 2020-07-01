import Navbar from "../Components/Navbar/Navbar";
import QuestionFrame from "../Components/Questions/QuestionFrame";
import {useState} from "react";
import {useQuery} from '@apollo/react-hooks';
import {ASSIGNMENT} from '../gql/getAssignment';

const Assignment = () => {
    const {loading, error, data} = useQuery(ASSIGNMENT);
    if (error) return <h1>{error.message}</h1>;
    if (loading) return <h1>Loading...</h1>;

    const [navBarItems, setNavBarItems] = useState({
        links: [
            {icon: 'fas fa-sync fa-spin mr-2', label: 'Saving'},
            // {icon: 'fas fa-check mr-2', label: 'Saved'},
            {icon: 'fas fa-clock mr-2', label: '30:29'}],
        actionButtons: {primary: {label: 'Submit'}, secondary: {label: ''}}
    });

    const assignment = {
        title: 'Semester 2 Final',
        config: {},
        questions: [
            {
                id: '129frgbs',
                type: 1,
                text: 'The conditions shown in the image depict which of the following trends in the late nineteenth century?',
                choices: ['The growing gap between wealthy people and people living in poverty',
                    'The rise of the settlement house and Populist movements',
                    'The increased corruption in urban politics',
                    'The migration of African Americans to the North'],
                response: ''
            }, {
                id: '12dawdad9bs',
                type: 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D'],
                response: 'Choice A'
            },
            {
                id: '129basasdadsds',
                type: 2,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                response: ''
            }
        ]

    };

    return (<>
        <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} exam sticky/>
        <div className="py-10 mt-20">
            <header className="mb-8" role="banner">
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                        {data.assignment.title}
                    </h1>
                </div>
            </header>
            <main className="relative">
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    {data.assignment.questions.map((question, index) => <article key={question.id} className="examCard mb-6"
                                                                            aria-label={'Question ' + (index + 1)}>
                        <div className="p-6 sm:p-8">

                            <QuestionFrame question={question} index={index}/>
                        </div>
                    </article>)}
                </div>
            </main>
        </div>
    </>)

};

export default Assignment;
