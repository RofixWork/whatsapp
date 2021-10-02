import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { auth } from "../firebase";
import { FiMessageSquare, FiMoreVertical } from "react-icons/fi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import * as EmailValidator from "email-validator";
import Chat from "./Chat";
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [chatsSnapshot] = useCollection(
    db.collection("chats").where("users", "array-contains", user?.email)
  );
  const createNewChat = () => {
    const input = prompt("Please enter email your want to chat...");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user?.email
    ) {
      db.collection("chats").add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat?.data()?.users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      {/* Sidebar Head UserAvatar & icons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px="5px"
        py="10px"
        borderBottom="2px solid whitesmoke"
      >
        <Tooltip title="Click to Sign Out" arrow>
          <Avatar
            src={user?.photoURL}
            sx={{ width: "36px", cursor: "pointer", height: "36px" }}
            onClick={() => auth.signOut()}
          />
        </Tooltip>
        <Box>
          <IconButton size="small">
            <FiMessageSquare />
          </IconButton>
          <IconButton size="small">
            <FiMoreVertical />
          </IconButton>
        </Box>
      </Stack>

      {/* Input Search */}
      <Stack direction="row" gap="5px" px="5px" py="12px" alignItems="center">
        <BiSearchAlt2 size="20px" />
        <Input placeholder="Search..." />
      </Stack>

      {/* Button Start  A new Chat */}
      <Button
        variant="text"
        sx={{
          py: "10px",
          width: "100%",
          borderTop: "2px solid whitesmoke",
          borderBottom: "2px solid whitesmoke",
          color: "#111",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,.1)",
          },
        }}
        onClick={createNewChat}
      >
        start a new chat
      </Button>
      {chatsSnapshot?.docs.map((chat) => {
        return <Chat key={chat?.id} id={chat?.id} users={chat?.data().users} />;
      })}
    </Container>
  );
};

export default Sidebar;

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  min-height: 100vh;
  background-color: white;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
`;
