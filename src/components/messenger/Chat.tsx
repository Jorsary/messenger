import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import stringToColor from "../../utlis/stringToColor";
import InputMessage from "./InputMessage";
import Message from "./Message";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { openChat } from "../../store/chatSlice";
export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
}

const Chat = () => {
  const { chatId, enemyUser,chatOpened } = useAppSelector((state) => state.chat);
  const { currentUser } = useAppSelector((state) => state.user);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const dispatch = useAppDispatch()
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
  useEffect(() => {
    console.log(chatOpened)
  }, [chatOpened]);

  const open = chatOpened ? 'none' : 'block'
  if (enemyUser)
    return (
      <Box
        sx={{
          padding: {xs:0,md:1},
          position: "relative",
          flex: "3",
          maxHeight: "90vh",
          display:open
        }}
      >
        <AppBar
          position="static"
          sx={{
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton onClick={()=>dispatch(openChat())} sx={{display: { xs: "flex", md: "none" }}}>
              <ArrowBackRoundedIcon />
            </IconButton>
            <Box sx={{display:'flex',alignItems:'center', gap: 1,}}>
              <Avatar
                sx={{bgcolor:stringToColor(`${enemyUser?.displayName}`)}}
                src={`${enemyUser?.photoURL}`}
                alt={`${enemyUser?.displayName}`}
              />
              <Typography>{enemyUser?.displayName}</Typography>
            </Box>
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
            height: "80%",
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
          display:{xs:open, md:'flex'},
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
