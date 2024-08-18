"use client";
import { Box, Typography, Button, Container } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useUser } from "@clerk/nextjs";
import { keyframes } from '@emotion/react';

// Color palette
const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7", // Light Background
  hoverBackground: "#d3d3d3", // Light grey color for hover effect
  imageOverlay: "rgba(0, 0, 0, 0.3)" // Semi-transparent overlay color
};

// Define animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

export default function HeroSection() {
  const { isSignedIn } = useUser();

  return (
    <Box
      sx={{
        bgcolor: colors.primary,
        color: colors.background,
        height: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        position: 'relative',
        animation: `${fadeIn} 1s ease-in`,
        backgroundImage: 'url(/Notes.jpg)', // Replace with your image path
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.imageOverlay, // Overlay color
          zIndex: 1, // Ensure overlay is above the background image
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            animation: `${fadeIn} 1s ease-in`
          }}
        >
          Swift-Cards the new way to make your flashcards.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ 
            mb: 4,
            fontWeight: 300,
            animation: `${fadeIn} ease-in 0.5s`
          }}
        >
         Created with Next.js, React, and AI Integration.
         Crafted with care, powered by innovation.
        </Typography>
        {!isSignedIn && (
          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: colors.background,
              color: colors.primary,
              textTransform: "none" ,
              fontSize: '0.9rem',
              padding: '0.47rem',
              borderRadius: '11px',
              '&:hover': {
                bgcolor: colors.hoverBackground, // Change background color on hover
                color: colors.primary, // Ensure text color remains the same
                textTransform: "none" ,
              },
              transition: 'transform 0.3s ease',
            }}
            href="/sign-up"
          >
            Get Started for free → 
          </Button>
        )}
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: 100, // Move the arrow up
          animation: `${bounce} 1.5s infinite`,
          color: colors.background,
          zIndex: 2, // Ensure the arrow is above the overlay
        }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 40 }} />
      </Box>
    </Box>
  );
}
