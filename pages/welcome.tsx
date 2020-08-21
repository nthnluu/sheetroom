import React, {useState} from "react";
import StepOneRadioGroup from "../components/WelcomePage/StepOneRadioGroup";
import StepThreeRadioGroup from "../components/WelcomePage/StepThreeRadioGroup";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getSession} from "next-auth/client";
import getEditDistance from "../lib/getEditDistance";
import {useMutation} from "urql";
import {onboardUser} from "../lib/graphql/User";

const StepOne: React.FC<{ onContinue, currentValue, onChange }> = ({onContinue, currentValue, onChange}) => {
    return (<div>
        <h1 className="text-4xl font-bold">👋 Welcome to Sheetroom</h1>
        <h2 className="text-xl font-light mb-8">First, which option best describes you?</h2>
        <StepOneRadioGroup value={currentValue} onChange={value => onChange(value)}/>
        <button type="button" onClick={() => onContinue()}
                className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
            Continue
        </button>
        <p className="text-sm mt-1 text-gray-300 font-italic"><i>You can change this later in settings.</i></p>
    </div>)
}

const StepTwo: React.FC<{ onContinue, onBack, firstName, lastName, setFirstName, setLastName }> = ({onContinue, onBack, firstName, lastName, setFirstName, setLastName}) => {
    return (<div>
        <h1 className="text-4xl font-bold">⚡️ Now let's get to know you</h1>
        <h2 className="text-xl font-light mb-8">What is your name?</h2>
        <form autoComplete="on">
            <div>
                <label htmlFor="fname" className="sr-only">First Name</label>
                <div className="relative rounded-lg shadow-sm">
                    <input id="fname" name="fname" className="form-input p-4 block w-full sm:text-lg sm:leading-5"
                           placeholder="First Name" value={firstName}
                           onChange={event => setFirstName(event.target.value)}/>
                </div>
            </div>
            <div className="mt-4">
                <label htmlFor="lname" className="sr-only">Last Name</label>
                <div className="relative rounded-lg shadow-sm">
                    <input id="lname" name="lname" className="form-input p-4 block w-full sm:text-lg sm:leading-5"
                           placeholder="Last Name" value={lastName}
                           onChange={event => setLastName(event.target.value)}/>
                </div>
            </div>

            <button type="button" onClick={() => onContinue()}
                    className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                Continue
            </button>
        </form>
        <button type="button" onClick={() => onBack()}
                className="w-full mt-2 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:shadow-outline active:bg-gray-300 transition ease-in-out duration-150">
            Back
        </button>
    </div>)
}

const StepThree: React.FC<{ onContinue, onBack }> = ({onContinue, onBack}) => {
    return (<div>
        <h1 className="text-4xl font-bold">☎️ Let's keep you up to date</h1>
        <h2 className="text-xl font-light mb-8">How do you want to receive notifications?</h2>
        <form autoComplete="on">
            <StepThreeRadioGroup/>
            <button type="button" onClick={() => onContinue()}
                    className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                Continue
            </button>
        </form>

        <button type="button" onClick={() => onBack()}
                className="w-full mt-2 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:shadow-outline active:bg-gray-300 transition ease-in-out duration-150">
            Back
        </button>
    </div>)
}

const StepFour: React.FC<{ onContinue, onBack }> = ({onContinue, onBack}) => {
    return (<div>
        <h1 className="text-4xl font-bold">📄 You're almost there</h1>
        <h2 className="text-xl font-light mb-8">Please conf following:</h2>
        <form autoComplete="on">
            <button type="button" onClick={() => onContinue()}
                    className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                Continue
            </button>
        </form>

        <button type="button" onClick={() => onBack()}
                className="w-full mt-2 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:shadow-outline active:bg-gray-300 transition ease-in-out duration-150">
            Back
        </button>
    </div>)
}


const WelcomePage: InferGetServerSidePropsType<typeof getServerSideProps> = ({session}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [roleSelection, setRoleSelection] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()

    const [mutateUserResult, mutateResult] = useMutation(onboardUser)

    return (

        <div>
            <div className="max-w-xl mx-auto h-screen flex items-center">
                <div className="w-full p-4 md:p-6 text-center text-gray-800">
                    {currentPage === 1 ? <StepOne onContinue={() => setCurrentPage(2)} currentValue={roleSelection}
                                                  onChange={setRoleSelection}/> : null}
                    {currentPage === 2 ? <StepTwo onContinue={() => setCurrentPage(3)} onBack={() => setCurrentPage(1)}
                                                  lastName={lastName} firstName={firstName} setFirstName={setFirstName}
                                                  setLastName={setLastName}/> : null}
                    {currentPage === 3 ?
                        <StepThree onContinue={() => setCurrentPage(4)} onBack={() => setCurrentPage(2)}/> : null}
                    {currentPage === 4 ? <StepFour onContinue={() => {
                        mutateResult({firstName: firstName, lastName: lastName, role: roleSelection})
                            .then(() => window.location.href = '/')
                            .catch((error) => console.log(error))
                    }} onBack={() => setCurrentPage(3)}/> : null}
                </div>

            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req});

    return {
        props: {
            session,
        },
    };
};

export default WelcomePage
