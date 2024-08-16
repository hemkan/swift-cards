import { Box } from "@mui/material";
import TopNav from "../../components/TopNav";
import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <Box>
      <TopNav />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={"5%"}
        marginBottom={"5%"}
      >
        <SignUp />
      </Box>
    </Box>
  );
}
