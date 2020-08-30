import Navbar from "./Navbar";
import JsonDebugBox from "../JsonDebugBox";
import React, {useState} from "react";
import StudentPage from "./StudentPage";
import Submissions from "./Submissions";



const PageLayout = ({session, course, profileData, courseId}) => {
    const [currentPage, setCurrentPage] = useState(profileData.data.users_by_pk.account_type === "teacher" ? 1 : 2);


    return (
        <div className="min-h-screen bg-gray-100">
            {/*// @ts-ignore*/}
            <Navbar session={session} profileData={profileData} joinCode={course.join_code} title={course.title} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {currentPage === 1 ? <StudentPage course={course}/> : null}
                {currentPage === 2 ? <Submissions course={courseId} session={session}/> : null}

            </div>


        </div>
    )
}
export default PageLayout
