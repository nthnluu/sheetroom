import React, {useState} from 'react';
import {getSession} from 'next-auth/client'
import {GetServerSideProps} from "next";
import PageContent from "../components/Dashboard/Content";
import AppLayout from "../components/PageLayouts/AppLayout/AppLayout";
import SettingsLayout from "../components/PageLayouts/SettingsLayout/SettingsLayout";
import CheckForUser from "../lib/CheckForUser";
import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Footer from "../components/Misc/Footer";
import JsonDebugBox from "../components/JsonDebugBox";

interface Props {
    session: string;
    profileData: any;
}


const NavbarTab = ({selected, label, onClick}) => {
    return <button onClick={onClick}
              className={selected ? "whitespace-no-wrap  pb-3 px-1 border-b-2 border-blue-500 font-medium text-sm leading-5 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700" : "whitespace-no-wrap pb-3 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"}
              aria-current={selected}>
        {label}
    </button>
}
const Dashboard: React.FC<Props> = ({session, profileData}) => {

    const [currentPage, setCurrentPage] = useState("profile");

    return (
        <>
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
                                               <img className="h-12 w-12 inline-block rounded-full" src={profileData.data.users_by_pk.image}/>
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

                       <div className="bg-white shadow rounded-lg mt-6">
                           <div className="px-4 py-5 sm:p-6">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">
                                   Upgrade to Sheetroom Pro
                               </h3>
                               <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                   <div className="max-w-xl text-sm leading-5 text-gray-500">
                                       <p>
                                           You're currently on the free tier.
                                       </p>
                                   </div>
                                   <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
        <span className="inline-flex rounded-md shadow-sm">
          <button type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            Upgrade
          </button>
        </span>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="bg-white shadow rounded-lg mt-6">
                           <div className="px-4 py-5 sm:p-6">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">
                                   Change account type
                               </h3>
                               <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                   <div className="max-w-xl text-sm leading-5 text-gray-500">
                                       <p>
                                           You'll have limited access to your assignments and classes until you switch your account back to teacher.
                                       </p>
                                   </div>
                                   <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
        <span className="inline-flex rounded-md shadow-sm">
          <button type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
            Convert to student account
          </button>
        </span>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="bg-white shadow rounded-lg mt-6">
                           <div className="px-4 py-5 sm:p-6">
                               <h3 className="text-lg leading-6 font-medium text-gray-900">
                                   Delete your account
                               </h3>
                               <div className="mt-2 sm:flex sm:items-start sm:justify-between">
                                   <div className="max-w-xl text-sm leading-5 text-gray-500">
                                       <p>
                                           Once you delete your account, you will lose permanently all data associated with it.
                                       </p>
                                   </div>
                                   <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
        <span className="inline-flex rounded-md shadow-sm">
          <button type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150">
            Delete account
          </button>
        </span>
                                   </div>
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
