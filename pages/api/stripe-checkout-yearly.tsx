
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer: req.body.customerId,
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_1HNLdrI8UDkQvU4dlFWMGcMg',
            quantity: 1,
        }],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: `${process.env.SITE}/sheetroom-pro-confirmation`,
        cancel_url: `${process.env.SITE}/settings`,
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify( session.id ))
}
