"use client";
import {
  CardActionArea,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const CreateSet = () => {
  const router = useRouter();

  return (
    <div>
      <Typography variant="h4">Create a new flashcard set</Typography>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardActionArea onClick={router.push("/generate")}>
            <CardContent>
              <Typography variant="h5">Generate flashcards with AI</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardActionArea onClick={router.push("/generate")}>
            <CardContent>
              <Typography variant="h5">Create flashcards manually</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {/* <button>Generate flashcards with AI</button> */}
      {/* <button>Create flashcards manually</button> */}
    </div>
  );
};

export default CreateSet;
