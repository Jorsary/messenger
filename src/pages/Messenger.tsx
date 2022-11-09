import { Container, Box } from "@mui/material";
import React from "react";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";

const Messenger = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height:'85vh',
        display:'flex',
        mt:1
      }}
    >
      {/* <Box
        sx={{
          boxShadow: 4,
          display: "flex",
          borderRadius: 5,
          padding: 4,
          height: "80vh",
        }}
      > */}
        <Chats />
        <Chat/>
      {/* </Box> */}
    </Container>
  );
};

export default Messenger;
