import Head from 'next/head'
import Navbar from "../Components/Navbar/Navbar";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

export default function Home() {
    const navBarItems = {
        links: [{icon: 'fas fa-circle mr-2', label: 'Features'}, {icon: 'fas fa-circle mr-2', label: 'About us'}, {icon: 'fas fa-circle mr-2', label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up'}, secondary: {label: 'Log in'}}
    };
    return (
        <>
            <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} exam/>
            <div className="max-w-5xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-darkGray">Online assignments that just work</h1>
                    <PrimaryButton size="xl" text="Button"/>
                    <button className="shadow-outline-indigo">shadow</button>
                </header>
            </div>
        </>
    )
}
