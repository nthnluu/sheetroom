import React, {useState} from "react";
import AssignmentList from "./AssignmentList";
import NewAssignmentModal from "../Modals/NewAssignmentModal";
import NewClassModal from "../Modals/NewClassModal";
import ClassGrid from "./ClassGrid";
import NewTooltip from "../Misc/Tooltip";
import JsonDebugBox from "../JsonDebugBox";
import UpgradeModal from "../Modals/UpgradeModal";


interface Props {
    session: any;
    profileData: any;
    proData?: any;
}


const ProjectList: React.FC<Props> = ({session, profileData, proData}) => {
    const [sortDropdown, toggleSortDropdown] = useState(false);
    const [createAssignmentDialog, toggleCreateAssignmentDialog] = useState(false);
    const [createClassDialog, toggleCreateClassDialog] = useState(false);
    const [upgradeModal, toggleUpgradeModal] = useState(false);

    const canCreateClass = profileData.data.users_by_pk.is_pro ? true : (proData.classes_class_aggregate.aggregate.count < 4)
    const canCreateAssignment = profileData.data.users_by_pk.is_pro ? true : (proData.assignments_assignment_aggregate.aggregate.count < 10)

    // @ts-ignore
    return (
        <div className="bg-white lg:min-w-0 lg:flex-1 w-full">


            <UpgradeModal onCancel={() => toggleUpgradeModal(false)} isOpen={upgradeModal}
                          title="You have reached your account limit"/>
                <NewClassModal onCancel={() => toggleCreateClassDialog(false)} isOpen={createClassDialog}
                               session={session}/>
                <NewAssignmentModal onCancel={() => toggleCreateAssignmentDialog(false)} isOpen={createAssignmentDialog}
                                    session={session}/>
                <div className="border-b border-gray-200 pb-8">
                    <div
                        className="pl-4 pr-4 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                        <div className="flex items-center">
                            <h1 className="flex-1 text-lg leading-7 font-medium">Classes</h1>
                            <div>
                                {profileData.data.users_by_pk.account_type === "teacher" ?
                                    <NewTooltip title="New class" placement="bottom" enterDelay={500}
                                                enterNextDelay={500}>

                                        <button type="button" onClick={() => {
                                            if (canCreateClass) {
                                                toggleCreateClassDialog(true)
                                            } else {
                                                toggleUpgradeModal(true)
                                            }
                                        }}
                                                className="flex items-center justify-center h-8 w-8 border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>

                                    </NewTooltip> : null}
                            </div>
                        </div>
                    </div>
                    <div className="px-4 mt-6 sm:px-6 lg:px-6">
                        {/*@ts-ignore*/}
                        <ClassGrid profileData={profileData} session={session}
                                   openDialog={() => toggleCreateClassDialog(true)}/>
                    </div>
                </div>


                <div
                    className="px-4 pt-4 pb-4 border-b border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-4 xl:border-t-0">
                    <div className="flex items-center">
                        <h1 className="flex-1 text-lg leading-7 font-medium">Assignments</h1>
                        <div className="relative">
                            <div className="flex">
                                {profileData.data.users_by_pk.account_type === "teacher" ?
                                    <NewTooltip title="New assignment" placement="bottom" enterDelay={500}
                                                enterNextDelay={500}>

                                        <button type="button" onClick={() => {
                                            if (canCreateAssignment) {
                                                toggleCreateAssignmentDialog(true)
                                            } else {
                                                toggleUpgradeModal(true)
                                            }
                                        }}
                                                className="flex items-center justify-center h-8 w-8 border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-200 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                                            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        </button>

                                    </NewTooltip> : null}

                            </div>


                        </div>
                    </div>
                </div>
                <AssignmentList profileData={profileData} session={session}
                                openDialog={() => toggleCreateAssignmentDialog(true)}/>
        </div>
)
}

export default ProjectList
