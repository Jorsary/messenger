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
import { height } from "@mui/system";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import stringToColor from "../../utlis/stringToColor";
import InputMessage from "./InputMessage";
import Message from "./Message";
export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
}

const Chat = ({ id }: any) => {
  const { chatId, enemyUser } = useAppSelector((state) => state.chat);
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

  const push = useNavigate();
  const goBack = () => push(-1);

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 1 },
          position: "relative",
          flex: "3",
          display: id && enemyUser ? "flex" : "none",
          flexDirection:'column',
          justifyContent:'space-between',
          height:{ xs: '98vh', md: 'auto' },
        }}
      >
        <AppBar
          position="static"
          sx={{
            boxShadow: 3,
            borderRadius: 2,
          }}
        
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              onClick={() => {
                goBack();
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
            gap: 2,
            height: "100%",
          }}
          position="relative"
        >
          <>
            {messages.map((m: IMessage) => (
              <Message enemyUser={enemyUser} key={m.id} message={m} />
            ))}
          </>
        </Box>
        <InputMessage />
      </Box>

      <Box
        sx={{
          padding: 1,
          position: "relative",
          flex: "3",
          height: "100%",
          display: { xs: "none", md: id ? "none" : "flex" },
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
    </>
  );
};

export default Chat;
