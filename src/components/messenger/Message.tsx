import {
  Avatar,
  Box,
  Card, Typography
} from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { handleOpenImagePopup } from "../../store/popupsSlice";
import stringToColor from "../../utlis/stringToColor";
import Loader from "../Loader";
import Player from "./WafeForm";
interface InfoMessage {
  message: IMessage;
  enemyUser: UserInfo | null;
}

export interface IMessage {
  time: number;
  id: string;
  senderId: string;
  text: string;
  img?: string;
  voices?: string;
  duration?: number;
}

const Message = ({ message, enemyUser }: InfoMessage) => {
  const [loaded, setLoaded] = useState(false);

  
  const senderUser = message.senderId === enemyUser?.uid;
  const chatRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
    }
  }, [message]);



  return (
    <Box
      ref={chatRef}
      sx={{
        display: auth.currentUser && enemyUser ? "flex" : "none",
        px: 2,
        justifyContent: "flex-start",
        ...(message.senderId === auth.currentUser?.uid && {
          flexDirection: "row-reverse",
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "gray",
          fontWeight: 300,
          padding: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          src={
            senderUser
              ? `${enemyUser.photoURL}`
              : `${auth.currentUser?.photoURL}`
          }
          alt={
            senderUser
              ? `${enemyUser.displayName}`
              : `${auth.currentUser?.displayName}`
          }
          sx={{
            bgcolor: stringToColor(
              senderUser
                ? `${enemyUser.displayName}`
                : `${auth.currentUser?.displayName}`
            ),
          }}
        />
        <Typography variant="caption">
          {new Date(message.time * 1000).toTimeString().split(" ")[0]}
        </Typography>
      </Box>
      <Card
        sx={{
          maxWidth: { xs: '60vw', md: '35vw' },
          display: "flex",
          flexDirection: "column",
          padding: { xs: 1, md: "11px" },
          gap: 1,
          width:'max-content'
        }}
      >
        <Box
          sx={{
            display: "flex",
            ...(message.senderId === auth.currentUser?.uid && {
              justifyContent: "end",width:'max-content'
            }),
          }}
        >
          <Typography
            variant="body1"
            color={"primary.main"}
            sx={{
              lineHeight: "15px",
              fontStyle: "normal",
              textAlign: "justify",
            }}
          >
            {senderUser
              ? `${enemyUser.displayName}`
              : `${auth.currentUser?.displayName}`}
          </Typography>
        </Box>

        {message.text && (
          <Typography
            sx={{
              wordWrap: "break-word",
              fontFamily: "sans-serif, Noto Color Emoji",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            {message.text}
          </Typography>
        )}
        {message.img && (
          <>
            <img
              onClick={() => {
                {
                  message.img &&
                    dispatch(handleOpenImagePopup({ imageLink: message.img }));
                }
              }}
              style={{ display: loaded ? "block" : "none",maxWidth:400 }}
              src={message.img}
              onLoad={() => {
                setLoaded(true);
              }}
            />
            <Loader height="600px" width="400px" loaded={loaded} />
          </>
        )}

        {message.voices && (
          <Box sx={{ width: { xs: "55vw", md: "25vw" } }}>
            <Player voice={message.voices} length={message.duration ? message.duration : 0} />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Message;
