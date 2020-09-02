import Desmos from 'desmos'
import {useEffect, useRef} from "react";

const DesmosGraph = ({blockData}) => {

    const graphCalc = useRef(null);

    const options = {
        keypad: true,
        graphpaper: true,
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        showResetButtonOnGraphpaper: false,
        restrictedFunctions: true

    }
    useEffect(() => {
        const calculator = Desmos.GraphingCalculator(graphCalc.current)
        if (blockData) {
            calculator.setState(blockData);
        }

    }, [blockData])

    return <div className="max-w-3xl mx-auto">
        <div className="rounded-xl overflow-hidden border-gray-200 shadow-sm" style={{height: '24rem'}}>
            <div ref={graphCalc} className="h-full"/>
        </div>
    </div>
}

export default DesmosGraph
