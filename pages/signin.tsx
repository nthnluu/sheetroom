import React, {useState} from 'react'
import { providers, signIn } from 'next-auth/client'
import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Divider from '@material-ui/core/Divider';

export default function SignIn({ providers }) {
    const [currentValue, setCurrentValue] = useState("")

    return (
        <>
            <Navbar logoOnly unfixed/>
            <div className="h-screen flex justify-center">
                <div className="space-y-4 mt-24 md:mt-56 p-4">
                    <h1 className="font-bold text-3xl md:text-4xl text-gray-800">Sign in to Sheetroom</h1>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative rounded-md shadow-sm">
                            <input id="email" className="form-input p-4 block w-full sm:text-lg sm:leading-5"
                                   placeholder="you@example.com" value={currentValue} onChange={event => setCurrentValue(event.target.value)}/>
                        </div>
                        <button type="button" onClick={() => signIn("email", { email: currentValue, callbackUrl: 'http://localhost:3000/' })}
                                className="items-center w-full text-center px-6 py-2 mt-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                            {/*// @ts-ignore*/}
                            Continue
                        </button>
                    </div>
                    <div>
                        <div className="py-4">
                            <Divider />
                            <div className="mb-2 text-gray-500 font-medium text-lg text-center bg-white mx-auto -mt-4 w-12">Or</div>
                        </div>

                        <button type="button" onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/' })}
                                className="items-center w-full text-center px-6 py-3 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                            {/*// @ts-ignore*/}
                            <i className="fab fa-google mr-2"/>Sign in with Google
                        </button>
                    </div>
                </div>


            </div>

        </>
    )
}

SignIn.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    }
}
