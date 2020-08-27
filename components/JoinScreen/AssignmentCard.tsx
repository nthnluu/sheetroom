import React, {useState} from "react";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import JsonDebugBox from "../JsonDebugBox";

interface Props {
    onStart: any;
    data: any;
}

const AssignmentCard: React.FC<Props> = ({onStart, data}) => {
    const [isLoading, toggleIsLoading] = useState(false);

    // return <JsonDebugBox content={data}/>
    return <div className="bg-white border border-gray-200 shadow-lg w-full p-8 rounded-lg">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">{data.assignmentByAssignment.title}</h1>
            <h2 className="text-lg font-light text-gray-500">Assigned by {data.assignmentByAssignment.user.first_name} {data.assignmentByAssignment.user.last_name}</h2>
        </div>
        {data.submissions ? (data.submissions.length > 0 ? <div className="flex justify-end w-full mt-6 items-center">
            <p className="mr-4 text-gray-400">You started this assignment {moment(data.submissions[0].created_at).fromNow()}</p>
            <button type="button" onClick={() => window.location.href = "/view/" + data.submissions[0].id}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                Resume
            </button>
        </div>: <div className="flex justify-end w-full mt-6 items-center">
            <button type="button" onClick={() => {toggleIsLoading(true); onStart()}}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Start
            </button>
        </div>) : <div className="flex justify-end w-full mt-6 items-center">
            <button type="button" onClick={() => {toggleIsLoading(true); onStart()}}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
                {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Start
            </button>
        </div>}

    </div>
}

export default AssignmentCard
