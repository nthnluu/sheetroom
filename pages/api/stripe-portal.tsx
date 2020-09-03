
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const session = await stripe.billingPortal.sessions.create({
        customer: req.body.customerId,
        return_url: `https://www.sheetroom.com/settings`,
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify( session ))
}
