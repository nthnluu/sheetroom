import React from "react";
import RadioGroup from "../Components/WelcomePage/RadioGroup";

const WelcomePage: React.FC = () => {
    return (
        <div className="max-w-xl mx-auto h-screen flex items-center">
            <div className="w-full p-4 md:p-6 text-center">
                <h1 className="text-4xl font-bold">👋 Welcome to Sheetroom</h1>
                <h2 className="text-xl font-light mb-8">First, which option best describes you?</h2>
                <RadioGroup/>
                <button type="button"
                        className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                    Continue
                </button>
            </div>

        </div>
    )
}

export default WelcomePage
