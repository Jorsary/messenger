import { Avatar, Box, Typography, AppBar, Toolbar } from "@mui/material";
import InputMessage from "./InputMessage";
import Message from "./Message";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
}

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
  };
}

const Chat = () => {
  const { chatId, enemyUser } = useAppSelector((state) => state.chat);
  const { currentUser } = useAppSelector((state) => state.user);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  useEffect(() => {
    try {
      const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unSub();
      };
    } catch (err) {
      console.log(err);
    }
  }, [chatId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Box
      sx={{
        padding: 1,
        position: "relative",
        flex: "3",
        height: "100%",
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 1 }}>
          <Avatar
            {...stringAvatar(`${enemyUser?.displayName}`)}
            src={`${enemyUser?.photoURL}`}
            alt={`${enemyUser?.displayName}`}
          />
          <Typography>{enemyUser?.displayName}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxHeight: "55vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          gap: 2,
        }}
        position="relative"
        ref={chatRef}
      >
        {messages.map((m: IMessage) => (
          <Message
            enemyUser={enemyUser}
            user={currentUser}
            key={m.id}
            message={m}
          />
        ))}
      </Box>
      <InputMessage />
    </Box>
  );
};

export default Chat;
