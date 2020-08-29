import React, {useState} from 'react'
import {providers, signIn} from 'next-auth/client'
import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Divider from '@material-ui/core/Divider';
import CircularProgress from "@material-ui/core/CircularProgress";


export default function SignIn() {
    const [currentValue, setCurrentValue] = useState("")
    const [isLoading, toggleIsLoading] = useState(false)

    return (
        <>
            <Navbar logoOnly unfixed/>
            <div className="flex justify-center items-center">
                <div className="space-y-4 p-4 mt-48 md:mt-56">
                    <h1 className="font-bold text-3xl text-center sm:text-4xl text-gray-800">Continue to Sheetroom</h1>
                    <form onSubmit={event => {
                        event.preventDefault();
                        toggleIsLoading(true)

                        // @ts-ignore
                        if (event.target.email.value.length > 0) {
                            // @ts-ignore
                            signIn("email", {email: event.target.email.value, callbackUrl: 'http://localhost:3000/'})
                        }
                    }}>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative rounded-md shadow-sm">
                            <input id="email" className="form-input p-4 text-center block w-full sm:text-lg sm:leading-5"
                                   autoComplete="email" required
                                   placeholder="you@example.com" value={currentValue}
                                   onChange={event => setCurrentValue(event.target.value)}/>
                        </div>
                        <button type="submit" disabled={currentValue.length <= 0}
                                className={"items-center w-full text-center px-6 py-2 mt-2 border border-gray-300 text-base leading-6 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 " + (currentValue.length <= 0 ? "opacity-50 bg-gray-100 cursor-not-allowed" : "opacity-100")}>
                            {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Continue
                        </button>
                    </form>
                    <div>
                        <div className="py-4">
                            <Divider/>
                            <div
                                className="mb-2 text-gray-500 font-medium text-lg text-center bg-white mx-auto -mt-4 w-12">Or
                            </div>
                        </div>

                        <button type="button" onClick={() => signIn("google", {callbackUrl: 'http://localhost:3000/'})}
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
