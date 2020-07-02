import {useEffect, useRef, useState} from "react";
import Transition from "../Components/Transition";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import Dashboard from "./dashboard";

const QUIZZES = gql`
query Quizzes($userId: Int!){
  quiz(where: {created_by: {_eq: $userId}}) {
    id,
    title,
    description,
    quiz_topic {
      color
      title
    }
  }
}
`;

function useOutsideAlerter(ref, toggleTextbox) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleTextbox();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

function QuizCard({title, tag, color, selected, id}) {

    function DotMenu() {
        const [isOpen, toggleMenu] = useState(false);
        return (<div className="relative">
            <div>
                <button onClick={() => toggleMenu(!isOpen)}
                        className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                        aria-label="Options" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                    </svg>
                </button>
            </div>

            <Transition show={isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
                    <div className="rounded-md bg-white shadow-xs">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#"
                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">Account settings
                            </a>
                            <a href="#"
                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">Support
                            </a>
                            <a href="#"
                               className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                               role="menuitem">License
                            </a>
                            <form method="POST" action="#">
                                <button type="submit"
                                        className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                        role="menuitem">
                                    Sign out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>)

    }

    return (<a href={'/edit/quiz/' + id}
               className="h-96 bg-white rounded-lg hover:shadow-xl transition-all duration-300 relative p-8 focus:shadow-outline focus:outline-none text-left">
        <div className="absolute top-0 pt-8">
            <div>
                <div className="">
                    <input id="select" type="checkbox"
                           className="form-checkbox h-6 w-6 text-blue-600 transition duration-150 ease-in-out"/>
                </div>

            </div>
        </div>
        <div className="absolute bottom-0 pb-8">
            {!selected ? <span
                    className={"py-1 px-2 bg-" + color + "-100 text-" + color + "-700 font-medium rounded-lg"}>{tag}</span> :
                <span className={"py-1 px-2 bg-" + color + "-600 text-white font-medium rounded-lg"}>{tag}</span>}
            <h3 className="font-semibold text-xl text-gray-900 pt-2">{title}</h3>
            <div className="text-gray-900 font-medium mt-4">
                <i className="fas fa-question mr-2 text-gray-300"/>12
            </div>
        </div>
    </a>)
}

function Sidebar() {
    const [textBox, toggleTextBox] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, ()=>toggleTextBox(false));
    function Item({active, label, color}) {
        return (
            <li>
                <button
                    className={active ? "font-medium w-full text-left text-gray-800 bg-white p-3 rounded-lg shadow-lg mb-2" : "font-medium w-full text-left text-gray-400 p-3 mb-2 hover:text-gray-500 transition-all duration-200"}>{color ?
                    <span className={"mr-2 text-" + color + "-500"}>•</span> : null}{label}</button>
            </li>

        )

    }

    function ColorSelector() {
        return (<div className="flex justify-between text-xs py-4">
            <i className="far fa-dot-circle text-gray-400"/>
            <i className="fas fa-circle text-red-400"/>
            <i className="fas fa-circle text-orange-400"/>
            <i className="fas fa-circle text-yellow-400"/>
            <i className="fas fa-circle text-green-400"/>
            <i className="fas fa-circle text-teal-400"/>
            <i className="fas fa-circle text-blue-400"/>
            <i className="fas fa-circle text-purple-400"/>
            <i className="fas fa-circle text-pink-400"/>

        </div>)
    }

    return (<div className="w-64">
        <h2 className="text-gray-500 text-lg font-semibold">TOPICS</h2>
        <nav>
            <ul className="mt-4">
                <Item active label="All"/>
                <Item label="AP Biology" color="green"/>
                <Item label="AP Calculus" color="pink"/>
                <Item label="AP US History" color="orange"/>
                <Item label="AP Psychology" color="red"/>
                <li ref={wrapperRef}>
                    {textBox ? <><div>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <div className="relative flex-grow focus-within:z-10">
                                <input id="email"
                                       className="form-input block w-full rounded-none rounded-l-md transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                       placeholder="New Topic Name"/>
                            </div>
                            <button
                                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                                <i className="fas fa-plus text-gray-400"/>
                            </button>
                        </div>
                    </div><ColorSelector/></>:<button onClick={()=>toggleTextBox(!textBox)} className="font-light text-gray-400 p-3 w-full text-left mb-2 hover:text-gray-500 transition-all duration-200"><i className="fas fa-plus mr-2"/>Create Topic</button>}

                </li>


            </ul>
        </nav>
    </div>)
}

function QuizGrid({userId}) {
    const {loading, error, data} = useQuery(QUIZZES, {variables: {userId: userId}});

    return (<>
        {loading ? <div className="mx-auto text-center w-full">
            <i className="fas fa-circle-notch text-6xl fa-spin text-gray-200"/>
        </div> : <div
            className="ml-8 md:ml-16 lg:ml-24 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full ">
            {data.quiz.map(item => <QuizCard title={item.title} id={item.id}
                                             tag={item.quiz_topic ? item.quiz_topic.title : null}
                                             color={item.quiz_topic ? item.quiz_topic.color : null}/>)}
        </div>}
    </>)

}

const QuizPage = ({session}) => {
    const [selectedQuizzes, setSelectedQuizzes] = useState([]);
    return (<div className="bg-gray-100 min-h-screen px-6 md:px-12 lg:px-24 py-16">
        <div className="flex justify-start">
            <h1 className="text-5xl font-bold text-gray-800">Quizzes</h1>
        </div>
        <div className="mt-12 flex justify-between">
            <Sidebar/>
            <QuizGrid userId={session.userId}/>


        </div>


    </div>)
}

QuizPage.getInitialProps = async ({res, ...context}) => {
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

export default QuizPage

