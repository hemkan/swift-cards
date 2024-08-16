"use client";
import { useState } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
  Button,
} from "@mui/material";
import getStripe from "@/utils/getStripe";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Head from "next/head";
import GenerateFlashcards from "./components/GenerateFlashcards";
import { useUser } from "@clerk/nextjs";
import TopNav from "./components/TopNav";
import HomePage from "./components/HomePage";

export default function Home() {
  const [generation, setGeneration] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <Box>
      <Head>
        <title>Swift-Cards</title>
        <meta name="description" content="Create flashcards from text" />
      </Head>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Swift-Cards</Typography>
          <SignedOut>
            <Button>Log in</Button>
            <Button>Sign up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar> */}
      <TopNav />
      {/* display the generateflashcard compoenent if signed in otherwise display homepage */}
      {isSignedIn ? <GenerateFlashcards /> : <HomePage />}
    </Box>
  );
}
