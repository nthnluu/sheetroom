import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { motion } from "framer-motion"


const PricingCard = ({tier, price, description}) => {
    return (<div className="w-full border rounded-lg p-6 space-y-2">
        <h1 className="font-semibold text-teal-400 text-xl">{tier}</h1>
        <h2 className="font-bold text-gray-800 text-4xl">${price}</h2>
        <p className="font-semibold">{description}</p>
        <button type="button"
                className="w-full items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
            Button text
        </button>
    </div>)
}

const Pricing: React.FC<{ session: any }> = ({session}) => {

    return (
        <>
            <div className="z-50">
                <Navbar session={session} unfixed transparent darkText/>
            </div>
            <div>
                <div className="mx-auto px-16 pb-12 pt-24 max-w-7xl">
                    <header className="mb-24 max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-gray-800 leading-tight z-40">Pricing</h1>
                    </header>

                    <div className="grid grid-cols-4 gap-6">
                        <PricingCard tier="Free" price="0" description="For anyone looking for a simple way to create and accept online classwork."/>
                        <div className="w-full border rounded-lg p-6 space-y-2 bg-blue-500 text-white">
                            <h1 className="font-semibold text-xl">Pro</h1>
                            <h2 className="font-bold text-4xl">$12</h2>
                            <p className="font-semibold">For teachers looking for</p>
                            <button type="button"
                                    className="w-full items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal active:bg-teal-700 transition ease-in-out duration-150">
                                Button text
                            </button>
                        </div>
                        <PricingCard tier="Teams" price="0" description="For anyone looking for a simple way to create and accept online classwork."/>
                        <PricingCard tier="Free" price="0" description="For anyone looking for a simple way to create and accept online classwork."/>

                    </div>







                </div>

            </div>
        </>
    )
};


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (session) {
        res.writeHead(302, {location: '/dashboard'})
        res.end()
    }

    return {
        props: {
            session,
        },
    };
};

export default Pricing;


