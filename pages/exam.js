import Navbar from "../Components/Navbar/Navbar";
import QuestionFrame from "../Components/Questions/QuestionFrame";
import {useState} from "react";

export default function () {
    const [saving, setSaving] =  useState(true);

    const [navBarItems, setNavBarItems] = useState({
        links: [
            {icon: 'fas fa-sync fa-spin mr-2', label: 'Saving'},
            // {icon: 'fas fa-check mr-2', label: 'Saved'},
            {icon: 'fas fa-clock mr-2', label: '30:29'}],
        actionButtons: {primary: {label: 'Submit'}, secondary: {label: ''}}
    });

    return (<>
        <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} exam sticky/>
        <div className="py-10 my-16">
            <header>
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">
                        Semester 2 Final
                    </h1>
                </div>
            </header>
            <main>
                <div className="max-w-4xl mx-auto px-4 lg:px-0">
                    {/*// <!-- Replace with your content -->*/}
                    <div className="examCard">
                        <div className="p-8">
                            {/*// <!-- Content goes here -->*/}
                            <QuestionFrame/>
                        </div>
                    </div>
                    {/*// <!-- /End replace -->*/}
                </div>
            </main>
        </div>
    </>)

}
