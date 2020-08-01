import React, {useState} from "react";

const ReactQuill = typeof window === 'object' ? require('react-quill') : false;

function QuillEditor() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue}/>

}

export default QuillEditor
