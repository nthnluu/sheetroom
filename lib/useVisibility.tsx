import {getBrowserVisibilityProp, getIsDocumentHidden} from "./browserVisHelpers";
import React from "react";

export function usePageVisibility() {
    const [isVisible, setIsVisible] = React.useState(getIsDocumentHidden())
    const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())
    React.useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp()
        window.addEventListener(visibilityChange, onVisibilityChange, false)
        return () => {
            window.removeEventListener(visibilityChange, onVisibilityChange)
        }
    })
    return isVisible
}
