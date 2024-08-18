"use client";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import GenerateFlashcards from "./components/GenerateFlashcards";
import HomePage from "./components/HomePage";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Loading from "./components/Loading";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Simplified Color Palette
const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
};

export default function Home() {
  const [loadingType, setLoadingType] = useState(null);
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  const handleCheckout = async (subscriptionType) => {
    setLoadingType(subscriptionType);
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
      setLoadingType(null);
    }
  };

  return (
    <Box sx={{ bgcolor: colors.background, minHeight: "100vh" }}>
      <Head>
        <title>Swift-Cards</title>
        <meta name="description" content="Create flashcards from text" />
      </Head>
      <TopNav />
      {!isSignedIn && <HeroSection />} {/* Conditionally render HeroSection */}
      <Container sx={{ py: 8 }}>
        {isSignedIn ? (
          <GenerateFlashcards />
        ) : (
          <HomePage 
            handleCheckout={handleCheckout} 
            loadingType={loadingType} 
            showPricing={!isSignedIn} 
          />
        )}
      </Container>
      <Footer />
    </Box>
  );
}
