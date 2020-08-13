import Navbar from "../components/PageLayouts/AppLayout/Navbar";

const Exam = () => {
    return(
        <>
            <div className="py-2 px-4 md:px-8 bg-white shadow flex justify-between items-center">
                <h1 className="text-lg font-semibold text-gray-900">Semester 2 Final</h1>
                <button type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                    Submit
                </button>

            </div>
            </>
    )
}

export default Exam
