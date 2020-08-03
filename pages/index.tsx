import Navbar from "../Components/Navbar/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";


const Index: React.FC = () => {

    return (
        <>
            <Navbar/>
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900 leading-tight">Beautiful
                        assignments for desktop, mobile and paper.
                    </h1>
                </header>
            </div>
        </>
    )
};


// export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
//     const session = await getSession({req});
//
//     return {props:{session: session}}
// };

export default Index;


