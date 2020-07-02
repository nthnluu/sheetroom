function QuizCard({title, tag, color, selected}) {
    return (<button className="h-96 bg-white rounded-lg hover:shadow-xl transition-all duration-200 relative p-8 focus:shadow-outline focus:outline-none text-left">
        <div className="absolute top-0 pt-8">
            <div className="flex justify-between">
                <input id="select" type="checkbox"
                       className="form-checkbox h-6 w-6 text-blue-600 transition duration-150 ease-in-out"/>

            </div>
        </div>
        <div className="absolute bottom-0 pb-6">
            {!selected ? <span className={"py-1 px-2 bg-"+color+"-100 text-"+color+"-700 font-medium rounded-lg"}>{tag}</span>: <span className={"py-1 px-2 bg-"+color+"-600 text-white font-medium rounded-lg"}>{tag}</span>}
            <h3 className="font-semibold text-xl text-gray-900 pt-2">{title}</h3>
            <div className="text-gray-900 font-medium mt-4">
                <i className="fas fa-question mr-2 text-gray-300"/>12
            </div>
        </div>
    </button>)
}

function Sidebar() {
    function Item({active, label, color}) {
        return (<li >
            <button className={active ? "font-medium w-full text-left text-gray-800 bg-white p-3 rounded-lg shadow-lg mb-2" : "font-medium w-full text-left text-gray-400 p-3 mb-2 hover:text-gray-500 transition-all duration-200"}>{color ? <span className={"mr-2 text-"+color+"-500"}>•</span> : null}{label}</button>
        </li>)

    }
    return (<div className="w-64 mr-24">
        <h2 className="text-gray-500 text-lg font-semibold">TOPICS</h2>
        <ul className="mt-4">
            <Item active label="All"/>
            <Item label="AP Biology" color="green"/>
            <Item label="AP Calculus" color="pink"/>
            <Item label="AP US History" color="orange"/>
            <Item label="AP Psychology" color="red"/>
            <li className="font-medium text-gray-400 p-3 mb-2 hover:text-gray-500 transition-all duration-200">
                <i className="fas fa-plus mr-2"/>Create Topic
            </li>
        </ul>
    </div>)
}
export default function () {
    return (<div className="bg-gray-100 min-h-screen px-24 py-16">
        <div className="flex justify-start">
            <h1 className="text-5xl font-bold text-gray-800">Quizzes</h1>
        </div>
        <div className="mt-12 flex justify-between">
            <Sidebar/>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                <QuizCard title="Semester 2 Final" tag="AP Biology" color="green"/>
                <QuizCard title="Integrals of Trig Functions Practice" tag="AP Calculus" color="pink" selected/>
                <QuizCard title="Industrial Revolution DBQ Essay" tag="AP US History" color="orange"/>
                <QuizCard title="Applications of the Derivative Exam" tag="AP Calculus" color="pink"/>
                <QuizCard title="Semester 2 Final"/>
                <QuizCard title="Semester 2 Final"/>
                <QuizCard title="Semester 2 Final"/>
                <QuizCard title="Semester 2 Final"/>


            </div>

        </div>


    </div>)
}
