import React from 'react'
import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import {useRouter} from "next/router";

export default function VerifyRequest() {

    return (
        <>
            <Navbar logoOnly unfixed/>
            <div className="h-full flex justify-center items-center p-4">
                <div className="space-y-4 text-center">
                    <img src="/mail.svg" className=" mx-auto h-96"/>

                    <div className="max-w-2xl">
                        <h1 className="font-bold text-3xl md:text-4xl text-gray-800">Next, confirm your email address</h1>
                        <p className="text-lg md:text-xl">Click the button inside the email we sent to your email to continue.</p>
                    </div>


                </div>


            </div>

        </>
    )
}
