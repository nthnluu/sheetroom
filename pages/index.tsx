import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps, InferGetServerSidePropsType} from "next";


const Index: React.FC<{ session: any }> = ({session}) => {

    return (
        <>
            <div style={{backgroundColor: "#16181a"}} className="z-50">
                <Navbar session={session} color="#16181a" />
            </div>
            <div style={{backgroundColor: "#16181a"}}>
                <div className="max-w-6xl mx-auto pt-12 px-4 pb-12 pt-36">
                    <header className="mb-24">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-white leading-tight">Beautiful
                            assignments for desktop, mobile and paper.
                        </h1>
                    </header>
                    <img src="/screenshot.png" className="rounded-lg -mb-32 md:-mb-64 shadow-lg min-w-full"/>


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


