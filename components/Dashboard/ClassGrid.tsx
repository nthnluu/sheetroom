import ClassCard from "./ClassCard";
import React from "react";
import {useQuery} from "urql";
import {allClasses} from "../../lib/graphql/Class";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingPlaceholder = () => {
    return (<div className="p-4">
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
        {data.classes_class.map(course => <ClassCard course={course} />)}
    </ul>)
}

export default ClassGrid
