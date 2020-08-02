import React, {useMemo, useState} from "react";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
    placeholder?: string;
    border?: boolean;
    uniqueKey: string
}


const QuillEditor: React.FC<Props> = ({active, value, onChange, placeholder,  border, uniqueKey}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState(value)

    const modules = useMemo(
        () => ({
            toolbar: {
                container: "#toolbar",
            },
            clipboard: {
                matchVisual: false,
            }
        }),
        []
            )

    return (<>
        <div className={"font-sans text-gray-700 " + (border ? "border border-gray-200 rounded-lg  p-1 " : null)}>
            <ReactQuill
                key={"key"+uniqueKey}
                id={uniqueKey+"xxxxx_myPropertyUsingQuill"}
                onFocus={(() => setIsFocused(true))}
                onBlur={(() => setIsFocused(false))}
                placeholder={placeholder} theme={null} value={value} onChange={(html) => onChange(html)} modules={modules}/>
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
                    className=" text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-code"/>
            </button>
            <button type="button"
                    className=" text-gray-500 items-center h-8 w-8 text-center border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-square-root-alt"/>
            </button>

        </div>
    </>)
}


export default QuillEditor
