"use client";
import { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import GenerateFlashcards from "./components/GenerateFlashcards";
import HomePage from "./components/HomePage";
import TopNav from "./components/TopNav";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [loadingType, setLoadingType] = useState(null); // Track the type of subscription that's loading
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  }

  const handleCheckout = async (subscriptionType) => {
    setLoadingType(subscriptionType); // Set the loading type
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionType }),
      });

      const { id } = await response.json();
      const stripe = await stripePromise;

      await stripe.redirectToCheckout({ sessionId: id });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    } finally {
      setLoadingType(null); // Reset the loading type
    }
  };

  return (
    <Box>
      <Head>
        <title>Swift-Cards</title>
        <meta name="description" content="Create flashcards from text" />
      </Head>
      <TopNav />
      {isSignedIn ? <GenerateFlashcards /> : <HomePage />}

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleCheckout('basic')} // Pass 'basic' subscription type
                disabled={loadingType === 'basic'} // Disable button if it's loading
              >
                {loadingType === 'basic' ? 'Processing...' : 'Choose Basic'}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleCheckout('pro')} // Pass 'pro' subscription type
                disabled={loadingType === 'pro'} // Disable button if it's loading
              >
                {loadingType === 'pro' ? 'Processing...' : 'Choose Pro'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
