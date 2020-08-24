import React, {useContext, useEffect, useState} from "react";
import update from "immutability-helper";
import AssignmentViewerContext from "../AssignmentViewer/AssignmentViewerContext";

const Timer = ({onFinish, onNegative, section, global}) => {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const [et, setEndTime] = useState(() => {
        const endingTime = section ? document.sections[section].config.end_time : document.config.end_time
        let endtime;
        if (endingTime) {
            endtime = new Date(endingTime);
        } else {
            let currentConfig;
            let newEndTime = new Date();

        if (global) {
            currentConfig = document.config
            const hours = parseInt(currentConfig['hours']);
            const mins = parseInt(currentConfig['mins']);
            newEndTime.setSeconds(newEndTime.getSeconds() + (hours > 0 ? (hours * 60 * 60) : 0) + (mins > 0 ? (mins * 60) : 0));

            setDocument(prevState => {
                return update(prevState, {
                        config: {
                            end_time: {
                                $set: newEndTime
                            }
                        }
                    }
                )
            })

            endtime = newEndTime

        } else {
            // Per-section timing
            currentConfig = document.sections[section].config
            const hours = parseInt(currentConfig['hours']);
            const mins = parseInt(currentConfig['mins']);
            newEndTime.setSeconds(newEndTime.getSeconds() + (hours > 0 ? (hours * 60 * 60) : 0) + (mins > 0 ? (mins * 60) : 0));


            setDocument(prevState => {
                return update(prevState, {
                        sections: {
                            [section]: {
                                config: {
                                    end_time: {
                                        $set: newEndTime
                                    }
                                }
                            }
                        }
                    }
                )
            })

            endtime = newEndTime
        }
    }

        return endtime
    })

    const [timer, setTimer] = useState()

    const refreshId = window.setInterval(function () {
        const now = new Date().getTime()
        // @ts-ignore
        const distance = et.getTime() - now

        if (distance >= 0) {
            if (distance === 0) {
                onFinish()
            } else {
                // @ts-ignore
                setTimer(distance)
            }
        } else {
            onFinish()
            clearInterval(refreshId)
        }
    }, 500);


    function formatNumber(number) {
        return ("0" + number).slice(-2)
    }

    useEffect(() => setEndTime(() => {
        if (section) {

        }
        clearInterval(refreshId)
        const endingTime = section ? document.sections[section].config.end_time : document.config.end_time
        let endtime;
        if (endingTime) {
            endtime = new Date(endingTime);
        } else {
            let currentConfig;
            let newEndTime = new Date();

            if (global) {
                currentConfig = document.config
                const hours = parseInt(currentConfig['hours']);
                const mins = parseInt(currentConfig['mins']);
                newEndTime.setSeconds(newEndTime.getSeconds() + (hours > 0 ? (hours * 60 * 60) : 0) + (mins > 0 ? (mins * 60) : 0));

                setDocument(prevState => {
                    return update(prevState, {
                            config: {
                                end_time: {
                                    $set: newEndTime
                                }
                            }
                        }
                    )
                })

                endtime = newEndTime

            } else {
                // Per-section timing
                currentConfig = document.sections[section].config
                const hours = parseInt(currentConfig['hours']);
                const mins = parseInt(currentConfig['mins']);
                newEndTime.setSeconds(newEndTime.getSeconds() + (hours > 0 ? (hours * 60 * 60) : 0) + (mins > 0 ? (mins * 60) : 0));


                setDocument(prevState => {
                    return update(prevState, {
                            sections: {
                                [section]: {
                                    config: {
                                        end_time: {
                                            $set: newEndTime
                                        }
                                    }
                                }
                            }
                        }
                    )
                })

                endtime = newEndTime
            }
        }

        return endtime
    }), [section])


    return (<span className="text-lg font-bold flex justify-between items-center text-gray-700">
                        <svg className="h-6 mr-1 text-gray-300" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
        {/*// @ts-ignore*/}
        {timer ? `${formatNumber(Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) !== "00" ? formatNumber(Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + ":" : ""}${formatNumber(Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60)))}:${formatNumber(Math.floor((timer % (1000 * 60)) / 1000))}` : "00:00"}
                    </span>)
}

export default Timer
