import Head from 'next/head'
import Navbar from "../Components/Navbar";

export default function Home() {
    const navBarItems = [{icon: 'fas fa-circle', label: 'Features'}, {icon: 'fas fa-circle', label: 'About us'}, {icon: 'fas fa-circle', label: 'Pricing'}];
    return (
        <>
            <Navbar items={navBarItems} exam/>
            <div className="max-w-5xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900">Online assignments that just work</h1>
                </header>
            </div>
        </>
    )
}
