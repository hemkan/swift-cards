"use server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
});

export async function POST(req) {
  try {
    const { subscriptionType } = await req.json(); // Adjust according to your request payload

    // Define pricing details based on the subscription type
    let priceData;
    switch (subscriptionType.toLowerCase()) {
      case 'basic':
        priceData = {
          name: "Basic Subscription",
          unitAmount: 500, // Amount in cents ($5.00)
        };
        break;
      case 'pro':
        priceData = {
          name: "Pro Subscription",
          unitAmount: 1000, // Amount in cents ($10.00)
        };
        break;
      case 'premium':
        priceData = {
          name: "Premium Subscription",
          unitAmount: 2000, // Amount in cents ($20.00)
        };
        break;
      default:
        return NextResponse.json({ error: 'Invalid subscription type' }, { status: 400 });
    }

    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: priceData.name,
            },
            unit_amount: priceData.unitAmount,
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`, // Redirect to the home page on cancel
    };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
