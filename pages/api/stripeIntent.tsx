
const stripe = require('stripe')('sk_test_51HM11eI8UDkQvU4dS47B59ghPjMDGiG1mOwbfXb47ivrpGCXXn2UZMsftDkvSEmvJCgzCTuvfFVagoOID6oFuDVS00W5Hrad8J');


export default async (req, res) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }))
}
