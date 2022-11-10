import { Container, Box } from "@mui/material";
import React from "react";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";
import {useState} from 'react'
import { useAppSelector } from "../hooks/redux-hooks";

const Messenger = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display:'flex',
        mt:1
      }}
    >
      <Box
        sx={{
          boxShadow: {xs:0,md:4},
          display: "flex",
          borderRadius: 5,
          padding: {xs:0,md:4},
          height: {xs:'85vh',md:'90vh'},
          width:'100%'
        }}
      > 
        <Chats />
        <Chat />
      </Box>
    </Container>
  );
};

export default Messenger;
