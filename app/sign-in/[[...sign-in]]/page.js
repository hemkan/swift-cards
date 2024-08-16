import TopNav from "../../components/TopNav";
import { SignIn } from "@clerk/nextjs";
import { Box } from "@mui/material";

export default function SignInPage() {
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
        <SignIn />
      </Box>
    </Box>
  );
}
