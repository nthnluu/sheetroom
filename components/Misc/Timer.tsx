import React, {useContext, useEffect, useState} from "react";
import update from "immutability-helper";
import AssignmentViewerContext from "../AssignmentViewer/AssignmentViewerContext";
import Countdown from 'react-countdown';

const Timer = ({section, global, onFinish}) => {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const [timer, setTimer] = useState(Date.now())

    useEffect(() => {
        if (global) {
            if (document.config.end_time) {
                setTimer(document.config.end_time)
                console.log(document.config.end_time)
            } else {
                const timeOffset = (document.config.hours ? parseInt(document.config.hours) * 3600000 : 0) + (document.config.mins ? parseInt(document.config.mins) * 60000 : 0)
                setTimer(Date.now() + timeOffset)
                console.log(timeOffset)
                setDocument(prevState => {
                    return update(prevState, {
                            config: {
                                end_time: {
                                    $set: Date.now() + timeOffset
                                }
                            }
                        }
                    )
                })
            }
        } else {
            if (document.sections[section].config.end_time) {
                setTimer(document.sections[section].config.end_time)
            } else {
                const timeOffset = (document.sections[section].config.hours ? parseInt(document.sections[section].config.hours) * 3600000: 0) + (document.sections[section].config.mins ? parseInt(document.sections[section].config.mins) * 60000 : 0)
                setTimer(Date.now() + timeOffset)
                setDocument(prevState => {
                    return update(prevState, {
                            sections: {
                                [section]: {
                                    config: {
                                        end_time: {
                                            $set: Date.now() + timeOffset
                                        }
                                    }
                                }
                            }
                        }
                    )
                })
            }
        }
    }, [section])

    function formatNumber(number) {
        return ("0" + number).slice(-2)
    }

    return (<span className="text-lg font-bold flex justify-between items-center text-gray-700">
                        <svg className="h-6 mr-1 text-gray-300" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg><Countdown date={timer} onComplete={onFinish}
                                         renderer={props => `${props.hours ? formatNumber(props.hours) + ":" : ""}${formatNumber(props.minutes)}:${formatNumber(props.seconds)}`}
    />
                    </span>)
}

export default Timer
