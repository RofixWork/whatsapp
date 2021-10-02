import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { db } from "../../firebase";
import ChatScreen from "../../components/ChatScreen";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const Chat = ({ chats }) => {
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(chats?.users, user);
  return (
    <>
      <Head>
        <title>Chat width {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatScreen chats={chats} />
    </>
  );
};

export default Chat;

export const getServerSideProps = async (context) => {
  const ref = db.collection("chats").doc(context.query.id);

  const chatref = await ref.get();

  const chats = {
    id: chatref.id,
    ...chatref.data(),
  };

  return {
    props: {
      chats,
    },
  };
};
