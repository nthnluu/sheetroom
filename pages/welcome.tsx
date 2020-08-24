import React, {useState} from "react";
import StepOneRadioGroup from "../components/WelcomePage/StepOneRadioGroup";
import StepThreeRadioGroup from "../components/WelcomePage/StepThreeRadioGroup";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {getSession} from "next-auth/client";
import {useMutation} from "urql";
import {me, onboardUser} from "../lib/graphql/User";

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
        <div>
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
    return (<div>
        <h1 className="text-4xl font-bold">📄 Terms and Conditions</h1>
        <div className="p-3 rounded-lg border border-gray-300 h-56 overflow-y-scroll text-left">
            <p>
                <strong>THIS IS A PLACEHOLDER TERMS OF SERVICE</strong><br/>
                Welcome to Sheetroom. This site is provided as a service to our visitors and may be used for informational purposes only. Because the Terms and Conditions contain legal obligations, please read them carefully.

                1. YOUR AGREEMENT
                By using this Site, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use this site.

                PLEASE NOTE: We reserve the right, at our sole discretion, to change, modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes and/or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes. For your information, this page was last updated as of the date at the top of these terms and conditions.
                2. PRIVACY
                Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.

                3. LINKED SITES
                This Site may contain links to other independent third-party Web sites ("Linked Sites”). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.

                4. FORWARD LOOKING STATEMENTS
                All materials reproduced on this site speak as of the original date of publication or filing. The fact that a document is available on this site does not mean that the information contained in such document has not been modified or superseded by events or by a subsequent document or filing. We have no duty or policy to update any information or statements contained on this site and, therefore, such information or statements should not be relied upon as being current as of the date you access this site.

                5. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY
                A. THIS SITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL ERRORS. WE DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE MATERIALS OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER INFORMATION DISPLAYED OR DISTRIBUTED THROUGH THE SITE. YOU EXPRESSLY UNDERSTAND AND AGREE THAT: (i) YOUR USE OF THE SITE, INCLUDING ANY RELIANCE ON ANY SUCH OPINION, ADVICE, STATEMENT, MEMORANDUM, OR INFORMATION CONTAINED HEREIN, SHALL BE AT YOUR SOLE RISK; (ii) THE SITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS; (iii) EXCEPT AS EXPRESSLY PROVIDED HEREIN WE DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE EFFORT, TITLE AND NON-INFRINGEMENT; (iv) WE MAKE NO WARRANTY WITH RESPECT TO THE RESULTS THAT MAY BE OBTAINED FROM THIS SITE, THE PRODUCTS OR SERVICES ADVERTISED OR OFFERED OR MERCHANTS INVOLVED; (v) ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF THE SITE IS DONE AT YOUR OWN DISCRETION AND RISK; and (vi) YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR FOR ANY LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.

                B. YOU UNDERSTAND AND AGREE THAT UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL WE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OF, OR THE INABILITY TO USE, ANY OF OUR SITES OR MATERIALS OR FUNCTIONS ON ANY SUCH SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE FOREGOING LIMITATIONS SHALL APPLY NOTWITHSTANDING ANY FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.

                6. EXCLUSIONS AND LIMITATIONS
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, OUR LIABILITY IN SUCH JURISDICTION SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMITTED BY LAW.

                7. OUR PROPRIETARY RIGHTS
                This Site and all its Contents are intended solely for personal, non-commercial use. Except as expressly provided, nothing within the Site shall be construed as conferring any license under our or any third party's intellectual property rights, whether by estoppel, implication, waiver, or otherwise. Without limiting the generality of the foregoing, you acknowledge and agree that all content available through and used to operate the Site and its services is protected by copyright, trademark, patent, or other proprietary rights. You agree not to: (a) modify, alter, or deface any of the trademarks, service marks, trade dress (collectively "Trademarks") or other intellectual property made available by us in connection with the Site; (b) hold yourself out as in any way sponsored by, affiliated with, or endorsed by us, or any of our affiliates or service providers; (c) use any of the Trademarks or other content accessible through the Site for any purpose other than the purpose for which we have made it available to you; (d) defame or disparage us, our Trademarks, or any aspect of the Site; and (e) adapt, translate, modify, decompile, disassemble, or reverse engineer the Site or any software or programs used in connection with it or its products and services.

                The framing, mirroring, scraping or data mining of the Site or any of its content in any form and by any method is expressly prohibited.

                8. INDEMNITY
                By using the Site web sites you agree to indemnify us and affiliated entities (collectively "Indemnities") and hold them harmless from any and all claims and expenses, including (without limitation) attorney's fees, arising from your use of the Site web sites, your use of the Products and Services, or your submission of ideas and/or related materials to us or from any person's use of any ID, membership or password you maintain with any portion of the Site, regardless of whether such use is authorized by you.

                9. COPYRIGHT AND TRADEMARK NOTICE
                Except our generated dummy copy, which is free to use for private and commercial use, all other text is copyrighted. generator.lorem-ipsum.info © 2013, all rights reserved

                10. INTELLECTUAL PROPERTY INFRINGEMENT CLAIMS
                It is our policy to respond expeditiously to claims of intellectual property infringement. We will promptly process and investigate notices of alleged infringement and will take appropriate actions under the Digital Millennium Copyright Act ("DMCA") and other applicable intellectual property laws. Notices of claimed infringement should be directed to:

                generator.lorem-ipsum.info

                126 Electricov St.

                Kiev, Kiev 04176

                Ukraine

                contact@lorem-ipsum.info

                11. PLACE OF PERFORMANCE
                This Site is controlled, operated and administered by us from our office in Kiev, Ukraine. We make no representation that materials at this site are appropriate or available for use at other locations outside of the Ukraine and access to them from territories where their contents are illegal is prohibited. If you access this Site from a location outside of the Ukraine, you are responsible for compliance with all local laws.

                12. GENERAL
                A. If any provision of these Terms and Conditions is held to be invalid or unenforceable, the provision shall be removed (or interpreted, if possible, in a manner as to be enforceable), and the remaining provisions shall be enforced. Headings are for reference purposes only and in no way define, limit, construe or describe the scope or extent of such section. Our failure to act with respect to a breach by you or others does not waive our right to act with respect to subsequent or similar breaches. These Terms and Conditions set forth the entire understanding and agreement between us with respect to the subject matter contained herein and supersede any other agreement, proposals and communications, written or oral, between our representatives and you with respect to the subject matter hereof, including any terms and conditions on any of customer's documents or purchase orders.

                B. No Joint Venture, No Derogation of Rights. You agree that no joint venture, partnership, employment, or agency relationship exists between you and us as a result of these Terms and Conditions or your use of the Site. Our performance of these Terms and Conditions is subject to existing laws and legal process, and nothing contained herein is in derogation of our right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by us with respect to such use.
            </p>
        </div>
        <div>
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


const WelcomePage: InferGetServerSidePropsType<typeof getServerSideProps> = ({session}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [roleSelection, setRoleSelection] = useState()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

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
                    {/*{currentPage === 3 ?*/}
                    {/*    <StepThree onContinue={() => setCurrentPage(4)} onBack={() => setCurrentPage(2)}/> : null}*/}
                    {currentPage === 3 ? <StepFour onContinue={() => {
                        mutateResult({firstName: firstName, lastName: lastName, role: roleSelection, userId: session.id})
                            .then(() => window.location.href = '/')
                            .catch((error) => console.log(error))
                    }} onBack={() => setCurrentPage(2)}/> : null}
                </div>

            </div>
        </div>
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
