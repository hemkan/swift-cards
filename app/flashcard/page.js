"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
  Button,
  Grid,
  CardActionArea,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { useSearchParams } from "next/navigation";
import ReactCardFlip from "react-card-flip";

export default function Set() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.flashcardSets) {
          const flashcardSets = data.flashcardSets;

          for (const set of flashcardSets) {
            if (set.name === search) {
              const setDocRef = doc(
                collection(docRef, "flashcardSets"),
                set.name
              );
              const setDocSnap = await getDoc(setDocRef);
              if (setDocSnap.exists()) {
                const setDocData = setDocSnap.data();

                if (setDocData && setDocData.flashcards) {
                  setFlashcards(setDocData.flashcards);
                }
              }
            }
          }
        }
      }
    }

    getFlashcard();
  }, [search, user]);
  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ReactCardFlip
              isFlipped={flipped[index]}
              flipDirection="horizontal"
            >
              <Card onClick={() => handleCardClick(index)}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 150,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      width: "100%",
                      fontSize: "clamp(1rem, 3vw, 1.5rem)",
                      textAlign: "center",
                    }}
                  >
                    {flashcard.front}
                  </Typography>
                </CardContent>
              </Card>
              <Card onClick={() => handleCardClick(index)}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 150,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      width: "100%",
                      fontSize: "clamp(1rem, 3vw, 1.5rem)",
                      textAlign: "center",
                    }}
                  >
                    {flashcard.back}
                  </Typography>
                </CardContent>
              </Card>
            </ReactCardFlip>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
