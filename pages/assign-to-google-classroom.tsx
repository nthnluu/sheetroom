import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import {useRouter} from "next/router";
import JsonDebugBox from "../components/JsonDebugBox";
import {useEffect, useState} from "react";

const AssignToGoogleClassroom = () => {
    const router = useRouter()
    const {assignmentId, gclass} = router.query

    const [classList, setClassList] = useState()

    const getStudentInfo = (accessToken) => {
        fetch("https://classroom.googleapis.com/v1/courses", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(result => result.json())
            .then(json => setClassList(json))
    }

    useEffect(() => {
        if (gclass) {
            localStorage.removeItem('gclassteacher');
            //@ts-ignore
            localStorage.setItem('gclassteacher', gclass);

            getStudentInfo(gclass)
        }
    }, [])

    return(<>
        <Navbar unfixed/>
        <div className="max-w-xl mx-auto">
            <h1 className="text-center text-3xl">Select a class</h1>

        </div>
        <button onClick={() => getStudentInfo(gclass)}>hi</button>
    </>)
}

export default AssignToGoogleClassroom
