import React, {useEffect, useMemo, useRef, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import NewTooltip from "../Misc/Tooltip";
import ReactQuill, {Quill} from 'react-quill'; // ES6
import { addStyles, EditableMathField } from 'react-mathquill'



interface Props {
    active: boolean;
    onChange: any;
    value: object;
    placeholder?: string;
    border?: boolean;
    uniqueKey?: string
}


const Editor: React.FC<Props> = ({active, value, onChange, placeholder, border}) => {
    // @ts-ignore
    const { mathquill4quill } = window;
    const [isFocused, setIsFocused] = useState(false);
    const uniqueKey = useMemo(() => uuidv4(), []);

    const reactQuillRef = useRef(null);
    addStyles()

    useEffect(() => {
        const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill });
        enableMathQuillFormulaAuthoring(reactQuillRef.current.editor);

    }, [])

    return (<>
        <div className={"font-sans text-gray-700 w-full z-40 " + (border ? "border rounded-lg p-4 " : "p-0")}>
            <ReactQuill
                ref={reactQuillRef}
                tabIndex={0}
                key={"key" + uniqueKey}
                id={uniqueKey + "xxxxx_myPropertyUsingQuill"}
                onFocus={(() => {
                    if (active) {
                        setIsFocused(true)
                    }
                })}
                formats={["bold", "underline", "italic", "strike", "blockquote", "formula", "list", "link"]}
                onBlur={(() => setIsFocused(false))}
                readOnly={!active}
                placeholder={placeholder} theme="bubble" value={value} onChange={(html) => onChange(html)} modules={{
                clipboard: {
                    matchVisual: false,
                },
                formula: true,
                keyboard: {bindings: {tab: false}},
                toolbar: [
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link', 'formula'],
                    ['clean']
                ],

            }}/>
        </div>
    </>)
}



export default Editor
