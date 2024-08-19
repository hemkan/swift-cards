"use client";
import {
  CardActionArea,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const CreateSet = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  if (loading) {
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
      paddingBottom={3}
      width="100%"
      sx={{
        bgcolor: "#EFEFEF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopNav />
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          mt: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          marginTop="5%"
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Playfair Display",
              fontWeight: "bold",
              color: "#046865",
              textAlign: "center",
            }}
          >
            Create a new flashcard set
          </Typography>
        </Box>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          mt={3}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                border: "2px solid #FFFFFF",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  border: "2px solid #046865",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                  bgcolor: "#FFFFFF",
                },
                transition: "border 0.3s, box-shadow 0.3s",
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  router.push("/generate");
                  setLoading(true);
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    textAlign: "center",
                  }}
                  paddingLeft={2}
                  paddingRight={2}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "400", mb: 1, fontFamily: "Poppins" }}
                  >
                    Generate flashcards with AI
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
                border: "2px solid #FFFFFF",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  border: "2px solid #046865",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                  bgcolor: "#FFFFFF",
                },
                transition: "border 0.3s, box-shadow 0.3s",
              }}
            >
              <CardActionArea
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => {
                  router.push("/generate");
                  setLoading(true);
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    textAlign: "center",
                  }}
                  paddingLeft={2}
                  paddingRight={2}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "400", mb: 1, fontFamily: "Poppins" }}
                  >
                    Create flashcards manually
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateSet;
