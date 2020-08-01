import React, {useState} from "react";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import CustomizedSelects from "../Dropdowns/EditorDropdowns";
const ReactQuill = typeof window === 'object' ? require('react-quill') : false;
const {Quill, editor} = ReactQuill;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
    placeholder?: string;
}


const QuillEditor: React.FC<Props> = ({active, value, onChange, placeholder}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (<>
        <div className="p-1 border border-gray-200 rounded-lg font-sans">
            <ReactQuill
                onFocus={(() => setIsFocused(true))}
                onBlur={(() => setIsFocused(false))}
                placeholder={placeholder} theme={null} value={value} onChange={(html) => {
                onChange(html)
            }} modules={{
                toolbar: {
                    container: "#toolbar",
                },
                clipboard: {
                    matchVisual: false,
                }
            }}/>
        </div>
        <div className={"p-1 rounded-lg border border-gray-200 space-x-1 absolute bg-white z-40 shadow-lg mt-1 overflow-hidden flex justify-between transition-all duration-300 " + (isFocused ? "visible" : "hidden")}
             id="toolbar">
            <button type="button"
                    className="ql-bold text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-bold"/>
            </button>
            <button type="button"
                    className="ql-italic text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-italic"/>
            </button>
            <button type="button"
                    className="ql-underline text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-underline"/>
            </button>

            <button type="button"
                    className="ql-formu text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-code"/>
            </button>
            <button type="button"
                    className="ql-formu text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-square-root-alt"/>
            </button>

        </div>
    </>)
}

export default QuillEditor
