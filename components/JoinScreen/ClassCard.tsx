import React from "react";

interface Props {
    course: any;
    onStart: any;
}
const ClassCard: React.FC<Props> = ({course, onStart}) => {
    return <div className="bg-white border border-gray-200 shadow-lg w-full p-8 rounded-lg">
        <div>
            <h2 className="text-lg font-light text-gray-500">{`${course[0].user.first_name} ${course[0].user.last_name}`} has invited you to join</h2>
            <h1 className="text-2xl font-bold text-gray-800">{course[0].title}</h1>
        </div>


        <div className="flex justify-end w-full mt-6 items-center">
            <button type="button" onClick={onStart}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                Join
            </button>
        </div>
    </div>
}

export default ClassCard
