import Navbar from "./Navbar";
import React, {useState} from "react";
import StudentPage from "./StudentPage";
import Submissions from "./Submissions";
import Invites from "./Invites";
import Settings from "./Settings";



const PageLayout = ({session, course, profileData, courseId}) => {
    const [currentPage, setCurrentPage] = useState(profileData.data.users_by_pk.account_type === "teacher" ? 1 : 2);


    return (
        <div className="min-h-screen bg-gray-100">
            {/*// @ts-ignore*/}
            <Navbar session={session} classId={courseId} profileData={profileData} joinCode={course.join_code} title={course.title} setCurrentPage={setCurrentPage} currentPage={currentPage}/>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {currentPage === 1 ? <StudentPage course={course} profileData={profileData}/> : null}
                {currentPage === 2 ? (profileData.data.users_by_pk.account_type === "teacher" ? <Invites course={courseId} session={session}/>:<Submissions course={courseId} session={session}/>) : null}
                {currentPage === 4 ? <Settings classId={courseId} session={session} profileData={profileData}/> : null}

            </div>


        </div>
    )
}
export default PageLayout
