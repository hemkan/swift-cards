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
  IconButton,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { useSearchParams } from "next/navigation";
import ReactCardFlip from "react-card-flip";
import TopNav from "../components/TopNav";
import { ThreeDots } from "react-loader-spinner";

export default function Set() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenLoading, setIsScreenLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      try {
        const docRef = doc(
          collection(doc(collection(db, "users"), user.id), "flashcardSets"),
          search
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.flashcards) {
            setFlashcards(data.flashcards);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error getting flashcards:", error);
        setError(true);
      } finally {
        setIsScreenLoading(false);
        setIsLoading(false);
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

  if (!isLoaded || isScreenLoading) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundImage: "linear-gradient(#EFEFEF, #FCFFF7)" }}
      >
        <ThreeDots
          visible={true}
          height="100"
          width="100"
          color="#000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </Box>
    );
  }

  return (
    <Box
      paddingBottom={4}
      width="100%"
      sx={{
        bgcolor: "#EFEFEF",
        minHeight: "100vh",
      }}
      display="flex"
      flexDirection="column"
    >
      <TopNav />
      {error ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <Typography variant="h4">No flashcards found</Typography>
        </Box>
      ) : (
        <Container maxWidth="md" mt={2}>
          <Box
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
            marginTop="5%"
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#046865",
              }}
            >
              {search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()}
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
              >
                <ThreeDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#000"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </Box>
            ) : flashcards.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexGrow={1}
              >
                <Typography variant="h4">No flashcards found</Typography>
              </Box>
            ) : (
              flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ReactCardFlip
                    isFlipped={flipped[index]}
                    flipDirection="horizontal"
                  >
                    <Card
                      sx={{
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                      onClick={() => handleCardClick(index)}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "16px",
                        }}
                      >
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {flashcard.front}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card
                      sx={{
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                      onClick={() => handleCardClick(index)}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "16px",
                        }}
                      >
                        <Typography variant="body1">
                          {flashcard.back}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ReactCardFlip>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      )}
    </Box>
  );
}
