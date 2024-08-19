// HomePage.js
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import FeaturesSection from "./FeaturesSection";
import PricingCard from "./PricingCard"; // Import the PricingCard component

const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7", // Light Background
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
      transition={{ duration: 1 }}
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
                type="Basic"
                price="$5 / month"
                description="Access to basic flashcard features and limited storage."
                features={[
                  "50 flashcards per month",
                  "Basic storage (1GB)",
                  "Email support",
                ]}
                handleCheckout={handleCheckout}
                loadingType={loadingType}
              />
              <PricingCard
                type="Pro"
                price="$10 / month"
                description="Unlimited flashcards and storage with priority support."
                features={[
                  "Unlimited flashcards",
                  "Advanced storage (10GB)",
                  "Priority email support",
                  "Custom flashcard themes",
                ]}
                handleCheckout={handleCheckout}
                loadingType={loadingType}
              />
              <PricingCard
                type="Premium"
                price="$20 / month"
                description="All Pro features plus team collaboration and advanced analytics."
                features={[
                  "Unlimited flashcards",
                  "Premium storage (50GB)",
                  "24/7 priority support",
                  "Team collaboration",
                  "Advanced analytics and insights",
                  "Custom integrations",
                ]}
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
