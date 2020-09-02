import Desmos from 'desmos'
import {useEffect, useRef} from "react";

const DesmosGraph = ({blockData}) => {

    const graphCalc = useRef(null);

    const options = {
        keypad: false,
        graphpaper: true,
        expressions: false,
        settingsMenu: false,
        zoomButtons: true,

    }
    let calculator;
    useEffect(() => {
        calculator = Desmos.GraphingCalculator(graphCalc.current, options)
        if (blockData) {
            calculator.setState(blockData);
        }
    }, [blockData])

    return<div className="rounded-xl overflow-hidden border-gray-200 shadow-sm max-w-3xl mx-auto mb-4" style={{height: '20rem'}}>
        <div ref={graphCalc} className="h-full"/>
    </div>

}

export default DesmosGraph
