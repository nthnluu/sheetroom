import SimpleModal from "./SimpleModal";
import React, {useContext, useEffect, useRef, useState} from "react";
import QuizContext from "../AssignmentEditor/QuizContext";
import update from "immutability-helper";
import Desmos from 'desmos'


interface Props {
    onCancel: any;
    isOpen: boolean;
    item: string;
}

const DesmosSettings: React.FC<Props> = ({onCancel, isOpen, item}) => {

    const {setDocument} = useContext(QuizContext);
    const saveDesmosBlock = (newValue) => {
        setDocument(prevState => {
            return update(prevState, {
                items: {
                    [item]: {
                        block: {
                            $set: {
                                type: 'desmos',
                                data: newValue
                            }
                        }
                    }
                }
            })
        })
    }

    const graphCalc = useRef(null);

    const options = {
        keypad: true,
        graphpaper: true,
        expressions: true,
        settingsMenu: true,
        zoomButtons: true,
        expressionsCollapsed: true

    }

    let calculator
    useEffect(() => {
        calculator = Desmos.GraphingCalculator(graphCalc.current, options)
        calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });

    }, [isOpen])



    function insert() {
        calculator.asyncScreenshot((data) => {
            saveDesmosBlock(data)
            onCancel();
        })


    }

    function cancelModal() {
        onCancel();
    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="flex-row-reverse sm:flex">

            <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                <button type="button" onClick={insert}
                        className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Insert
        </button>
      </span>
            <span className="mt-3 sm:mr-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          Cancel
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Configure Graph" content={<div className="mt-2">
        <div className="rounded-xl overflow-hidden border-gray-200 shadow-sm max-w-3xl mx-auto mb-4" style={{height: '20rem'}}>
            <div ref={graphCalc} className="h-full"/>
        </div>

        <p className="mt-1 text-gray-400 text-sm ">The expression editor will be hidden</p>
    </div>}
    />)
}

export default DesmosSettings
