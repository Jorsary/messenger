import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import stringToColor from "../../utlis/stringToColor";
import InputMessage from "./InputMessage";
import Message from "./Message";
export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
}

const Chat = ({id}:any) => {
  const { chatId, enemyUser } = useAppSelector(
    (state) => state.chat
  );
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const dispatch = useAppDispatch();
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

  const push = useNavigate()
  const goBack = () => push(-1)


  const open = !id ? "none" : "block";
  if (enemyUser)
    return (
      <Box
        sx={{
          padding: { xs: 0, md: 1 },
          position: "relative",
          flex: "3",
          display: open,
          height: { xs: "90vh", md: "85vh" },
        }}
      >
        <AppBar
          position="static"
          sx={{
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              onClick={() => {
                goBack()
              }}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{ bgcolor: stringToColor(`${enemyUser?.displayName}`) }}
                src={`${enemyUser?.photoURL}`}
                alt={`${enemyUser?.displayName}`}
              />
              <Typography>{enemyUser?.displayName}</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            position: "relative",
            padding: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflowY: "auto",
            scrollBehavior: "smooth",
            gap: 2,
            height: "80%",
          }}
          position="relative"
          ref={chatRef}
        >
          <>
            {messages.map((m: IMessage) => (
              <>
                <Message
                  enemyUser={enemyUser}
                  user={auth.currentUser}
                  key={m.id}
                  message={m}
                />
              </>
            ))}
          </>
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
          display: { xs: open, md: "flex" },
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
