import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { auth, provider } from "../firebase";
const Login = () => {
  const signin = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err));
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        padding="60px"
        backgroundColor="white"
        borderRadius="5px"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <Logo
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="whatsapp logo"
        />
        <Button
          onClick={signin}
          sx={{
            border: "1px solid #1d9b12",
            color: "#1d9b12",
            px: "18px",
            "&:hover": {
              backgroundColor: "#1d9b12",
              color: "white",
            },
          }}
        >
          sign in with google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin-bottom: 40px;
`;
