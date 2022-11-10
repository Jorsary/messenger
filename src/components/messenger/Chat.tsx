import { Avatar, Box, Typography, AppBar, Toolbar } from "@mui/material";
import InputMessage from "./InputMessage";
import Message from "./Message";
import { useAppSelector } from "../../hooks/redux-hooks";
import { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import stringToColor from "../../utlis/stringToColor";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
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
  if (enemyUser)
    return (
      <Box
        sx={{
          padding: 1,
          position: "relative",
          flex: "3",
          maxHeight:'90vh'
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
              {...stringToColor(`${enemyUser?.displayName}`)}
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
            overflowY: "auto",
            scrollBehavior: "smooth",
            gap: 2,
            height:'80%'
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
  else
    return (
      <Box
        sx={{
          padding: 1,
          position: "relative",
          flex: "3",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
        }}
      >
        <ForumRoundedIcon sx={{ fontSize: "5vw" }} />
        Выберите чат
      </Box>
    );
};

export default Chat;
