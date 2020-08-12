import React, {useState} from 'react'
import { providers, signIn } from 'next-auth/client'
import Navbar from "../../components/PageLayouts/AppLayout/Navbar";
import Divider from '@material-ui/core/Divider';
import JsonDebugBox from "../../components/JsonDebugBox";

export default function VerifyRequest({ providers }) {
    const [currentValue, setCurrentValue] = useState("")

    return (
        <>
            <Navbar logoOnly unfixed/>
            <div className="h-full flex justify-center">
                <div className="space-y-4 mt-36 md:mt-56 text-center">
                    <div>
                        <h1 className="font-bold text-4xl text-gray-800">Next, confirm your email address</h1>
                        <p className="text-xl">Click the button inside the email we sent to confirm your address.</p>
                    </div>

                    <img src="/envelope.svg" className="h-56 mx-auto"/>
                </div>


            </div>

        </>
    )
}

VerifyRequest.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    }
}
