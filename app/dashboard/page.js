"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CardActionArea,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  TextField,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc, collection, deleteDoc } from "firebase/firestore";
import db from "../../firebase";
import { useRouter } from "next/navigation";
import TopNav from "../components/TopNav";
import { ThreeDots } from "react-loader-spinner";
import { FiPlus } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { debounce, set } from "lodash";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);
  const [isTextFieldVisible, setTextFieldVisible] = useState(false);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const textFieldRef = React.useRef(null);

  const handleOpenUserMenu = (event, flashcard) => {
    event.stopPropagation();
    setAnchorElUser(event.currentTarget);
    setSelectedFlashcard(flashcard);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setSelectedFlashcard(null);
  };

  const handleClickOutside = (event) => {
    if (textFieldRef.current && !textFieldRef.current.contains(event.target)) {
      setTextFieldVisible(false);
    }
  };

  useEffect(() => {
    if (isTextFieldVisible) {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTextFieldVisible]);

  const getFlashcards = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const docRef = doc(collection(db, "users"), user.id);
      //   get the user document snapshot
      const docSnap = await getDoc(docRef);
      //   get the data from the user document snapshot
      const data = docSnap.data();
      if (data.flashcardSets) {
        const flashcardSets = data.flashcardSets;
        const flashcards = [];
        for (const set of flashcardSets) {
          const setDocRef = doc(collection(docRef, "flashcardSets"), set.name);
          const setDocSnap = await getDoc(setDocRef);
          const setDocData = setDocSnap.data();
          // flashcards.push({ name: set.name, ...setDocData });
          const numberOfFlashcards = setDocData?.flashcards?.length || 0;

          flashcards.push({
            name: set.name,
            numberOfFlashcards,
            ...setDocData,
          });
        }
        setFlashcards(flashcards);
        setFilteredFlashcards(flashcards);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFlashcards();
  }, [isLoaded, isSignedIn, user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  const searchFlashcards = debounce((item) => {
    item = item.trim().toLowerCase();
    const flashcardList = flashcards.filter((flashcard) =>
      flashcard.name.toLowerCase().includes(item)
    );
    setFilteredFlashcards(flashcardList);
  }, 300);

  const deleteSet = async () => {
    if (!selectedFlashcard) return;
    const { name } = selectedFlashcard;
    console.log(name);
    const docRef = doc(collection(db, "users"), user.id);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      const data = userDoc.data().flashcardSets || [];
      const newData = data.filter((set) => set.name !== name);
      console.log(newData);
      await setDoc(docRef, { flashcardSets: newData }, { merge: true });
    } else {
      await setDoc(docRef, { flashcardSets: [] }, { merge: true });
    }

    const setDocRef = doc(collection(docRef, "flashcardSets"), name);
    await deleteDoc(setDocRef);
    handleCloseUserMenu();

    await getFlashcards();
  };

  if (!isLoaded || !isSignedIn) {
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
      }}
    >
      <TopNav />
      <Container maxWidth="md">
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
            Your Sets
          </Typography>
          <Box display="flex" flexDirection="row">
            <Box
              borderRadius={50}
              border="1px solid white"
              color="grey"
              mr={"1rem"}
              bgcolor={"white"}
              boxShadow={"0px 0px 1px grey"}
              sx={{
                "&:hover": {
                  backgroundColor: "#FFE900",
                  border: "1px solid #FFE900",
                  color: "transparent",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <IconButton
                onClick={() => {
                  router.push("/create-flashcard");
                }}
                bgcolor={"#FFE900"}
                sx={{
                  color: "grey",
                  "&:hover": {
                    backgroundColor: "#FFE900",
                    color: "grey",
                  },
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <FiPlus />
              </IconButton>
            </Box>
            <Box
              borderRadius={50}
              border="1px solid white"
              color="grey"
              bgcolor={"white"}
              boxShadow={"0px 0px 1px grey"}
              sx={{
                "&:hover": {
                  backgroundColor: "#E53D00",
                  border: "1px solid #E53D00",
                  color: "transparent",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <IconButton
                onClick={() => {
                  if (isTextFieldVisible) {
                    setTextFieldVisible(false);
                  } else {
                    setTextFieldVisible(true);
                  }
                }}
                bgcolor={"#E53D00"}
                sx={{
                  color: "grey",
                  "&:hover": {
                    backgroundColor: "#E53D00",
                    color: "white",
                  },
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <IoSearchOutline />
              </IconButton>
            </Box>
            <Box
              sx={{
                overflow: "hidden",
                transition: "width 0.3s ease, opacity 0.3s ease",
                width: isTextFieldVisible ? "200px" : "0px",
                opacity: isTextFieldVisible ? 1 : 0,
              }}
            >
              <TextField
                inputRef={textFieldRef}
                onChange={(e) => searchFlashcards(e.target.value)}
                variant="standard"
                sx={{
                  marginLeft: "1rem",
                  visibility: isTextFieldVisible ? "visible" : "hidden",
                }}
                autoFocus
                placeholder="Search Flashcards"
              />
            </Box>
          </Box>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{ mt: 1 }}
          display="flex"
          justifyContent="center"
        >
          {isLoading ? (
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
          ) : filteredFlashcards.length === 0 ? (
            <Typography variant="h6" marginTop="5%">
              No sets found
            </Typography>
          ) : (
            filteredFlashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "0px 0px 1px grey",
                    border: "2px solid white",
                    "&:hover": {
                      border: "2px solid #046865",
                      boxShadow: "0px 0px 5px grey",
                      bgcolor: "white",
                    },
                    transition: "border 0.3s",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardActionArea
                      onClick={() => handleCardClick(flashcard.name)}
                    >
                      <Box>
                        <Typography variant="h5" component="div">
                          {flashcard.name.charAt(0).toUpperCase() +
                            flashcard.name.slice(1).toLowerCase()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {flashcard.numberOfFlashcards} Flashcards
                        </Typography>
                      </Box>
                    </CardActionArea>
                    <Box display={"flex"} alignItems={"center"}>
                      <Tooltip title="Options">
                        <div>
                          <IconButton
                            onClick={(event) =>
                              handleOpenUserMenu(event, flashcard)
                            }
                            sx={{ p: 1 }}
                          >
                            <IoIosMore />
                          </IconButton>
                        </div>
                      </Tooltip>
                      <Menu
                        sx={{
                          mt: "45px",

                          "& .MuiPaper-root": {
                            boxShadow: "0px 0px 1px grey !important",
                          },
                        }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={deleteSet}>
                          <Typography textAlign="center">Delete</Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
