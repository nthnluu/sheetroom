import Head from 'next/head'
import Navbar from "../Components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="max-w-5xl mx-auto">
                <header>
                    <h1 className="text-7xl text-center font-black text-gray-900">Online assignments that just work</h1>
                </header>
            </div>
        </>
    )
}
