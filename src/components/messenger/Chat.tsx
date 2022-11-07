import { Avatar, Box, Typography, AppBar, Toolbar } from "@mui/material";
import InputMessage from "./InputMessage";

const Chat = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 1,
        borderLeft: "1px solid",
        borderColor: "primary.main",
        position: "relative",
      }}
    >
      <AppBar
        position="static"
        sx={{
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", gap: 1 }}>
          <Avatar />
          <Typography>Никнейм</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          padding: 1,
        }}
        position="relative"
      ></Box>
      <InputMessage />
    </Box>
  );
};

export default Chat;
