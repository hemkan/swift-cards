"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CardActionArea,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import db from "../../firebase";
import { useRouter } from "next/navigation";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      console.log(isLoaded, isSignedIn, user);
      if (!isLoaded || !isSignedIn) return;
      //   user.id -> flashcardSets
    //  get the user document 
	  const docRef = doc(collection(db, "users"), user.id);
	//   get the user document snapshot
      const docSnap = await getDoc(docRef);
	//   get the data from the user document snapshot
      const data = docSnap.data();
      if (data.flashcardSets) {
        const flashcardSets = data.flashcardSets;
        console.log(flashcardSets);
        const flashcards = [];
        for (const set of flashcardSets) {
          const setDocRef = doc(collection(docRef, set.name), set.name);
          const setDocSnap = await getDoc(setDocRef);
          const setDocData = setDocSnap.data();
          console.log(setDocData);
          flashcards.push({ name: set.name, ...setDocData });
        }
        setFlashcards(flashcards);
      }
    }
    getFlashcards();
  }, [isLoaded, isSignedIn, user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  if (!isLoaded || !isSignedIn) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
