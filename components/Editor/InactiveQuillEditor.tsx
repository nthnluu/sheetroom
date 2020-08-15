import React from "react";
import dynamic from 'next/dynamic'


const InactiveQuillEditor = dynamic(
    () => import('./InactiveEditor'),
    { ssr: false }
)

export default InactiveQuillEditor
