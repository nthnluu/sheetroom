import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import Footer from "../components/Misc/Footer";

const Terms = () => {
    return <>
        <Navbar logoOnly unfixed/>
        {/* This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 */}
        <div className="relative py-16 bg-white overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
                <div className="relative h-full text-lg max-w-prose mx-auto">
                    <svg className="absolute top-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
                    </svg>
                    <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
                    </svg>
                    <svg className="absolute bottom-12 left-full transform translate-x-32" width={404} height={384} fill="none" viewBox="0 0 404 384">
                        <defs>
                            <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
                    </svg>
                </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto mb-6">
                    <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">Refund Policy</h1>
                    <p className="text-xl text-gray-500 leading-8">
                        Bad refund policies are infuriating. You feel like the company is just trying to rip you off. We never want our customers to feel that way, so our refund policy is simple: If you’re ever unhappy with our products* for any reason, just contact our support team (<a href="mailto:support@sheetroom.com">support@sheetroom.com</a>)and we'll take care of you.
                       </p>
                </div>
               <div className="prose prose-lg text-gray-500 mx-auto">
                   <h2 id="examples-of-full-refunds-we-d-grant-">Examples of full refunds we’d grant.</h2>
                   <ul>
                       <li>If you were just charged for your next month of service but you meant to cancel, we’re happy to refund that extra charge.</li>
                       <li>If you forgot to cancel your account a couple months ago and you haven’t used it since then, we’ll give you a full refund for a few back months. No problem.</li>
                       <li>If you tried one of our products for a couple months and you just weren’t happy with it, you can have your money back.</li>
                   </ul>
                   <h2 id="examples-of-partial-refunds-or-credits-we-d-grant-">Examples of partial refunds or credits we’d grant.</h2>
                   <ul>
                       <li>If you forgot to cancel your account a year ago, and there’s been activity on your account since then, we’ll review your account usage and figure out a partial refund based on how many months you used it.</li>
                       <li>If you upgraded your account a few months ago to a higher plan and kept using it in general but you didn’t end up using the extra features, projects, or storage space, we’d consider applying a prorated credit towards future months.</li>
                       <li>If we had extended downtime (multiple hours in a day, or multiple days in a month) or you emailed customer service and it took multiple days to get back to you, we’d issue a partial credit to your account.</li>
                   </ul>
                   <h2 id="get-in-touch">Get in touch</h2>
                   <p>At the end of the day, nearly everything on the edges comes down to a case-by-case basis. <a href="{{ site.email_support }}">Send us a note</a>, tell us what&#39;s up, and we&#39;ll work with you to make sure you’re happy.</p>
                   <p><em>*This policy applies to any product created and owned by Sheetroom, LLC. </em></p>

               </div>

            </div>
        </div>
        <Footer/>
    </>
}

export default Terms
