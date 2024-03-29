const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) => {

    const session = await stripe.checkout.sessions.create({
        customer: req.body.customerId,
        payment_method_types: ['card'],
        line_items: [{
            price: 'price_1HNmUfI8UDkQvU4dQg0zKe2x',
            quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'https://sheetroom.com/',
        cancel_url: 'https://sheetroom.com/pricing',
    });

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(session.id))
}
