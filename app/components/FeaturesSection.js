import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

const featureItems = [
  {
    title: "Easy to Use",
    description: "Swift-Cards offers a user-friendly interface to quickly create and manage your flashcards.",
  },
  {
    title: "Customizable",
    description: "Personalize your flashcards with different themes, fonts, and colors.",
  },
  {
    title: "Integration",
    description: "Seamlessly integrate with your favorite tools and platforms for a smooth experience.",
  },
  {
    title: "Analytics",
    description: "Track your progress and get insights into your flashcard usage with built-in analytics.",
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Features
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {featureItems.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }} // Flex container
            >
              <Box
                sx={{
                  p: 3, // Increased padding for better spacing
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2,
                  textAlign: "center",
                  bgcolor: "#fff",
                  boxShadow: 2,
                  transition: 'box-shadow 0.3s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between', // Space out items to ensure equal height
                  height: '100%', // Full height
                  minHeight: '200px' // Minimum height to ensure uniformity
                }}
              >
                <div>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </div>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
