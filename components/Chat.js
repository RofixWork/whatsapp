import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth);
  const recipient = getRecipientEmail(users, user);
  //   router
  const router = useRouter();
  //   colors
  const colors = ["red", "crimson", "black", "blue", "purple", "navy", "brown"];
  return (
    <Box
      onClick={() => router.push(`/chat/${id}`)}
      sx={{
        px: "5px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        py: "12px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
      }}
    >
      <Avatar
        sx={{
          width: 34,
          height: 34,
          bgcolor: `${colors[Math.floor(Math.random() * colors.length)]}`,
        }}
      >
        {recipient[0].toUpperCase()}
      </Avatar>
      <Typography variant="subtitle2">{recipient}</Typography>
    </Box>
  );
};

export default Chat;
