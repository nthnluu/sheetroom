import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";
import {changeAccountType} from "../../lib/graphql/User";
import InviteSettings from "./InviteSettings";
import {updateInviteConfig} from "../../lib/graphql/Invites";

interface Props {
    onCancel: any;
    isOpen: boolean;
    profileData: any;
    session: any;
    settingsObject: any;
    inviteId: any;
    isPublic: any;
    isGoogleClass: any;
}

const InviteSettingsModal: React.FC<Props> = ({onCancel, isOpen, profileData, session, settingsObject, inviteId, isPublic, isGoogleClass}) => {

    const [updateMutationResult, updateMutation] = useMutation(updateInviteConfig)
    const [isLoading, toggleLoading] = useState(false)

    const [settingsConfig, setSettingsObject] = useState(settingsObject)

    function cancelModal() {
        toggleLoading(false)
        onCancel();
    }

    function handleSubmit () {
        toggleLoading(true)
        updateMutation({inviteId: inviteId, newConfig: JSON.stringify(settingsConfig)})
            .then(() => cancelModal())
            .catch(() => toggleLoading(false))
    }



    return (<SimpleModal buttons={<div className="pt-2 mt-6 sm:mt-4 sm:flex sm:flex-row-reverse sm:justify-between">
        <div className="sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">

        <button type="button" onClick={handleSubmit} disabled={isLoading}
                className="inline-flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
         {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Save
        </button>
      </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
        <button type="button" onClick={() => cancelModal()}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Cancel
        </button>
      </span>
        </div>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Invite Settings" content={<div>
        {/*@ts-ignore*/}
       <InviteSettings isPublic={isPublic} standalone isGoogleClass={isGoogleClass} profileData={profileData} session={session} settingsObject={settingsConfig} setSettingsObject={setSettingsObject}/>


    </div>}
    />)
}

export default InviteSettingsModal
