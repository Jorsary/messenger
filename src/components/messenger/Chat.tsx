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
import { onValue, ref as realRef } from "firebase/database";
import { doc, onSnapshot } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, realdb } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { StyledBadge } from "../../styles/components";
import stringToColor from "../../utlis/stringToColor";
import InputMessage from "./InputMessage";
import Message, { IMessage } from "./Message";

const Chat = ({ id }: any) => {
  const { chatId, enemyUser, userPresence } = useAppSelector(
    (state) => state.chat
  );
  const { uid } = useAppSelector((state) => state.user);
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const push = useNavigate();
  const goBack = () => push(-1);
  const [writing, setWriting] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (chatId && enemyUser) {
      const unsub = onValue(
        realRef(realdb, `write/${enemyUser?.uid + uid}`),
        (snapshot) => {

          const data: { writing: boolean } = snapshot.val();
          if (data) setWriting(data.writing);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [enemyUser]);

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
    if (userPresence && userPresence.time) {
      const date = new Date(userPresence.time);
      setDate(date.toLocaleTimeString() + " " + date.toLocaleDateString());
    }
  }, [userPresence]);

  return (
    <>
      <Box
        sx={{
          padding: { xs: 0, md: 1 },
          position: "relative",
          flex: "3",
          display: chatId && enemyUser ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "space-between",
          height: { xs: "98vh", md: "auto" },
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
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                invisible={userPresence && !userPresence.state}
              >
                <Avatar
                  sx={{ bgcolor: stringToColor(`${enemyUser?.displayName}`) }}
                  src={`${enemyUser?.photoURL}`}
                  alt={`${enemyUser?.displayName}`}
                />
              </StyledBadge>

              <Typography>{enemyUser?.displayName}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: !userPresence.state ? "block" : "none",
                }}
              >{`Был в сети ${date}`}</Typography>
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
        <Typography height={25} variant="caption">
          {writing ? `${enemyUser && enemyUser.displayName} печататает...` : ""}
        </Typography>
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

export default memo(Chat);
