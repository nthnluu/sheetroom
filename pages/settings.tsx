import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Footer from "../components/Misc/Footer";
import ChangeAccountTypeModal from "../components/Modals/ChangeAccountTypeModal";
import DeleteAccountModal from "../components/Modals/DeleteAccountModal";
import {useMutation} from "urql";
import {updateProfileData} from "../lib/graphql/User";
import InfoSnackbar from "../components/Snackbars/InfoSnackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";

interface Props {
    session: any;
    profileData: any;
}

const Dashboard: React.FC<Props> = ({session, profileData}) => {
    const [accountTypeModal, toggleAccountTypeModal] = useState(false)
    const [profileSnackbar, toggleProfileSnackbar] = useState(false)
    const [deleteAccountModal, toggleDeleteAccountModal] = useState(false)
    const [isLoading, toggleLoading] = useState(false)

    const [updateProfileResult, mutateProfile] = useMutation(updateProfileData)

    const editSubscription = () => {
        fetch('/api/stripe-portal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({customerId: profileData.data.users_by_pk.stripeCustomerId}),
        })
            .then(response => response.json())
            .then(json => window.location.href = json.url)
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <>
            <Head>
                <title>Settings | Sheetroom</title>
            </Head>
            <InfoSnackbar label="✅ Profile settings updated!" isOpen={profileSnackbar}
                          onClose={() => toggleProfileSnackbar(false)}/>
            <DeleteAccountModal onCancel={() => toggleDeleteAccountModal(false)}
                                customerId={profileData.data.users_by_pk.stripeCustomerId} userId={session.id}
                                isOpen={deleteAccountModal}/>
            <ChangeAccountTypeModal
                changeTo={profileData.data.users_by_pk.account_type === "teacher" ? "student" : "teacher"}
                onCancel={() => toggleAccountTypeModal(false)} isOpen={accountTypeModal} userId={session.id}/>
            <Navbar profileData={profileData} session={session} unfixed/>
            <div className="min-h-screen bg-gray-50">

                <div className="max-w-5xl mx-auto px-4 md:px-0 pt-8 pb-12">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h1>
                    <div>
                        <div className="bg-white shadow px-4 py-5 rounded-lg sm:p-6">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form onSubmit={event => {
                                        event.preventDefault()
                                        toggleLoading(true)
                                        mutateProfile({
                                            userId: session.id,
                                            //@ts-ignore
                                            firstName: event.target.first_name.value,
                                            //@ts-ignore
                                            lastName: event.target.last_name.value
                                        })
                                            .then(() => toggleProfileSnackbar(true))
                                            .then(() => toggleLoading(false))
                                            .catch(() => toggleLoading(false));
                                    }
                                    } method="POST">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first_name"
                                                       className="block text-sm font-medium leading-5 text-gray-700">First
                                                    name</label>
                                                <input id="first_name"
                                                       defaultValue={profileData.data.users_by_pk.first_name}
                                                       className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last_name"
                                                       className="block text-sm font-medium leading-5 text-gray-700">Last
                                                    name</label>
                                                <input defaultValue={profileData.data.users_by_pk.last_name}
                                                       id="last_name"
                                                       className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                            </div>
                                        </div>

                                        {/*                    <div className="mt-6">*/}
                                        {/*                        <label className="block text-sm leading-5 font-medium text-gray-700">*/}
                                        {/*                            Photo*/}
                                        {/*                        </label>*/}
                                        {/*                        <div className="mt-2 flex items-center">*/}
                                        {/*                            <img className="h-12 w-12 inline-block rounded-full"*/}
                                        {/*                                 src={profileData.data.users_by_pk.image ? profileData.data.users_by_pk.image : "/profile.jpg"}/>*/}
                                        {/*                            <span className="ml-5 rounded-md shadow-sm">*/}
                                        {/*  <button type="button" onClick={signOut}*/}
                                        {/*          className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">*/}
                                        {/*    Change*/}
                                        {/*  </button>*/}
                                        {/*</span>*/}
                                        {/*                        </div>*/}
                                        {/*                    </div>*/}

                                        <div className="flex justify-end mt-6">
                                           <span className="inline-flex rounded-md shadow-sm">
  <button type="submit" disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
   {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null} Update profile
  </button>
</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {profileData.data.users_by_pk.account_type === "teacher" ? <>
                            {!profileData.data.users_by_pk.is_pro ? <div className="bg-white shadow rounded-lg mt-6">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Upgrade to Sheetroom Pro
                                    </h3>
                                    <div className="mt-3 text-sm leading-5">
                                        <a href="/pricing"
                                           className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                                            Change plan &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div> : <>
                                <div className="bg-white shadow rounded-lg mt-6">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Update your subscription
                                        </h3>
                                        <div className="mt-3 text-sm leading-5">
                                            <button onClick={() => editSubscription()}
                                                    className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                                                Change subscription &rarr;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>}</> : null}


                        {profileData.data.users_by_pk.account_type === "teacher" ?
                            <div className="bg-white shadow rounded-lg mt-6">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Change account type
                                    </h3>
                                    <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                        <p>
                                            You'll have limited access to your assignments and classes until you switch
                                            your account back to teacher.
                                        </p>
                                    </div>
                                    <div className="mt-3 text-sm leading-5">
                                        <button onClick={() => toggleAccountTypeModal(true)}
                                                className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                                            Convert to student account &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div> : <div className="bg-white shadow rounded-lg mt-6">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Change account type
                                    </h3>
                                    <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                        <p>
                                            You'll have limited access to your classes and submissions until you switch
                                            your account back to student.
                                        </p>
                                    </div>
                                    <div className="mt-3 text-sm leading-5">
                                        <button onClick={() => toggleAccountTypeModal(true)}
                                                className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                                            Convert to teacher account &rarr;
                                        </button>
                                    </div>
                                </div>
                            </div>}


                        <div className="bg-white shadow rounded-lg mt-6">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Delete your account
                                </h3>
                                <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                    <p>
                                        Once you delete your account, you'll permanently lose all data associated with
                                        it.
                                    </p>
                                </div>
                                <div className="mt-5">
                                    <button type="button" onClick={() => toggleDeleteAccountModal(true)}
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                        Delete account
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-4 flex justify-end">

                    </div>
                </div>
            </div>

            <Footer/>

        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, true)
};

export default Dashboard;
