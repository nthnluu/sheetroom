import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import QRCode from 'qrcode.react';

interface Props {
    joinCode: string;
    title: string;
    onCancel: any;
    isOpen: boolean;
}

const JoinCodeModal: React.FC<Props> = ({joinCode, title, onCancel, isOpen}) => {

    const [qrCode, toggleQrCode] = useState(false)

    function cancelModal() {
        onCancel();
    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">

        <div className="flex-row-reverse sm:flex">
            <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Done
        </button>
      </span>
            <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                <button type="button" onClick={() => toggleQrCode(!qrCode)}
                        className="inline-flex items-center sm:mr-2 mt-2 sm:mt-0 justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-transparent text-base leading-6 font-medium text-gray-600 shadow-sm  focus:outline-none focus:shadow-outline focus:border-blue-300 lue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         <i className={"fas " + (qrCode ? "fa-code" : "fa-qrcode")}/>
        </button>
      </span>

        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={title} content={<div>
        {qrCode ? <QRCode value={"https://www.sheetroom.com/join/" + joinCode} className="mx-auto"/> :
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-light text-gray-700 border border-gray-200 rounded-lg font-mono">{joinCode}</h1>}


    </div>}
    />)
}

export default JoinCodeModal
