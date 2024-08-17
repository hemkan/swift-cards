// home page for swift cards app
import {
  Typography,
  Container,
  Toolbar,
  Button,
  AppBar,
  Box,
} from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" flexGrow={1}>
          Swift-Cards
        </Typography>
        <SignedOut>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          {/* sign up */}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}
