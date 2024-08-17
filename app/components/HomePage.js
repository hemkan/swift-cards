"use client";
import { Box, Typography, Button, Grid, Container, CircularProgress } from "@mui/material";
import FeaturesSection from "./FeaturesSection";
import { motion } from "framer-motion";

const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
};

// Define animation variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function HomePage({ handleCheckout, loadingType, showPricing }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1 }} // Duration for the fade-in effect
    >
      <Box sx={{ my: 4, textAlign: "center" }}>
        {showPricing && (
          <>
            <FeaturesSection />
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
              Pricing
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <PricingCard 
                type="basic"
                price="$5 / month"
                description="Access to basic flashcard features and limited storage."
                handleCheckout={handleCheckout}
                loadingType={loadingType}
              />
              <PricingCard 
                type="pro"
                price="$10 / month"
                description="Unlimited flashcards and storage with priority support."
                handleCheckout={handleCheckout}
                loadingType={loadingType}
              />
            </Grid>
          </>
        )}
      </Box>
    </motion.div>
  );
}

function PricingCard({ type, price, description, handleCheckout, loadingType }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: colors.background,
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: 6
            }
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            {price}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, px: 2, position: 'relative' }}
            onClick={() => handleCheckout(type)}
            disabled={loadingType === type}
          >
            {loadingType === type ? (
              <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            ) : (
              `Choose ${type.charAt(0).toUpperCase() + type.slice(1)}`
            )}
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
}
