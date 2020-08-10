import ClassCard from "./ClassCard";
import React from "react";
import {useQuery} from "urql";
import {allClasses} from "../../lib/graphql/Class";
import CircularProgress from "@material-ui/core/CircularProgress";
import exportPage from "next/dist/export/worker";
import JsonDebugBox from "../JsonDebugBox";

const LoadingPlaceholder = () => {
    return (<div className="p-6 border-b border-gray-200">
        <div className="mx-auto">
            <div className="mx-auto w-full text-center"><CircularProgress color="secondary"/></div>
        </div>
    </div>)
};

interface Props {
    session: any;
}

const ClassGrid: React.FC<Props>  = ({session})  => {
    const [result] = useQuery({
        query: allClasses,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    });

    const {fetching, data} = result
    if (fetching) return <LoadingPlaceholder/>;

    return (<ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2 mt-3">
        {data.classes_class.map(course => <ClassCard course={course} title={course.title} color={course.color}/>)}
    </ul>)
}

export default ClassGrid
