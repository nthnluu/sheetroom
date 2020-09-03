import React, {useState} from "react";
import LeaveClassModal from "../Modals/LeaveClassModal";
import DeleteClassModal from "../Modals/DeleteClassModal";

const Settings = ({session, profileData, classId}) =>  {
    const accountType = profileData.data.users_by_pk.account_type
    const [deleteModal, toggleDeleteModal] = useState(false)
    return <>
        {accountType === "teacher" ? <DeleteClassModal classId={classId} userId={session.id} onCancel={() => toggleDeleteModal(false)} isOpen={deleteModal}/> :  <LeaveClassModal classId={classId} userId={session.id} onCancel={() => toggleDeleteModal(false)} isOpen={deleteModal}/>}

        <h1 className="text-2xl text-gray-800 font-semibold mr-1 mb-4 mt-10">Settings</h1>
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {accountType === "teacher" ?  "Delete this class": "Leave this class"}
                </h3>
                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                    <p>
                        {accountType === "teacher" ?  "Any submissions associated with this class will be permanently deleted." : "Once you leave, you won't receive any assignments from this class. You'll loose access to any submissions associated with this class."}

                    </p>
                </div>
                <div className="mt-5">
                    <button type="button" onClick={() => toggleDeleteModal(true)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        {accountType === "teacher" ?  "Delete class": "Leave class"}
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default Settings
