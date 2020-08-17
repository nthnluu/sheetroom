import React, {useMemo, useState} from "react";
import {v4 as uuidv4} from 'uuid';


const ReactQuill = typeof window === 'object' ? require('react-quill') : false;

interface Props {
    value: object;
    placeholder?: string;
    border?: boolean;
    uniqueKey?: string
}


const InactiveEditor: React.FC<Props> = ({value, placeholder, border}) => {
    const [isFocused, setIsFocused] = useState(false);
    const uniqueKey = useMemo(() => uuidv4(), []);


    return (<>
        <div
            className={"font-sans text-gray-700 w-full z-40 pointer-events-none " + (border ? "border rounded-lg p-4 " : "p-0")}>
            <ReactQuill
                tabIndex={0}
                key={"key" + uniqueKey}
                id={uniqueKey + "xxxxx_myPropertyUsingQuill"}
                readOnly={true}
                placeholder={placeholder} theme="bubble" value={value}/>
        </div>
    </>)
}


export default InactiveEditor
