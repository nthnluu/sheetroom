import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Footer from "../components/Misc/Footer";
import ChangeAccountTypeModal from "../components/Modals/ChangeAccountTypeModal";

interface Props {
    session: any;
    profileData: any;
}
const Dashboard: React.FC<Props> = ({session, profileData}) => {
    const [accountTypeModal, toggleAccountTypeModal] = useState(false)

    return (
        <>
            <ChangeAccountTypeModal changeTo={profileData.data.users_by_pk.account_type === "teacher" ? "student" : "teacher"} onCancel={() => toggleAccountTypeModal(false)} isOpen={accountTypeModal} userId={session.id}/>
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
                                   <form action="#" method="POST">

                                       <div className="grid grid-cols-6 gap-6">
                                           <div className="col-span-6 sm:col-span-3">
                                               <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">First name</label>
                                               <input id="first_name" defaultValue={profileData.data.users_by_pk.first_name} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                           </div>
                                           <div className="col-span-6 sm:col-span-3">
                                               <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">Last name</label>
                                               <input defaultValue={profileData.data.users_by_pk.last_name} id="last_name" className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                           </div>
                                       </div>

                                       <div className="mt-6">
                                           <label className="block text-sm leading-5 font-medium text-gray-700">
                                               Photo
                                           </label>
                                           <div className="mt-2 flex items-center">
                                               <img className="h-12 w-12 inline-block rounded-full" src={profileData.data.users_by_pk.image ? profileData.data.users_by_pk.image : "/profile.jpg"}/>
                                               <span className="ml-5 rounded-md shadow-sm">
                      <button type="button" className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
                        Change
                      </button>
                    </span>
                                           </div>
                                       </div>

                                       <div className="flex justify-end">
                                           <span className="inline-flex rounded-md shadow-sm">
  <button type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
    Update profile
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
                                           <a href="/pricing"
                                              className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">
                                               Change subscription &rarr;
                                           </a>
                                       </div>
                                   </div>
                               </div>
                               <div className="bg-white shadow rounded-lg mt-6">
                                   <div className="px-4 py-5 sm:p-6">
                                       <h3 className="text-lg leading-6 font-medium text-gray-900">
                                           Payment method
                                       </h3>
                                       <div className="mt-5">
                                           <div
                                               className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                                               <div className="sm:flex sm:items-start">
                                                   <svg className="h-8 w-auto sm:flex-shrink-0 sm:h-6" fill="none"
                                                        viewBox="0 0 36 24" role="img" aria-labelledby="svg-visa">
                                                       <title id="svg-visa">VISA</title>
                                                       <rect width="36" height="24" fill="#224DBA" rx="4"/>
                                                       <path fill="#fff" fill-rule="evenodd"
                                                             d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                                             clip-rule="evenodd"/>
                                                   </svg>
                                                   <div className="mt-3 sm:mt-0 sm:ml-4">
                                                       <div className="text-sm leading-5 font-medium text-gray-900">
                                                           Ending with 4242
                                                       </div>
                                                       <div
                                                           className="mt-1 text-sm leading-5 text-gray-600 sm:flex sm:items-center">
                                                           <div>
                                                               Expires 12/20
                                                           </div>
                                                           <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                &middot;
              </span>
                                                           <div className="mt-1 sm:mt-0">
                                                               Last updated on 22 Aug 2017
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
          <span className="inline-flex rounded-md shadow-sm">
            <button type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
              Edit
            </button>
          </span>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>

                           </>}</> : null}



                       {profileData.data.users_by_pk.account_type === "teacher" ? <div className="bg-white shadow rounded-lg mt-6">
                           <div className="px-4 py-5 sm:p-6">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">
                                   Change account type
                               </h3>
                               <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
                                   <p>
                                       You'll have limited access to your assignments and classes until you switch your account back to teacher.
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
                                       You'll have limited access to your classes and submissions until you switch your account back to student.
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
                                       Once you delete your account, you'll permanently lose all data associated with it. Going back is just like not an option.
                                   </p>
                               </div>
                               <div className="mt-5">
                                   <button type="button"
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
