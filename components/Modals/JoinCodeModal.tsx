import SimpleModal from "./SimpleModal";
import React, {useContext} from "react";
import QuizContext from "../AssignmentEditor/QuizContext";
import update from "immutability-helper";
import ToggleRow from "../Misc/ToggleRow";

interface Props {
    joinCode: string;
    title: string;
    onCancel: any;
    isOpen: boolean;
}

const JoinCodeModal: React.FC<Props> = ({joinCode, title, onCancel, isOpen}) => {

    function cancelModal() {
        onCancel();
    }


    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
        <button type="button" onClick={cancelModal}
                className="inline-flex justify-center w-full rounded-md border border-transparent px-6 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         Done
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title={title} content={<div>
      <h1 className="text-6xl text-center font-semibold text-gray-800 border border-gray-200 rounded-lg">{joinCode}</h1>

    </div>}
    />)
}

export default JoinCodeModal
