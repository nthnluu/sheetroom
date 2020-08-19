import React, {useContext} from "react";
import AssignmentViewerContext from "../AssignmentViewerContext";
import update from "immutability-helper";
import {EditableMathField} from "react-mathquill";
import MathField from "../../Editor/MathField";

export default function ({item}) {
    const {document, setDocument} = useContext(AssignmentViewerContext)

    const setConfigValue = (value) => {
        setDocument(prevState => {
            return update(prevState, {
                    items: {
                        [item]: {
                            student_input: {
                                $set: [value]
                            }
                        }
                    }
                }
            )
        })
    }


    return (
        <>
            <div>
                <label htmlFor={"response_"+item} className="block font-semibold text-gray-800">Enter response:</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <MathField value={document.items[item].student_input[0]} onChange={value => setConfigValue(value.latex())}/>
                </div>
            </div>
        </>

    )

}
