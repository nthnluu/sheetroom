import SimpleModal from "./SimpleModal";
import React, {useContext} from "react";
import QuizContext from "../AssignmentEditor/QuizContext";
import update from "immutability-helper";
import ToggleRow from "../Misc/ToggleRow";

interface Props {
    isOpen: boolean;
    onCancel: any;
    item: string;
    type: string;
}

const ItemOptionsModal: React.FC<Props> = ({isOpen, onCancel, item, type}) => {
    const {aid, setDocument, document} = useContext(QuizContext)

    function cancelModal() {
        onCancel();
    }

    const setConfigValue = (configValue, value) => {
        setDocument(prevState => {
            const newData = update(prevState, {
                    items: {
                        [item]: {
                            config: {
                                [configValue]: {
                                    $set: value
                                }
                            }
                        }
                    }
                }
            )
            return newData
        })
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
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Item Options" content={<div>
        <div className="flex justify-between items-center mt-6">
            <label htmlFor="points" className="font-medium text-gray-700">Points</label>
            {/*// <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->*/}
            <span>
                <div className="relative rounded-md shadow-sm">
                    <input id="points" className="form-input block w-14 text-center sm:text-sm sm:leading-5"
                           placeholder="0" value={document.items[item].config.points}
                           onChange={event => {
                               const value = event.target.value

                               // @ts-ignore
                               if (!isNaN(value)) {
                                   setConfigValue("points", event.target.value)
                               }
                           }}/>
                </div>
            </span>
        </div>
        <ToggleRow label="Extra Credit" value={document.items[item].config.extra_credit}
                   onEnable={() => setConfigValue("extra_credit", true)}
                   onDisable={() => setConfigValue("extra_credit", false)}/>
        {type === "MC" || type === "MA" ? <ToggleRow label="Shuffle Answers" value={document.items[item].config.shuffle}
                                                     onEnable={() => setConfigValue("shuffle", true)}
                                                     onDisable={() => setConfigValue("shuffle", false)}/> : null}

        {type === "SA" ? <ToggleRow label="Tolerate typos" value={document.items[item].config.tolerate_typos}
                                    onEnable={() => setConfigValue("tolerate_typos", true)}
                                    onDisable={() => setConfigValue("tolerate_typos", false)}/> : null}

    </div>}
    />)
}

export default ItemOptionsModal
