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
import stringToColor from "../../utlis/stringToColor";

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

const Message = ({ message, user, enemyUser }: InfoMessage) => {
  const senderUser = message.senderId === enemyUser?.uid;
  if (user && enemyUser) {
    return (
      <Box
        sx={{
          display: "flex",
          px: 2,
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
            color: "gray",
            fontWeight: 300,
            padding: 1,
            alignItems: "center",
          }}
        >
          <Avatar
            src={senderUser ? `${enemyUser.photoURL}` : `${user.photoURL}`}
            alt={
              senderUser ? `${enemyUser.displayName}` : `${user.displayName}`
            }
            {...stringToColor(
              senderUser ? `${enemyUser.displayName}` : `${user.displayName}`
            )}
          />
          <Typography variant="caption">
            {new Date(message.date.seconds * 1000).toTimeString().split(" ")[0]}
          </Typography>
        </Box>
        <Card
          sx={{
            maxWidth: { xs: 170, sm: 300, md: 450 },
            display: "flex",
            flexDirection: "column",
            padding: { xs: 1, md:'11px' },
            gap:1
          }}
        >
          <Box
            sx={{
              display: "flex",
              ...(message.senderId === user?.uid && {
                justifyContent: "end",
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
              {senderUser ? `${enemyUser.displayName}` : `${user.displayName}`}
            </Typography>
          </Box>

          <Typography
            sx={{
              maxWidth: 400,
              wordWrap: "break-word",
            }}
          >
            {message.text}
          </Typography>
          {message.img && <img src={message.img} alt="" />}
        </Card>
      </Box>
    );
  }
  return <></>;
};

export default Message;
