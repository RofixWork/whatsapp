import Box from "@mui/material/Box";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";
const Message = ({ user, message, photoURL, timestamp }) => {
  const [userLoggedIn] = useAuthState(auth);
  const check = userLoggedIn?.email === user;
  return (
    <>
      {check ? (
        <Box display="flex" justifyContent="flex-end">
          <Box
            component="p"
            sx={{
              textAlign: "right",
              bgcolor: "#e2f3cc",
              width: "fit-content",
              padding: "8px 10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {message}
            <Box component="span" sx={{ display: "block", fontSize: "12px" }}>
              {timestamp
                ? moment(timestamp?.toDate()?.getTime()).format("LT")
                : ""}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-start">
          <Box
            component="p"
            sx={{
              textAlign: "right",
              bgcolor: "whitesmoke",
              width: "fit-content",
              padding: "5px 10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {message}
            <Box component="span" sx={{ display: "block", fontSize: "12px" }}>
              {timestamp
                ? moment(timestamp?.toDate()?.getTime()).format("LT")
                : "... "}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Message;
