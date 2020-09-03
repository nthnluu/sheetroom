import React, {useState} from "react";
import StepOneRadioGroup from "../components/WelcomePage/StepOneRadioGroup";
import StepThreeRadioGroup from "../components/WelcomePage/StepThreeRadioGroup";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getSession} from "next-auth/client";
import {useMutation} from "urql";
import {me, onboardUser} from "../lib/graphql/User";
import CircularProgress from "@material-ui/core/CircularProgress";
import Head from "next/head";

const StepOne: React.FC<{ onContinue, currentValue, onChange }> = ({onContinue, currentValue, onChange}) => {
    return (<div>
        <h1 className="text-4xl font-bold">👋 Welcome to Sheetroom</h1>
        <h2 className="text-xl font-light mb-8">First, which option best describes you?</h2>
        <StepOneRadioGroup value={currentValue} onChange={value => onChange(value)}/>
        <button type="button" onClick={() => onContinue()} disabled={!currentValue}
                className={"w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150 " + (!currentValue ? "opacity-50 cursor-not-allowed " : "opacity-100")}>
            Continue
        </button>
        <p className="text-sm mt-1 text-gray-300 font-italic"><i>You can change this later in settings.</i></p>
    </div>)
}

const StepTwo: React.FC<{ onContinue, onBack, firstName, lastName, setFirstName, setLastName }> = ({onContinue, onBack, firstName, lastName, setFirstName, setLastName}) => {
    return (<div>
        <h1 className="text-4xl font-bold">⚡️ Now let's get to know you</h1>
        <h2 className="text-xl font-light mb-8">What is your name?</h2>
        <div>
            <div>
                <label htmlFor="fname" className="sr-only">First Name</label>
                <div className="relative rounded-lg shadow-sm">
                    <input id="fname" name="fname" className="form-input p-4 block w-full sm:text-lg sm:leading-5"
                           placeholder="First Name" value={firstName}
                           onChange={event => setFirstName(event.target.value)}/>
                </div>
            </div>
            <div className="mt-2">
                <label htmlFor="lname" className="sr-only">Last Name</label>
                <div className="relative rounded-lg shadow-sm">
                    <input id="lname" name="lname" className="form-input p-4 block w-full sm:text-lg sm:leading-5"
                           placeholder="Last Name" value={lastName}
                           onChange={event => setLastName(event.target.value)}/>
                </div>
            </div>

            <button type="button" onClick={() => onContinue()} disabled={!firstName || !lastName}
                    className={"w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150 " + (!firstName || !lastName ? "opacity-50 cursor-not-allowed" : "opacity-100")}>
                Continue
            </button>
        </div>
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
        <div>
            <StepThreeRadioGroup/>
            <button type="button" onClick={() => onContinue()}
                    className="w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150">
                Continue
            </button>
        </div>

        <button type="button" onClick={() => onBack()}
                className="w-full mt-2 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:shadow-outline active:bg-gray-300 transition ease-in-out duration-150">
            Back
        </button>
    </div>)
}

const StepFour: React.FC<{ onContinue, onBack }> = ({onContinue, onBack}) => {
    const [isAgreed, toggleIsAgreed] = useState(false)
    const [isLoading, toggleLoading] = useState(false)

    return (<div>
        <h1 className="text-4xl font-bold">📄 Terms and Conditions</h1>
        <h2 className="text-xl font-light mb-8">Confirm you have read and agreed to the following:</h2>
        <a href="/terms" className="w-full block p-4 border border-gray-300 shadow-sm rounded-lg text-left mb-2">
            <div className="font-semibold text-gray-800">Terms of Use &rarr;</div>
            <div className="text-gray-500 text-sm">Our policy detailing what you can and can't do on Sheetroom.</div>
        </a>
        <a  href="/privacy" className="w-full block p-4 border border-gray-300 shadow-sm rounded-lg text-left">
           <div className="font-semibold text-gray-800">Privacy Policy &rarr;</div>
            <div className="text-gray-500 text-sm">Our policy detailing how we handle your information.</div>
        </a>


        <div className="mt-4 text-left">
            <div className="relative flex items-start">
                <div className="flex items-center h-5">
                    <input id="offers" type="checkbox" onClick={() => toggleIsAgreed(!isAgreed)} className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out" />
                </div>
                <div className="ml-3 leading-5">
                    <label htmlFor="offers" className="font-medium text-gray-700">I accept the terms and conditions and privacy policy </label>
                </div>
            </div>
        </div>
        <div>
            <button type="button" onClick={() => {toggleLoading(true); onContinue()}} disabled={!isAgreed || isLoading}
                    className={"w-full mt-8 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline active:bg-blue-700 transition ease-in-out duration-150 " + (!isAgreed ? "opacity-50 cursor-not-allowed" : "opacity-100")}>
                {isLoading ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Continue
            </button>
        </div>

        <button type="button" onClick={() => onBack()}
                className="w-full mt-2 text-center items-center p-2 border border-transparent text-base leading-6 font-medium rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:shadow-outline active:bg-gray-300 transition ease-in-out duration-150">
            Back
        </button>
    </div>)
}


const WelcomePage: InferGetServerSidePropsType<typeof getServerSideProps> = ({session}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [roleSelection, setRoleSelection] = useState()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [mutateUserResult, mutateResult] = useMutation(onboardUser)

    return (
        <>
            <Head>
                <title>Welcome | Sheetroom</title>
            </Head>
            <div>
                <div className="max-w-xl mx-auto h-screen flex items-center">
                    <div className="w-full p-4 md:p-6 text-center text-gray-800">
                        {currentPage === 1 ? <StepOne onContinue={() => setCurrentPage(2)} currentValue={roleSelection}
                                                      onChange={setRoleSelection}/> : null}
                        {currentPage === 2 ?
                            <StepTwo onContinue={() => setCurrentPage(3)} onBack={() => setCurrentPage(1)}
                                     lastName={lastName} firstName={firstName} setFirstName={setFirstName}
                                     setLastName={setLastName}/> : null}
                        {/*{currentPage === 3 ?*/}
                        {/*    <StepThree onContinue={() => setCurrentPage(4)} onBack={() => setCurrentPage(2)}/> : null}*/}
                        {currentPage === 3 ? <StepFour onContinue={() => {
                            mutateResult({
                                firstName: firstName,
                                lastName: lastName,
                                role: roleSelection,
                                userId: session.id
                            })
                                .then(() => window.location.href = '/')
                                .catch((error) => console.log(error))
                        }} onBack={() => setCurrentPage(2)}/> : null}
                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (!session) {
        res.writeHead(301, {location: '/'})
        res.end()
    }

    const profileData = await fetch('https://api.sheetroom.com/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS'
        },
        body: JSON.stringify({query: me, variables: {userId: session.id}}),
    })
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });

    if (profileData.data.users_by_pk.account_type !== "new") {
        res.writeHead(301, {location: '/'})
        res.end()
    }


    return {
        props: {
            session,
            profileData
        },
    };
};
export default WelcomePage
