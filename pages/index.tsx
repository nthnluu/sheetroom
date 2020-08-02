import Navbar from "../Components/Navbar/Navbar";
import React, {useState} from 'react';
import {getSession} from 'next-auth/client';
import {GetServerSideProps} from "next";
import QuillEditor from "../Components/Editor/QuillEditor";



const Index: React.FC = () => {
    const [quillValue, setQuillValue] = useState();

    return (
        <>
            <Navbar/>
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900 leading-tight">Beautiful assignments for desktop, mobile and paper.
                    </h1>
                </header>
                {typeof window === 'undefined' ? <></> : <QuillEditor onChange={(value) => setQuillValue(value)} value={quillValue} active={true} placeholder="Placeholder"/>}
            </div>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            return { props: {session: 'annonymous'} }
        } else {
            context.res.writeHead(302, {
                Location: '/dashboard'
            });
            context.res.end();
        }
    }
};

export default Index;


