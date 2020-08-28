import ClassCard from "./ClassCard";
import React from "react";
import {useQuery} from "urql";
import {allClasses, allClassesStudent} from "../../lib/graphql/Class";
import LoadingClassCard from "./LoadingClassCard";
import JsonDebugBox from "../JsonDebugBox";

const LoadingPlaceholder = () => {
    return (<ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2 mt-3">
        <LoadingClassCard />
        <LoadingClassCard />
    </ul>)
};

interface Props {
    session: any;
    openDialog: any;
    profileData: any;
}

const ClassGrid: React.FC<Props>  = ({session, openDialog, profileData})  => {
    const [result] = useQuery({
        query: profileData.data.users_by_pk.account_type === "teacher" ? allClasses : allClassesStudent,
        variables: {
            // @ts-ignore
            userId: session.id
        }
    });

    const {fetching, data} = result
    if (fetching) return <LoadingPlaceholder/>;

    return (<>
        {data.classes_class.length > 0 ? <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2 mt-3">
                {data.classes_class.map(course => <ClassCard course={course} key={course.id}/>)}
        </ul> : <div className="my-4 text-center">
            <img src="/class.svg" className="h-24 mx-auto opacity-25 mb-2"/>
            <button className="text-center opacity-25" onClick={openDialog}>Create new class</button>
        </div>} </>)
}

export default ClassGrid
