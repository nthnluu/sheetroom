import QuestionCard from "../components/AssignmentViewer/QuestionCard";

const Exam = () => {
    return(
        <div className="min-h-screen text-gray-800">
            <div className="py-2 px-4 md:px-8 bg-white shadow flex justify-between items-center fixed w-full navbar">
                <h1 className="text-lg font-semibold text-gray-900">Semester 2 Final</h1>
                <button type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                    Submit
                </button>
            </div>
            <div className="mx-auto max-w-4xl pt-24 px-4 space-y-4">
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>


            </div>
            </div>
    )
}

export default Exam
