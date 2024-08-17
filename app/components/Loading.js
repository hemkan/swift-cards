// components/Loading.js
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Loading() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={loadingVariants}
      transition={{ duration: 1 }} // Duration for the fade-in effect
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Box textAlign="center">
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </motion.div>
  );
}
