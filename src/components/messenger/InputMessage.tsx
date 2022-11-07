import {
  Box, Button, TextField
} from "@mui/material";

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
        <Button>Отправить</Button>
      </Box>
    </Box>
  );
};

export default InputMessage;
