import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import { motion } from "framer-motion"


const Index: React.FC<{ session: any }> = ({session}) => {

    return (
        <>
            <div className="z-50">
                <Navbar session={session} unfixed transparent darkText/>
            </div>
            <div>
                <div className="mx-auto px-16 pb-12 pt-24 max-w-7xl">
                    <header className="mb-24 max-w-6xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-gray-800 leading-tight z-40">Beautiful
                            assignments for desktop, mobile and paper.
                        </h1>
                    </header>

                    <img src="https://user-images.githubusercontent.com/25859802/90092907-1ff21d00-dcdf-11ea-8576-867054bb9235.png" className="rounded-lg -mb-32 md:-mb-64 min-w-full"/>







                </div>

            </div>
        </>
    )
};


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (session) {
        res.writeHead(301, {location: '/dashboard'})
        res.end()
    }

    return {
        props: {
            session,
        },
    };
};

export default Index;


