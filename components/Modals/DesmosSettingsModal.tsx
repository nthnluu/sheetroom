import React from "react";
import dynamic from 'next/dynamic'


const DesmosSettingsModal = dynamic(
    () => import('./DesmosSettings'),
    {ssr: false}
)

export default DesmosSettingsModal
