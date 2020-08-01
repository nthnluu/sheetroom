import React from "react";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;
const {Quill, editor} = ReactQuill;

interface Props {
    active: boolean;
    onChange: any;
    value: object;
}

const QuillEditor: React.FC<Props> = ({active, value, onChange}) => {
    return <ReactQuill theme="snow" value={value} onChange={(html) => {
        onChange(html)
    }}/>
}

export default QuillEditor
