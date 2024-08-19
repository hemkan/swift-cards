import React from "react";
import GenerateFlashcards from "../components/GenerateFlashcards";
import TopNav from "../components/TopNav";
import { Box } from "@mui/material";

export default function Generate() {
  return (
    <Box
      paddingBottom={3}
      width="100%"
      sx={{
        bgcolor: "#EFEFEF",
        minHeight: "100vh",
      }}
    >
      <TopNav />
      <GenerateFlashcards
        sx={{
          mt: 2,
        }}
      />
    </Box>
  );
}
