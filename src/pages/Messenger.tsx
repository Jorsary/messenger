import { Container, Box } from "@mui/material";
import React from "react";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";

const Messenger = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "85vh",
        display: "flex",
        mt: 1,
      }}
    >
      <Chats />
      <Chat />
    </Container>
  );
};

export default Messenger;
