import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React from "react";
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";

const SheetroomProConfirmation = ({session, profileData}) => {
    return <div>
        <div className="z-50">
            <Navbar session={session} profileData={profileData} unfixed/>
        </div>
        <img className="mx-auto" src="/tasks.svg"/>

        <h1 className="text-4xl font-bold text-center text-gray-800">Thank you for purchasing Sheetroom Pro!</h1>
        <h2 className="text-xl text-gray-500 text-center">You now have access to the best, all-in-one classwork solution.</h2>
        <button type="button" onClick={() => window.location.href = "/dashboard"}
                className="mx-auto mt-4 block items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
            <i className="fas fa-chevron-left mr-2"/>Back to dashboard
        </button>
    </div>
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, false)
};

export default SheetroomProConfirmation
