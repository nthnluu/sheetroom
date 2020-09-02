import React from "react";
import dynamic from 'next/dynamic'


const Desmos = dynamic(
    () => import('./DesmosGraph'),
    {ssr: false}
)

export default Desmos
