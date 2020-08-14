import ClassCard from "./ClassCard";
import React from "react";
import {useQuery} from "urql";
import {allClasses} from "../../lib/graphql/Class";
import LoadingClassCard from "./LoadingClassCard";

const LoadingPlaceholder = () => {
    return (<ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2 mt-3">
        <LoadingClassCard />
        <LoadingClassCard />
    </ul>)
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
        {data.classes_class.map(course => <ClassCard course={course} key={course.id}/>)}
    </ul>)
}

export default ClassGrid
