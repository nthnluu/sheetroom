import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {EditableMathField} from 'react-mathquill'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import React from 'react';

const AddButton:React.FC<{quillRef: any; isFocused: boolean;}> = ({quillRef, isFocused}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [formulaMode, toggleFormulaMode] = useState(false)
    const [formulaValue, setFormulaValue] = useState("f(x)=");
    const [isMounted, toggleIsMounted] = useState(false);

    useEffect(() => {
        if (isFocused === true) {
            setIsVisible(true)
        } else {
            if (!isMounted) {
                setIsVisible(false)
            }
        }
    }, [isFocused])


    // @ts-ignore
    return (
        isVisible ?
            <ClickAwayListener onClickAway={() => {
                setIsOpen(false)
                toggleFormulaMode(false)
                setFormulaValue("f(x)=")
                toggleIsMounted(false)
            }}>
                <motion.div
                    animate={isOpen ? (formulaMode ? {width: '16rem', height: '3rem', opacity: 1} : {
                        width: '9rem',
                        height: '2rem',
                        opacity: 1
                    }) : {width: '2rem', height: '2rem', opacity: 0.85}}
                    transition={{duration: 0.15}}
                    className="bg-white flex items-center justify-between shadow z-50 focus:outline-none h-8 w-8 rounded-lg p-1 overflow-hidden"
                    style={{zIndex: 2000}}>

                    <motion.div animate={isOpen ? {opacity: 1, scaleX: 1, display: "flex"} : {
                        opacity: 0, scaleX: 0, transitionEnd: {
                            display: "none",
                        }
                    }} transition={{duration: 0.15}}
                                className="items-center justify-start space-x-3 ml-1 opacity-0 text-gray-400 z-20">

                        {!formulaMode ? <>
                                <button className="focus:outline-none h-full focus:shadow-outline"
                                        onClick={() => toggleFormulaMode(true)}>
                                    <i className="fas fa-square-root-alt"/>
                                </button>
                                <i className="fas fa-table"/>
                                <i className="far fa-image"/>
                                <i className="fas fa-chart-line"/></> :
                            // @ts-ignore
                            <EditableMathField latex={formulaValue} style={{width: '14rem'}}
                                               onChange={value => setFormulaValue(value.latex())}
                                               mathquillDidMount={() => toggleIsMounted(true)}
                                               className="focus:outline-none active:outline-none p-4 -ml-4 border-transparent text-black"/>
                        }

                    </motion.div>

                    <button onClick={() => {
                        if (formulaMode) {
                            const range = quillRef.current.editor.getSelection(true);
                            quillRef.current.editor.insertEmbed(range, 'formula', formulaValue)
                            quillRef.current.editor.deleteText(range.index, range.length);
                            quillRef.current.editor.setSelection(range.index + range.length + 1);
                            toggleFormulaMode(false)
                            setFormulaValue("f(x)=")
                            setIsOpen(false)
                            toggleIsMounted(false)
                        } else {
                            setIsOpen(!isOpen)
                        }
                    }}
                            className="flex items-center justify-center w-8 active:outline-none focus:outline-none focus:shadow-outline h-full rounded-lg absolute right-0 bg-white z-30">
                        <i className="fas fa-plus text-blue-500"/>
                    </button>

                </motion.div>
            </ClickAwayListener> : <></>
    )
}

export default AddButton
