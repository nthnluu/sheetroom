import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {motion} from "framer-motion"


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
                <Navbar session={session} unfixed/>
            </div>

            <div className="bg-gray-100">
                <div className="mx-auto px-16 pt-24 pb-12 max-w-7xl">
                    <header className="mb-24 max-w-6xl mx-auto">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-gray-800 leading-tight z-40">The ultimate online assessment platform</h1>
                    </header>
                </div>
            </div>
            <section className="px-2">
                <div className="p-8 shadow-lg w-full bg-white rounded-lg max-w-7xl mx-auto -mt-12">
                    <h1 className="font-bold text-gray-800 text-3xl">Sheetroom Pro</h1>
                    <p className="text-lg text-gray-400 mt-2">Create unlimited assignments and classes,  </p>
                </div>
            </section>



        </>
    )
};


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (!session) {
        res.writeHead(302, {location: '/'})
        res.end()
    }

    return {
        props: {
            session,
        },
    };
};

export default Pricing;


