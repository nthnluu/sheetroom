import React from "react";
import dynamic from 'next/dynamic'


const MathField = dynamic(
    () => import('./MathEditor'),
    {ssr: false}
)

export default MathField
