import {
  Box, Button, TextField,Typography
} from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const InputMessage = () => {
  return (
    <Box
      position="absolute"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        boxShadow: 3,
        borderRadius: 1,
        width: "100%",
        padding:1
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          required
          fullWidth
          id="message"
          label="Введите сообщение"
          name="message"
          autoFocus
        />
        <Button><SendRoundedIcon></SendRoundedIcon></Button>
      </Box>
    </Box>
  );
};

export default InputMessage;
