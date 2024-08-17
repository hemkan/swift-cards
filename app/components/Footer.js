import { Box, Typography } from "@mui/material";

const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
};

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: colors.primary,
        color: colors.background,
        py: 3,
        textAlign: "center"
      }}
    >
      <Typography variant="body2">
        &copy; 2024 Swift-Cards. All rights reserved.
      </Typography>
    </Box>
  );
}
