import { Avatar, Box, Typography, AppBar, Toolbar } from "@mui/material";
import InputMessage from "./InputMessage";
import Message from "./Message";

const Chat = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 1,
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
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxHeight: '55vh',
          overflowY: 'auto',
          scrollBehavior: 'smooth'
        }}
        position="relative"
      >
        <Message bool={true}/>
        <Message bool={false}/>
        <Message bool={true}/>
        <Message bool={false}/>
        <Message bool={true}/>
        <Message bool={true}/>
        <Message bool={true}/>
        <Message bool={true}/>
        

      </Box>
      <InputMessage />
    </Box>
  );
};

export default Chat;
