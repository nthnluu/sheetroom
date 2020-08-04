import QuestionFrame from "./Questions/QuestionFrame";

const AssignmentLayout = ({content, title}) => {

    return (
        <>
            <nav className="bg-white shadow fixed top-0 w-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto" src="/hw_symbol.svg"
                                     alt="Workflow logo"/>
                                <img className="hidden lg:block h-8 w-auto" src="/hw_logo.svg"
                                     alt="Workflow logo"/>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <button type="button"
                                        className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                                    <span>Submit<i className="fas fa-arrow-right ml-2"></i></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="py-10">
                <header>
                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-20">
                        <h1 class="text-3xl font-bold leading-tight text-gray-900">
                            {title}
                        </h1>
                    </div>
                </header>
                <main>
                    <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
                        <div class="px-4 sm:px-0">
                            {content}
                            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                        </div>
                    </div>
                </main>
            </div>
        </>)
};

export default AssignmentLayout
