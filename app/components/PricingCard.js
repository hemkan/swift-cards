// PricingCard.js
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from "framer-motion";

const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
};

export default function PricingCard({ type, price, description, features, handleCheckout, loadingType }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Box
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: colors.background,
            transition: 'box-shadow 0.3s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <div>
            <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              {price}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {description}
            </Typography>
            <Box sx={{ mb: 2, pl: 2 }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {features && features.map((feature, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <CheckCircleIcon sx={{ color: colors.primary, marginRight: 1 }} />
                    <Typography>
                      {feature}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 1, px: 2, position: 'relative' }}
            onClick={() => handleCheckout(type)}
            disabled={loadingType === type}
          >
            {loadingType === type ? (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'primary.main'
                }}
              >
                <CircularProgress size={24} sx={{ color: 'background.paper' }} />
              </Box>
            ) : (
              `Subscribe`
            )}
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
}
