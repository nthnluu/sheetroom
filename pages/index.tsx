import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import React from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps} from "next";
import DesktopGraphic from "../components/LandingPage/DesktopGraphic";


const Index: React.FC<{ session: any }> = ({session}) => {

    return (
        <div className="min-h-screen overflow-x-hidden" style={{backgroundColor: '#E8F5FE'}}>
            <div className="z-50">
                <Navbar session={session} unfixed transparent darkText/>
            </div>
            <div>
                <div className="mx-auto px-4 pb-12 pt-20 md:pt-24 max-w-7xl">
                    <header className="max-w-6xl mx-auto mb-12 md:mb-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-gray-800 leading-tight z-40">Beautiful
                            assignments for desktop, mobile and paper.
                        </h1>
                    </header>
                    <DesktopGraphic/>
                </div>

            </div>
        </div>
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


