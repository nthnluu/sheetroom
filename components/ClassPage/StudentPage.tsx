import React from "react";
import JsonDebugBox from "../JsonDebugBox";


const NoStudentsPlaceholder = ({joinCode}) => {
    return (<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center overflow-x-auto">
            <img src="/holding-phone-monochrome.svg" className="h-64 mx-auto mb-2" alt=""/>
            <h1 className="text-lg sm:text-xl text-gray-700 font-medium">Now invite students with this link:</h1>
            <span className="text-lg sm:text-xl md:text-3xl font-light text-gray-400">sheetroom.com/join/</span><span
            className="text-lg sm:text-xl md:text-3xl  font-bold text-gray-800">{joinCode}</span>
        </div>
    </div>)
}


const StudentPage = ({course}) => {
    return (
        <>
            {course.studentProfiles.length > 0 ? <>
                <h1 className="text-2xl text-gray-800 font-semibold mr-1 mb-4 mt-10">People</h1>
                <ul className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                    {/*students*/}
                    <li className="col-span-1 bg-white rounded-lg shadow">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 leading-5 font-medium truncate">{`${course.user.first_name} ${course.user.last_name}`}
                                        <span
                                            className="inline-flex ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium leading-4 bg-blue-100 text-blue-800">
  TEACHER
</span></h3>
                                </div>
                                <p className="mt-1 text-gray-500 text-sm leading-5 truncate">{course.user.email}</p>
                            </div>
                            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                 src={course.user.image ? course.user.image : "/profile.jpg"}
                                 alt=""/>
                        </div>
                    </li>
                    {course.studentProfiles.map(student => <li key={student.user.id} className="col-span-1 bg-white rounded-lg shadow">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 leading-5 font-medium truncate">{`${student.user.first_name} ${student.user.last_name}`}</h3>
                                </div>
                                <p className="mt-1 text-gray-500 text-sm leading-5 truncate">{student.user.email}</p>
                            </div>
                            <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                 src={student.user.image ? student.user.image : "/profile.jpg"}
                                 alt=""/>
                        </div>
                    </li>)}


                </ul>
            </> : <NoStudentsPlaceholder joinCode={course.join_code}/>}
        </>)
}

export default StudentPage
