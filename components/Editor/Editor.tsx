import React, {useMemo, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import ReactQuill from 'react-quill';
import AddButton from "./AddButton"; // ES6


interface Props {
    active: boolean;
    onChange: any;
    value: object;
    placeholder?: string;
    border?: boolean;
    uniqueKey?: string
}


const Editor: React.FC<Props> = ({active, value, onChange, placeholder, border}) => {
    const [isFocused, setIsFocused] = useState(false);
    const uniqueKey = useMemo(() => uuidv4(), []);

    const reactQuillRef = useRef(null);

    return <>
        <div className={"font-sans text-gray-700 w-full z-40 relative relative " + (border ? "border rounded-lg p-4 " : "p-0")}>
            <ReactQuill
                ref={reactQuillRef}
                tabIndex={0}
                key={"key" + uniqueKey}
                id={uniqueKey + "xxxxx_myPropertyUsingQuill"}
                onFocus={() => {
                    if (active) {
                        setIsFocused(true)
                    }
                }}
                formats={["bold", "underline", "italic", "blockquote", "list", "formula"]}
                onBlur={() => setIsFocused(false)}
                readOnly={!active}
                placeholder={placeholder} theme="bubble"
                //@ts-ignore
                value={value}
                onChange={(html) => onChange(html)} modules={{
                clipboard: {
                    matchVisual: false,
                },
                formula: true,
                keyboard: {bindings: {tab: false}},
                toolbar: [
                    ['bold', 'italic', 'underline', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['formula']
                ],

            }}/>
            {isFocused ? <div className={"absolute right-0 bottom-0 " + (border ? "m-2": null)}>
                <AddButton/>
            </div> : null}


        </div>

    </>
}


export default Editor
