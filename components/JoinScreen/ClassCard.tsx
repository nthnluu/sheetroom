import React from "react";


interface Props {
    firstName: string;
    lastName: string;
    title: string;
}

const ClassCard: React.FC<Props> = ({firstName, lastName, title}) => {
    return <div className="p-6 bg-white shadow rounded-lg">
        <h1 className="text-gray-400">{firstName} {lastName} invited you to join</h1>
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>

        <div className="flex justify-end mt-2">
            <button type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                Join class
            </button>
        </div>
    </div>
}

export default ClassCard
