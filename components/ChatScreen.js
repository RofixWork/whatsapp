import styled from "styled-components";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { CgAttachment } from "react-icons/cg";
import { FiMoreVertical } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import { AiTwotoneAudio } from "react-icons/ai";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { db } from "../firebase";
import Message from "./Message";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
const ChatScreen = ({ chats }) => {
  const [user] = useAuthState(auth);
  const inputRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chats.users, user))
  );
  const [input, setInput] = useState("");

  // recipient email
  const recipientEmail = getRecipientEmail(chats.users, user);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const sendMessage = (e) => {
    e.preventDefault();

    if (!input.trim()) return false;

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      user: user?.email,
      photoURL: user?.photoURL,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    inputRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot?.docs.map((message) => {
        return <Message key={message?.id} {...message?.data()} />;
      });
    }
  };

  return (
    <Container>
      {/* Head */}
      <Box
        sx={{
          padding: "0 10px ",
          gridRow: "1 / 2",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid whitesmoke",
          position: "sticky",
          top: "0",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          {recipient ? (
            <>
              <Avatar
                sx={{ width: 35, height: 35 }}
                src={recipient?.photoURL}
              />
            </>
          ) : (
            <>
              <Avatar sx={{ width: 35, height: 35 }}>
                {recipientEmail[0]}
              </Avatar>
            </>
          )}

          <Box>
            <Typography sx={{ marginBottom: "-8px" }} variant="subtitle2">
              {recipientEmail}
            </Typography>
            {recipientSnapshot ? (
              <>
                <Typography variant="caption">
                  Last active:
                  {recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                  ) : (
                    "Unavailable"
                  )}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="caption">
                  Loading last active....
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <IconButton>
            <CgAttachment size={20} />
          </IconButton>
          <IconButton>
            <FiMoreVertical size={20} />
          </IconButton>
        </Box>
      </Box>
      {/* messages */}
      <Box
        ref={inputRef}
        sx={{
          gridRow: "2/2",
          bgcolor: "#e5dfd9",
          padding: "10px 20px",
          overflowY: "auto",
        }}
      >
        {showMessages()}
      </Box>
      {/* Input */}
      <Box
        component="form"
        sx={{
          gridRow: "3/3",
          display: "flex",
          alignItems: "center",
          padding: "7px 25px",
          gap: "8px",
          borderTop: "2px solid whitesmoke",
        }}
      >
        <FaRegSmile size={20} cursor="pointer" title="Emojis" />
        <Input
          placeholder="Type of Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <AiTwotoneAudio size={20} cursor="pointer" title="Record Audio" />

        <button type="submit" hidden onClick={sendMessage}>
          sen a message
        </button>
      </Box>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div`
  margin-left: 280px;
  height: 100vh;
  display: grid;
  grid-template-rows: 58px 1fr 50px;
`;
const Input = styled.input`
  display: block;
  flex: 1;
  height: 35px;
  padding: 14px;
  border: 2px solid whitesmoke;
  &:focus {
    outline: none;
    border: 2px solid #ccc;
  }
`;
