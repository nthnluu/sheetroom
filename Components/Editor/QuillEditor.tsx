import React from "react";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;
const {Quill, editor} = ReactQuill;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
}


const QuillEditor: React.FC<Props> = ({active, value, onChange}) => {
    return(<>
        <div className="p-1 border border-gray-200 rounded-lg font-sans">
            <ReactQuill placeholder="Start typing" theme={null} value={value} onChange={(html) => {
                onChange(html)
            }}/>
        </div>
        <div className="w-full rounded-lg border border-gray-200 shadow mt-2 overflow-hidden">
            <button type="button"
                    className="text-gray-700 items-center h-10 w-10 text-center px-3 py-1.5 border border-transparent leading-4 font-medium rounded bg-transparent hover:bg-gray-50 focus:outline-none focus:bg-gray-50 focus:shadow-outline-indigo active:bg-gray-100 transition ease-in-out duration-150">
                <i className="fas fa-bold"/>
            </button>
        </div>
    </>)
}

export default QuillEditor
