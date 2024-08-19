"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { doc, getDoc, writeBatch, collection } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import db from "../../firebase";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function GenerateFlashcards() {
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFlashcards, setSelectedFlashcards] = useState(new Set());
  const { user, isLoaded, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [textError, setTextError] = useState(false);
  const [saveTextError, setSaveTextError] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleCardClick = (flashcard) => {
    setSelectedFlashcards((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(flashcard)) {
        newSelected.delete(flashcard);
      } else {
        newSelected.add(flashcard);
      }
      return newSelected;
    });
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      setSaveTextError(true);
      return;
    }
    setSaveTextError(false);
    setIsScreenLoading(true);
    if (!isLoaded || !isSignedIn) {
      alert("User not signed in or not fully loaded.");
      return;
    }

    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards: Array.from(selectedFlashcards) });

      await batch.commit();

      console.log("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
      setSelectedFlashcards(new Set());
    } catch (error) {
      setAlert("An error occurred while saving flashcards. Please try again.");
      handleCloseDialog();
      window.scrollTo(0, 0);
    } finally {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setTextError(true);
      return;
    }
    setIsLoading(true);
    setTextError(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();

      const updatedFlashcards = [...flashcards, ...data];
      setFlashcards(updatedFlashcards);

      setSelectedFlashcards((prevSelected) => {
        const newSelected = new Set();
        updatedFlashcards.forEach((fc) => {
          if (prevSelected.has(fc)) {
            newSelected.add(fc);
          }
        });
        return newSelected;
      });
    } catch (error) {
      console.error("Error generating flashcards:", error);
      setAlert(
        "An error occurred while generating flashcards. Please try again."
      );
      window.scrollTo(0, 0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alert === "") {
      setAlertVisible(false);
    } else {
      setAlertVisible(true);
    }
  }, [alert]);

  if (isScreenLoading) {
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
    <Container
      maxWidth="md"
      sx={{
        bgcolor: "#EFEFEF",
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins",
            fontWeight: "bold",
            color: "#046865",
          }}
        >
          Generate Flashcards
        </Typography>
        {isAlertVisible && (
          <Alert
            severity="error"
            onClose={() => {
              setAlertVisible(false);
              setAlert("");
            }}
            sx={{
              mt: 1,
            }}
          >
            {alert}
          </Alert>
        )}
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter topic or text to generate flashcards"
          fullWidth
          rows={4}
          variant="outlined"
          error={textError}
          helperText={
            textError ? "Please enter some text to generate flashcards." : ""
          }
          sx={{ mb: 2, mt: 3 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#046865",
            color: "#FFFFFF",
            fontFamily: "Poppins",
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#035a53",
            },
            "&:disabled": {
              backgroundColor: "#A9A9A9",
            },
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
          fullWidth
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Generate Flashcards
        </Button>
      </Box>

      {isLoading ? (
        <Box spacing={3} sx={{ mt: 1 }} display="flex" justifyContent="center">
          <Box
            marginTop="5%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
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
        </Box>
      ) : (
        <>
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  color: "#046865",
                  textAlign: "center",
                  marginBottom: "5px",
                }}
              >
                Generated Flashcards
              </Typography>
              <Typography
                variant="
				body1"
                sx={{
                  color: "text.secondary",
                  textAlign: "center",
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Select which flashcards you want to add:
              </Typography>
              <Grid container spacing={2} mt={2}>
                {flashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
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
                        border: selectedFlashcards.has(flashcard)
                          ? "2px solid #046865"
                          : "2px solid transparent",
                      }}
                      onClick={() => handleCardClick(flashcard)}
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
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {flashcard.front}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                        >
                          {flashcard.back}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {selectedFlashcards.size > 0 && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button
                sx={{
                  backgroundColor: "#046865",
                  color: "#FFFFFF",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#035a53",
                  },
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                onClick={handleOpenDialog}
                disabled={isScreenLoading}
              >
                Save Flashcards
              </Button>
            </Box>
          )}
        </>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Flashcard Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => {
              setSetName(e.target.value);
            }}
            error={saveTextError}
            helperText={
              saveTextError ? "Please enter a name for the flashcard set." : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              saveFlashcards();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
