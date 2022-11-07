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
}
// { message, user, enemyUser }: InfoMessage
const Message = ({ message, user, enemyUser }: InfoMessage) => {
  return (
    <Card
      sx={{
        display: "flex",
        gap: "10px",
        mb: "20px",
        minHeight:'80px',
        px: 2,
        alignItems: "center",
        justifyContent:'flex-start',
        ...(message.senderId === user?.uid && {
          flexDirection:'row-reverse'
          
        })
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
        <Avatar />
        <Typography>15:15</Typography>
      </Box>
      <Typography>
        {message.text}
        {/* {message.img && <img src={message.img} alt="" />} */}
      </Typography>
    </Card>
  );
};

export default Message;
