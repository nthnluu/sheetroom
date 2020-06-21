import Navbar from "../Components/Navbar/Navbar";
import QuestionFrame from "../Components/Questions/QuestionFrame";
import {useState} from "react";

export default function Assignment() {
    const [saving, setSaving] = useState(true);

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
                    'The migration of African Americans to the North']
            }, {
                id: '12dawdad9bs',
                type: 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D']
            },
            {
                id: '129basasdadsds',
                type: 2,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.'
            }
        ]

    };

    return (<>
        <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} exam sticky/>
        <div className="py-10 mt-20">
            <header className="mb-8" role="banner">
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                        {assignment.title}
                    </h1>
                </div>
            </header>
            <main className="relative">
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    {/*// <!-- Replace with your content -->*/}
                    {assignment.questions.map(question => <div key={question.id} className="examCard mb-6" role="region">
                        <div className="p-6 sm:p-8">
                            {/*// <!-- Content goes here -->*/}
                            <QuestionFrame question={question}/>
                        </div>
                    </div>)}
                    {/*// <!-- /End replace -->*/}
                </div>
            </main>
        </div>
    </>)

};
