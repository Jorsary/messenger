import { Box, Card, Avatar, Typography } from "@mui/material";
import Search from "./Search";
import UserChat from "./UserChat";

const Chats = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        padding: 1,
      }}
    >
      <Search />
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />

      <UserChat />
      <UserChat />
      <UserChat />
      <UserChat />

      <UserChat />
      <UserChat />
    </Box>
  );
};

export default Chats;
