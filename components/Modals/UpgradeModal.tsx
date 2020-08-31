import SimpleModal from "./SimpleModal";
import React, {useState} from "react";
import {useMutation} from "urql";
import {deleteAssignment} from "../../lib/graphql/Assignments";
import CircularProgress from "@material-ui/core/CircularProgress";
import {changeAccountType, me} from "../../lib/graphql/User";
import {Elements, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

interface Props {
    changeTo: string;
    onCancel: any;
    isOpen: boolean;
    userId: number;
}

const UpgradeModal: React.FC<Props> = ({changeTo, userId, onCancel, isOpen}) => {

    const [updateMutationResult, updateMutation] = useMutation(changeAccountType)
    const [isLoading, toggleLoading] = useState(false)
    const [error, setError] = useState("")

    const stripe = useStripe();
    const elements = useElements();

    function cancelModal() {
        setError("")
        toggleLoading(false)
        onCancel();
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const clientSecret = await fetch('/api/stripeIntent', {
            method: 'GET',
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

        const result = await stripe.confirmCardPayment(clientSecret.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            setError(result.error.message)
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };


    return (<SimpleModal buttons={<div className="pt-2 sm:flex sm:flex-row-reverse sm:justify-between">
        <button type="submit" disabled={!stripe}
                className="inline-flex items-center mt-4 justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            {!stripe ? <CircularProgress color="inherit" size={15} className="mr-2 h-auto"/> : null}Confirm subscription
        </button>
        <button type="button" onClick={() => onCancel()}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Cancel
        </button>
        {/*@ts-ignore*/}
    </div>} isOpen={isOpen} onCancel={cancelModal} title="Upgrade to Sheetroom Pro" content={<form onSubmit={handleSubmit}>
        {error ? <p className="px-2 py-1 rounded-md border border-red-500 text-red-500 mb-1"><i
            className="fas fa-exclamation-circle mr-2"/>{error}</p> : null}
        <div className="rounded-md border border-gray-300 shadow-sm p-3">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '18px',
                            fontFamily: 'Inter, Open Sans, Segoe UI, sans-serif',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

        </div>



    </form>}
    />)
}

export default UpgradeModal
