import Navbar from "./Navbar";
import JsonDebugBox from "../JsonDebugBox";
import React, {useState} from "react";
import StudentPage from "./StudentPage";



const PageLayout = ({session, course}) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar session={session} title={course.title} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <StudentPage course={course}/>
            </div>


        </div>
    )
}
export default PageLayout
