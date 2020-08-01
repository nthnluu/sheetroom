import React from "react";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;
const {Quill, editor} = ReactQuill;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
}

const QuillEditor: React.FC<Props> = ({active, value, onChange}) => {
    return <div className="p-1 border border-gray-200 rounded-lg font-sans">
        <ReactQuill placeholder="Start typing" theme={null} value={value} onChange={(html) => {
            onChange(html)
        }}/>
    </div>
}

export default QuillEditor
