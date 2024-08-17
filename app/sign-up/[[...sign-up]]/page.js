"use client";
import { Box, Button, Typography, Container } from "@mui/material";
import { useRouter } from 'next/navigation';
import { SignUp } from "@clerk/nextjs";
import TopNav from "../../components/TopNav";

// Color palette
const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
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
          <Typography variant="h4" gutterBottom>
            Create Your Account
          </Typography>
          <SignUp />
          <Button
            variant="outlined"
            sx={{
              mt: 4,
              bgcolor: colors.primary,
              color: colors.background,
              '&:hover': {
                bgcolor: '#d3d3d3', // Light grey color for hover effect
                color: colors.primary
              }
            }}
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
