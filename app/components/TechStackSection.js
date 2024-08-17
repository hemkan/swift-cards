import { Box, Typography, Grid, Container } from "@mui/material";
import NextIcon from '@mui/icons-material/NextWeek';
import TypeScriptIcon from '@mui/icons-material/Code';
import ReactIcon from '@mui/icons-material/Share';
import MuiIcon from '@mui/icons-material/Web';
import OpenAIIcon from '@mui/icons-material/EmojiObjects';
import ClerkIcon from '@mui/icons-material/AccountCircle';

const colors = {
  primary: "#046865", // Dark Accent
  background: "#FCFFF7" // Light Background
};

const techStack = [
  { icon: <NextIcon sx={{ fontSize: 60, color: colors.background }} />, label: "Next.js" },
  { icon: <TypeScriptIcon sx={{ fontSize: 60, color: colors.background }} />, label: "TypeScript" },
  { icon: <ReactIcon sx={{ fontSize: 60, color: colors.background }} />, label: "React" },
  { icon: <MuiIcon sx={{ fontSize: 60, color: colors.background }} />, label: "Material-UI" },
  { icon: <OpenAIIcon sx={{ fontSize: 60, color: colors.background }} />, label: "OpenAI GPT" },
  { icon: <ClerkIcon sx={{ fontSize: 60, color: colors.background }} />, label: "Clerk" }
];

export default function TechStackSection() {
  return (
    <Box
      sx={{
        bgcolor: colors.primary,
        color: colors.background,
        py: 6,
        textAlign: "center"
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Our Tech Stack
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {techStack.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                {tech.icon}
                <Typography variant="h6">{tech.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
