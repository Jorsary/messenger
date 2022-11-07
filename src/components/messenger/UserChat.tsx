import { Avatar, Box, Card, Typography } from "@mui/material";

const UserChat = () => {
  return (
    <Card
      sx={{
        boxSizing: "border-box",
        minHeight: 64,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        boxShadow: 0,
        transition: "all .2s ease-in-out",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: 6,
        },
      }}
    >
      <Avatar />
      <Box>
        <Typography variant="body1">Никнейм</Typography>
        <Typography
          color="text.disabled"
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "130px",
          }}
        >
          Последнее сообщение
        </Typography>
      </Box>
    </Card>
  );
};

export default UserChat;
