import React from 'react'
import { providers, signIn } from 'next-auth/client'
import Navbar from "../components/PageLayouts/AppLayout/Navbar";

export default function SignIn({ providers }) {

    return (
        <>
            <Navbar logoOnly unfixed/>
            <div className="h-screen flex justify-center">
                <div className="space-y-4 mt-36 md:mt-64">
                    <h1 className="font-bold text-4xl text-gray-800">Sign in to Sheetroom</h1>
                    {Object.values(providers).map(provider => (
                        // @ts-ignore
                        <div key={provider.name} className="w-full ">
                            {/*// @ts-ignore*/}
                            <button type="button" onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/' })}
                                    className="items-center w-full text-center px-6 py-3 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                {/*// @ts-ignore*/}
                                <i className="fab fa-google mr-2"/>Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>


            </div>

        </>
    )
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context)
    }
}
