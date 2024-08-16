// generate flashcards

import { useState, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import Head from "next/head";

export default function GenerateFlashcards() {
  const [generation, setGeneration] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const promptRef = useRef();

  return (
    <div>
      <TextField inputRef={promptRef} />
      <Button
        onClick={async () => {
          setIsLoading(true);

          await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({
              //   prompt = textfield value
              prompt: promptRef.current.value,
            }),
          }).then(async (response) => {
            response.json().then((json) => {
              setGeneration(json);
              setIsLoading(false);
            });
          });
        }}
      >
        Generate
      </Button>

      {isLoading ? (
        "Loading..."
      ) : (
        <Box>
          {generation?.map((card, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {card.front}
                </Typography>
                <Typography variant="body2" component="p">
                  {card.back}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}
