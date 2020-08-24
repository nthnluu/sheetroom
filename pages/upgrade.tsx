import Navbar from "../components/PageLayouts/AppLayout/Navbar";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";
import {
    CardElement,
    CardExpiryElement,
    CardNumberElement,
    Elements,
    PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#262626',
            color: '#1d1d1d',
            fontWeight: 500,
            fontFamily: 'Inter, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {color: '#fce883'},
            '::placeholder': {color: '#262626'},
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
        },
    },
};

const Upgrade = ({session}) => {
    return (
        <div className="min-h-screen">
            <Navbar session={session}/>
            <div className="px-8 pt-24">
                <h1 className="text-4xl font-bold">Sheetroom Pro</h1>
                <Elements stripe={stripePromise}>
                    <div className="w-96 space-y-2">
                        <div className="form-input p-4">
                            {/*//@ts-ignore*/}
                            <CardElement options={CARD_OPTIONS}/>

                        </div>

                    </div>


                </Elements>

            </div>


        </div>)
}

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});

    if (!session) {
        res.writeHead(302, {location: '/'})
        res.end()
    }

    return {
        props: {
            session,
        },
    };
};


export default Upgrade
