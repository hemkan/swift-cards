// pages/api/webhooks/stripe.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    // Verify the event with Stripe's library
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful checkout session
        console.log('Checkout Session completed:', session);
        // You can also update your database or perform other actions here
        break;
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        // Handle successful invoice payment
        console.log('Invoice payment succeeded:', invoice);
        // Update your database or perform actions here
        break;
      // Add more cases for other event types you need to handle
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}
