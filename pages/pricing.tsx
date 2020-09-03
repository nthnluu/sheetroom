import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import CheckForUser from "../lib/CheckForUser";
import Footer from "../components/Misc/Footer";
import {loadStripe} from "@stripe/stripe-js";
import Head from "next/head";


const Pricing: React.FC<{ session: any; profileData: any; }> = ({session, profileData}) => {

    const stripePromise = loadStripe('pk_live_51HM11eI8UDkQvU4dUPMNb1kEmsBuFORTIxwxfeaGksA0xyPalSLA4SdhXMiCUTlJtxHvjE3eBRhuUYbWIXMWfAoQ00EmQDBG2g');

    const [paymentMode, setPaymentMode] = useState(0)

    const handleClick = async (event) => {
        const url =  (paymentMode === 0 ? 'api/stripe-checkout-yearly' : 'api/stripe-checkout')
        // Call your backend to create the Checkout session.
        const sessionId = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({customerId: profileData.data.users_by_pk.stripeCustomerId}),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const {error} = await stripe.redirectToCheckout({
            sessionId,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };

    return (
        <>
            <Head>
                <title>Pricing | Sheetroom</title>
            </Head>
            <div className="z-50">
                <Navbar session={session} profileData={profileData} unfixed/>
            </div>

            <div>

                <div style={{backgroundColor: '#242629'}}>
                    <div className="pt-12 sm:pt-16 lg:pt-24">
                        <div className="max-w-screen-xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                            <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
                                <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
                                    Pricing
                                </h2>
                                <p className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">
                                    Simple, straight forward pricing
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
                        <div className="relative">
                            <div className="absolute inset-0 h-3/4" style={{backgroundColor: '#242629'}}/>
                            <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div
                                    className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                                            <div>
                                                <h3 className="inline-flex  leading-5 font-semibold tracking-wide uppercase text-gray-600"
                                                    id="tier-standard">
                                                    FREE FOREVER
                                                </h3>
                                            </div>
                                            <div
                                                className="mt-4 flex items-baseline text-6xl leading-none font-extrabold">
                                                Free
                                            </div>
                                            <p className="mt-5 text-lg leading-7 text-gray-500">
                                                All the basics for teachers that are just getting started.
                                            </p>
                                        </div>
                                        <div
                                            className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                                            <ul className="space-y-4">
                                                <li className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-base leading-6 text-gray-700">
                                                        10 Assignments
                                                    </p>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-base leading-6 text-gray-700">
                                                        4 Classes
                                                    </p>
                                                </li>
                                                {/*<li className="flex items-start">*/}
                                                {/*    <div className="flex-shrink-0">*/}
                                                {/*        <svg className="h-6 w-6 text-green-500" fill="none"*/}
                                                {/*             viewBox="0 0 24 24" stroke="currentColor">*/}
                                                {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                                                {/*                  strokeWidth={2} d="M5 13l4 4L19 7"/>*/}
                                                {/*        </svg>*/}
                                                {/*    </div>*/}
                                                {/*    <p className="ml-3 text-base leading-6 text-gray-700">*/}
                                                {/*        Email notifications*/}
                                                {/*    </p>*/}
                                                {/*</li>*/}
                                                {/*<li className="flex items-start">*/}
                                                {/*    <div className="flex-shrink-0">*/}
                                                {/*        <svg className="h-6 w-6 text-green-500" fill="none"*/}
                                                {/*             viewBox="0 0 24 24" stroke="currentColor">*/}
                                                {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                                                {/*                  strokeWidth={2} d="M5 13l4 4L19 7"/>*/}
                                                {/*        </svg>*/}
                                                {/*    </div>*/}
                                                {/*    <p className="ml-3 text-base leading-6 text-gray-700">*/}
                                                {/*        Basic assignment printing*/}
                                                {/*    </p>*/}
                                                {/*</li>*/}
                                            </ul>
                                            {session ? ((profileData.data.users_by_pk.account_type === "teacher" ? profileData.data.users_by_pk.is_pro ?
                                                <div className="rounded-md shadow">
                                                    <a href="#"
                                                       className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                                       aria-describedby="tier-standard">
                                                        Change plan
                                                    </a>
                                                </div> : <div className="rounded-md">
                                                <span
                                                    className="flex items-center opacity-50 justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                                    aria-describedby="tier-standard">
                                                    Current Plan
                                                </span>
                                                </div> : null)) : null}

                                        </div>
                                    </div>
                                    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                        <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                                            <div>
                                                <h3 className="inline-flex  leading-5 font-semibold tracking-wide uppercase text-blue-600"
                                                    id="tier-standard">
                                                    PRO
                                                </h3>
                                            </div>

                                            <div
                                                className="mt-4 flex items-baseline text-6xl leading-none font-extrabold">
                                                ${paymentMode === 0 ? 6 : 12}
                                                <span className="ml-1 text-2xl leading-8 font-medium text-gray-500">
                        /mo
                      </span>
                                            </div>
                                            <div className="text-base mt-3">
                                                <div className="bg-cool-gray-100 grid grid-cols-2 shadow-inner rounded-md p-1 overflow-hidden">
                                                    <button onClick={() => setPaymentMode(0)} className={"font-medium text-gray-500 rounded focus:outline-none focus:bg-gray-50 " + (paymentMode === 0 ? "bg-white shadow-lg" : null)}>
                                                        YEARLY
                                                    </button>
                                                    <button onClick={() => setPaymentMode(1)} className={"font-medium text-gray-500 rounded focus:outline-none focus:bg-gray-50 " + (paymentMode === 1 ? "bg-white shadow-lg" : null)}>
                                                        MONTHLY
                                                    </button>
                                                </div>

                                            </div>
                                            <p className="mt-2 text-lg leading-7 text-gray-500">
                                                Full, unlimited access for teachers who need an all-in-one classwork solution.
                                            </p>
                                        </div>
                                        <div
                                            className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                                            <ul className="space-y-4">
                                                <li className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-base leading-6 text-gray-700">
                                                        Unlimited Assignments
                                                    </p>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-base leading-6 text-gray-700">
                                                        Unlimited Classes
                                                    </p>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-6 w-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-base leading-6 text-gray-700">
                                                        Image uploads
                                                    </p>
                                                </li>
                                                {/*<li className="flex items-start">*/}
                                                {/*    <div className="flex-shrink-0">*/}
                                                {/*        <svg className="h-6 w-6 text-green-500" fill="none"*/}
                                                {/*             viewBox="0 0 24 24" stroke="currentColor">*/}
                                                {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                                                {/*                  strokeWidth={2} d="M5 13l4 4L19 7"/>*/}
                                                {/*        </svg>*/}
                                                {/*    </div>*/}
                                                {/*    <p className="ml-3 text-base leading-6 text-gray-700">*/}
                                                {/*        Vel ipsa esse repudiandae excepturi*/}
                                                {/*    </p>*/}
                                                {/*</li>*/}
                                                {/*<li className="flex items-start">*/}
                                                {/*    <div className="flex-shrink-0">*/}
                                                {/*        <svg className="h-6 w-6 text-green-500" fill="none"*/}
                                                {/*             viewBox="0 0 24 24" stroke="currentColor">*/}
                                                {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
                                                {/*                  strokeWidth={2} d="M5 13l4 4L19 7"/>*/}
                                                {/*        </svg>*/}
                                                {/*    </div>*/}
                                                {/*    <p className="ml-3 text-base leading-6 text-gray-700">*/}
                                                {/*        Itaque cupiditate adipisci quibusdam*/}
                                                {/*    </p>*/}
                                                {/*</li>*/}
                                            </ul>
                                            <div className="rounded-md shadow">
                                                {session ? ((profileData.data.users_by_pk.account_type === "teacher" ? !profileData.data.users_by_pk.is_pro ?
                                                    <div className="rounded-md shadow">
                                                        <button onClick={handleClick}
                                                                className="flex w-full items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                                                aria-describedby="tier-standard">
                                                            Upgrade
                                                        </button>
                                                    </div> : <div className="rounded-md opacity-25">
                                                <span
                                                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                                                    aria-describedby="tier-standard">
                                                    Current Plan
                                                </span>
                                                    </div> : null)) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
                            <div className="max-w-md mx-auto lg:max-w-5xl ">
                                <div className="rounded-lg bg-gray-100 px-6 py-8 sm:p-10 lg:flex lg:items-center">
                                    <div className="flex-1">
                                        <div className="flex justify-start items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                            <h3 className="inline-flex ml-2 leading-5 font-semibold tracking-wide uppercase text-gray-800">
                                                INSTITUTIONS
                                            </h3>
                                        </div>
                                        <div className="mt-4 text-lg leading-7 text-gray-600">
                                            For  schools and districts who need additional control,
                                            custom account security, and support.
                                        </div>
                                    </div>
                                    <div className="mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0">
                                        <span
                                           className="flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-gray-900 bg-white hover:text-gray-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                                            Coming soon
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>


        </>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    return CheckForUser(req, res, false)
};

export default Pricing;


