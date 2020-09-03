import React, {useContext} from "react";
import AssignmentViewerContext from "../AssignmentViewerContext";
import update from "immutability-helper";
import moment from "moment";

export default function ShortAnswer({item}) {
    const {document, setDocument, logEvent, inviteConfigObject} = useContext(AssignmentViewerContext)

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
                <label htmlFor={"response_" + item} className="block font-semibold text-gray-800">Enter
                    response:</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input id={"response_" + item} onPaste={(event) => {
                        if (inviteConfigObject.disablePaste) {
                            event.preventDefault()
                        }
                        logEvent('user_pasted_text', {
                            item: item,
                            time: moment(),
                            //@ts-ignore
                            content: (event.clipboardData || window.clipboardData).getData('text')
                        })
                    }}
                           className="form-input block w-full text-gray-800 placeholder-gray-300 text-sm md:text-lg p-2 md:p-3 sm:leading-5"
                           placeholder="Start typing..." value={document.items[item].student_input[0]}
                           onChange={event => setConfigValue(event.target.value)}/>
                </div>
            </div>
        </>

    )

}
