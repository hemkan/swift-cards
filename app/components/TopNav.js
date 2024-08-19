"use client";
import { Typography, Toolbar, Button, AppBar, Box } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

// Color palette
const colors = {
  primary: "#046865", // Dark Accent
  text: "#FCFFF7", // Light Text Color
  highlight: "#FFE900", // Highlight color for the button
  bg: "#003333", // Background color for the AppBar
};

// Define animation variants
const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export default function TopNav() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: colors.bg,
          top: 0,
          left: 0,
          right: 0,
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: `0.5px solid ${colors.text}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {" "}
          {/* Distribute content evenly */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.35 }}
          >
            <Typography variant="h6" sx={{ color: colors.text }}>
              Swift-Cards
            </Typography>
          </motion.div>
          <Box sx={{ display: "flex", gap: 2 }}>
            {" "}
            {/* Add gap between buttons */}
            <SignedOut>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                <Button
                  color="inherit"
                  sx={{
                    color: colors.text,
                    textTransform: "none",
                    fontSize: "12px",
                  }}
                  href="/sign-in"
                >
                  Log In
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: colors.highlight,
                    color: colors.primary,
                    textTransform: "none",
                    fontSize: "12px",
                    borderRadius: "5px",
                    px: 1,
                    py: 1,
                    "&:hover": {
                      backgroundColor: "#FFD700",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                  }}
                  href="/sign-up"
                >
                  Sign Up
                </Button>
              </motion.div>
            </SignedOut>
            <SignedIn>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.35, delay: 0.4 }}
              >
                <UserButton userProfileUrl="/user-profile" />
              </motion.div>
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
