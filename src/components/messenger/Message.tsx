import React from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  Avatar,
  Typography,
} from "@mui/material";
import { User, UserInfo } from "firebase/auth";

interface InfoMessage {
  message: IMessage;
  user: User | null | undefined;
  enemyUser: UserInfo | null;
}

export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
  img?: string;
}
// { message, user, enemyUser }: InfoMessage
const Message = ({ message, user, enemyUser }: InfoMessage) => {
  if (user && enemyUser) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mb: "20px",
          minHeight: "80px",
          px: 2,
          alignItems: "center",
          justifyContent: "flex-start",
          ...(message.senderId === user?.uid && {
            flexDirection: "row-reverse",
          }),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "gray",
            fontWeight: 300,
            padding: 1,
          }}
        >
          <Avatar
            src={
              message.senderId === enemyUser?.uid
                ? `${enemyUser.photoURL}`
                : `${user.photoURL}`
            }
          />
          <Typography variant="caption">
            {new Date(message.date.seconds * 1000).toTimeString().split(" ")[0]}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" color={"primary.main"}>
              {message.senderId === enemyUser?.uid
                ? `${enemyUser.displayName}`
                : `${user.displayName}`}
            </Typography>
          </Box>

          <Typography>{message.text}</Typography>
        </Box>
        {message.img && <img style={{ width: 100 }} src={message.img} alt="" />}
      </Box>
    );
  }
  return <></>;
};

export default Message;
