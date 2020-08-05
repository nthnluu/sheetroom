import React, {useMemo, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import NewTooltip from "../Misc/Tooltip";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
    placeholder?: string;
    border?: boolean;
    uniqueKey?: string
}


const QuillEditor: React.FC<Props> = ({active, value, onChange, placeholder, border}) => {
    const [isFocused, setIsFocused] = useState(false);
    const uniqueKey = useMemo(() => uuidv4(), []);


    return (<>
        <div className={"font-sans text-gray-700 " + (border ? "border rounded-lg p-4 " : "p-0")}>
            <ReactQuill
                tabIndex={0}
                key={"key" + uniqueKey}
                id={uniqueKey + "xxxxx_myPropertyUsingQuill"}
                onFocus={(() => {
                    if (active) {
                        setIsFocused(true)
                    }
                })}
                onBlur={(() => setIsFocused(false))}
                readOnly={!active}
                placeholder={placeholder} theme="bubble" value={value} onChange={(html) => onChange(html)} modules={{
                toolbar: {
                    container: "#toolbar" + uniqueKey,
                },
                clipboard: {
                    matchVisual: false,
                },
                keyboard: {bindings: {tab: false}}

            }}/>
        </div>
        <div
            className="text-white space-x-2 p-2 text-lg overflow-hidden flex justify-between"
            id={"toolbar" + uniqueKey}>
            <NewTooltip title="Bold" placement="bottom" enterDelay={500}
                        enterNextDelay={500}>
                <button type="button"
                        className="ql-bold items-center h-16 w-16 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                    <i className="fas fa-bold"/>
                </button>
            </NewTooltip>
            <NewTooltip title="Italic" placement="bottom" enterDelay={500}
                        enterNextDelay={500}>
                <button type="button"
                        className="ql-italic  items-center h-16 w-16 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                    <i className="fas fa-italic"/>
                </button>
            </NewTooltip>
            <NewTooltip title="Underline" placement="bottom" enterDelay={500}
                        enterNextDelay={500}>
                <button type="button"
                        className="ql-underline  items-center h-16 w-16 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                    <i className="fas fa-underline"/>
                </button>
            </NewTooltip>
        </div>
    </>)
}


export default QuillEditor
