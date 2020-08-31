
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer: req.body.customerId,
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_1HM4Z9I8UDkQvU4dWNIuNigj',
            quantity: 1,
        }],
        mode: 'subscription',
        allow_promotion_codes: true,
        success_url: 'http://localhost:3000/sheetroom-pro-confirmation',
        cancel_url: 'http://localhost:3000/pricing',
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify( session.id ))
}
