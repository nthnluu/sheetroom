import Navbar from "../Components/Navbar/Navbar";
import QuestionFrame from "../Components/Questions/QuestionFrame";
import {useState} from "react";

export default function () {
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
                id: '129bs',
                type: 1,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.',
                choices: ['Choice A', 'Choice B', 'Choice C', 'Choice D']
            }, {
                id: '129basds',
                type: 2,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur doloremque doloribus ea in iure magnam tempora tenetur veniam vero voluptatem! A cumque delectusmagnam quia, rem rerum sint veniam. Fugit.'
            }
        ]

    }

    return (<>
        <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} exam sticky/>
        <div className="py-10 my-20">
            <header className="mb-8">
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-900">
                        {assignment.title}
                    </h1>
                </div>
            </header>
            <main>
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    {/*// <!-- Replace with your content -->*/}
                    {assignment.questions.map(question => <div className="examCard mb-12">
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

}

class AssignmentWindow extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    componentDidMount() {
        this.textInput.current.focus();
    }
    render() {
        return <input ref={this.textInput} />;
    }
}
