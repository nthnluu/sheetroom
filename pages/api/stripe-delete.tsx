
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const deleted = await stripe.customers.del(
        req.body.customerId
    );

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify( deleted ))
}
