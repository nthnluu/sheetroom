import React from "react";
import dynamic from 'next/dynamic'


const QuillEditor = dynamic(
    () => import('./Editor'),
    { ssr: false }
)

export default QuillEditor
