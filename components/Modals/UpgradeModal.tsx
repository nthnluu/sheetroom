import SimpleModal from "./SimpleModal";
import React from "react";

interface Props {
    onCancel: any;
    isOpen: boolean;
    title?: string;
}

const UpgradeModal: React.FC<Props> = ({onCancel, isOpen, title}) => {

    function cancelModal() {
        onCancel();
    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">

        <div className="flex-row-reverse sm:flex">
            <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                <a href="/pricing"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Upgrade
        </a>
      </span>
            <span className="mt-3 sm:mr-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
          No thanks
        </button>
      </span>

        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={title ? title : "This feature requires Sheetroom Pro"} content={<div>
        <img src="/upgrade_pic.svg"/>
        <h2 className="text-xl font-bold text-center mt-4">Get full, unlimited access to Sheetroom.</h2>
        <p className="text-center text-gray-400">Upgrade to Sheetroom Pro starting at $6/month</p>

    </div>}
    />)
}

export default UpgradeModal
