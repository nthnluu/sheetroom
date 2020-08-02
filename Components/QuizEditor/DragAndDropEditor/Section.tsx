import React, {useContext} from "react";
import ItemDnd from "./DragAndDrop";
import JsonDebugBox from "../../JsonDebugBox";
import QuizContext from "../QuizContext";

interface Props {
    section: string;
}

const Section: React.FC<Props> = ({section}) => {
    const {document} = useContext(QuizContext)
    return (
        <>
            <div className="bg-white border p-4 rounded-lg mb-2">
                <h1 className="text-xl font-semibold">Section {section}</h1>
            </div>
            <ItemDnd section={section}/>
        </>
    )
}
export default Section
