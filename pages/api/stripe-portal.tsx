
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const session = await stripe.billingPortal.sessions.create({
        customer: 'cus_Hw8ia4HaF9qXln',
        return_url: 'http://localhost:3000/settings',
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify( session ))
}
