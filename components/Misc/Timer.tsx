import React, {useContext, useEffect, useState} from "react";
import update from "immutability-helper";
import AssignmentViewerContext from "../AssignmentViewer/AssignmentViewerContext";

const Timer = ({onFinish, section, global}) => {
    const {document, setDocument} = useContext(AssignmentViewerContext)
    const [timer, setTimer] = useState("00:00")

    const calculateEndTime = () => {
        if (document.config['timing'] === 1) {
            // Per-section timing
            if (document.sections[section].config['end_time']) {
                //an end time has been set; resume timer
                return new Date(document.sections[section].config['end_time'])
            } else {
                //the timer hasn't been started, start the timer
                let newEndTime = new Date()
                newEndTime.setSeconds(newEndTime.getSeconds() + (document.sections[section].config['hours'] * 60) + (document.sections[section].config['mins'] * 60 * 60))
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

                return newEndTime;
            }
        } else {
            // Global timing
            if (document.config['end_time']) {
                //an end time has been set; resume timer
                return new Date(document.config['end_time'])

            } else {
                //the timer hasn't been started, start the timer
                let newEndTime = new Date()
                newEndTime.setSeconds(newEndTime.getSeconds() + (document.config['hours'] * 60) + (document.config['mins'] * 60 * 60))
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
                return newEndTime;
            }
        }
    }
    const [endTime, setEndTime] = useState(calculateEndTime())

    const formattedNumber = (number) => (("0" + number).slice(-2))

    useEffect(() => {

        setEndTime(calculateEndTime())
        const timerInterval = setInterval(() => {
            console.log(endTime)
            const now = new Date().getTime()
            const distance = endTime.getTime() - now

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimer(`${formattedNumber(hours)}:${formattedNumber(minutes)}:${formattedNumber(seconds)}`)

        }, 1000);

        return () => clearInterval(timerInterval);

    }, [section])

    return (<span className="text-lg font-bold flex justify-between items-center text-gray-700">
                        <svg className="h-6 mr-1 text-gray-300" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
        {/*// @ts-ignore*/}
        {timer ? timer : "00:00"}
                    </span>)
}

export default Timer
