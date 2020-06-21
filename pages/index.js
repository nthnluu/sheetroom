import Head from 'next/head'
import Navbar from "../Components/Navbar/Navbar";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import SecondaryButton from "../Components/Buttons/SecondaryButton";

export default function Home() {
    const navBarItems = {
        links: [{label: 'Features'}, {label: 'About us'}, {label: 'Pricing'}],
        actionButtons: {primary: {label: 'Sign up'}, secondary: {label: 'Log in'}}
    };
    return (
        <>
            <Navbar items={navBarItems.links} actionButtons={navBarItems.actionButtons} />
            <div className="max-w-6xl mx-auto pt-32 px-4">
                <header>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-black text-gray-900">Online assignments that just work</h1>
                    <div className="flex">
                        <div className="mt-1 relative rounded-md shadow-sm flex-grow">
                            <input id="email" className="form-input block w-full sm:text-lg sm:leading-5 py-5"
                                   placeholder="Enter assignment code"/>
                        </div>
                        <PrimaryButton size="lg" color="orange" text="Button A" className="inline-flex"/>
                    </div>

                    <SecondaryButton size="md" color="red" text="Button B"/>
                    <button className="bg-red-50">shadow</button>
                </header>
            </div>
        </>
    )
}
