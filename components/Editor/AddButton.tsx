import {motion} from "framer-motion"
import {useState} from "react";

const AddButton = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (<motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={isOpen ? {width: '9rem', opacity: 1} : {width: '2rem', opacity: 0.5}}
        transition={{duration: 0.15}}
        className="bg-white flex items-center justify-between shadow focus:outline-none h-8 w-8 rounded-lg p-1 overflow-hidden">

        <motion.div animate={isOpen ? {opacity: 1, scaleX: 1, display: "flex"} : {
            opacity: 0, scaleX: 0, transitionEnd: {
                display: "none",
            }
        }}
                    transition={{duration: 0.15}}
                    className="items-center justify-start space-x-3 ml-1 opacity-0 text-gray-400 z-20">
            <i className="fas fa-square-root-alt"/>
            <i className="fas fa-table"/>
            <i className="far fa-image"/>
            <i className="fas fa-chart-line"/>
        </motion.div>

        <div className="flex items-center justify-center w-8 absolute right-0 bg-white z-30">
            <i className="fas fa-plus text-blue-500"/>
        </div>

    </motion.button>)
}

export default AddButton
