import React, {useContext, useState} from "react";
import update from "immutability-helper";
import AssignmentViewerContext from "../AssignmentViewer/AssignmentViewerContext";

const Timer = ({onFinish, onNegative, section}) => {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const [startTime] = useState(() => {
        let result;
        if (!section) {
            const currentConfig = document.config
            if (document.config['start_time']) {
                result = new Date(currentConfig['start_time'])
            } else {
                let dt = new Date();
                const hours = parseInt(currentConfig['hours']);
                const mins = parseInt(currentConfig['mins']);
                dt.setSeconds( dt.getSeconds() + (hours > 0 ? (hours*60*60) : 0) + (mins > 0 ? (mins*60) : 0));
                setDocument(prevState => {
                    return update(prevState, {
                            config: {
                                start_time: {
                                    $set: dt
                                }
                            }
                        }
                    )
                })
                result = dt
            }
        } else {
            const currentSection = document.sections[section].config
            const hours = parseInt(currentSection['hours']);
            const mins = parseInt(currentSection['mins']);
            if (currentSection['start_time']) {
                result = new Date(currentSection['start_time'])
                console.log(result)
            } else {
                let dt = new Date();
                dt.setSeconds( dt.getSeconds() + (hours > 0 ? (hours*60*60) : 0) + (mins > 0 ? (mins*60) : 0));
                setDocument(prevState => {
                    return update(prevState, {
                            sections: {
                                [section]: {
                                    config: {
                                        start_time: {
                                            $set: dt
                                        }
                                    }
                                }
                            }
                        }
                    )
                })
                result = dt
            }
        }

        return result
    })

    if (!startTime) {
        return <></>
    }
    const [timer, setTimer] = useState()

    window.setInterval(function(){
        const now = new Date().getTime()
        // @ts-ignore
        const distance = startTime.getTime() - now

        if (distance >= 0) {
            if (distance === 0) {
                onFinish()
            } else {
                // @ts-ignore
                setTimer(distance)
            }
        } else {

        }
    }, 500);


    function formatNumber (number) {
        return ("0" + number).slice(-2)
    }



    return (<span className="text-lg font-bold flex justify-between items-center text-gray-700">
                        <svg className="h-6 mr-1 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
        {/*// @ts-ignore*/}
        {timer ? `${formatNumber(Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) !== "00" ? formatNumber(Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))+":" : ""}${formatNumber(Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60)))}:${formatNumber(Math.floor((timer % (1000 * 60)) / 1000))}` : "00:00"}
                    </span>)
}

export default Timer
