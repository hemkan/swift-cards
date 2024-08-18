"use client";
import { Box, Button, Typography, Container } from "@mui/material";
import { useRouter } from 'next/navigation';
import { SignUp } from "@clerk/nextjs";
import TopNav from "../../components/TopNav";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Color palette
const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7", // Light Background
};

export default function SignUpPage() {
  const router = useRouter();

  return (
    <Box>
      <TopNav />
      <Container sx={{ py: 8 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={"5%"}
          marginBottom={"5%"}
        >
          <Box display="flex" alignItems="center" sx={{marginBottom:"10px"}}>
            <Button
              variant="outlined"
              sx={{
                bgcolor: colors.primary,
                color: colors.background,
                '&:hover': {
                  bgcolor: '#d3d3d3', // Light grey color for hover effect
                  color: colors.primary
                },
                mr: 2, // Margin right to space out from title
                borderRadius: 50, // Optional: round button corners
                minWidth: 40, // Optional: ensure button is large enough
                height: 40, // Optional: ensure button is large enough
              }}
              onClick={() => router.push('/')}
            >
              <ArrowBackIcon />
            </Button>
            <Typography variant="h4" sx={{marginBottom:0}} gutterBottom>
              Sign Up for an Account
            </Typography>
          </Box>
          <SignUp />
        </Box>
      </Container>
    </Box>
  );
}
