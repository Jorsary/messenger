import { Avatar, Box, Card, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { changeUser } from "../../store/chatSlice";

const UserChat = ({ info }: any) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSelectChat = (u: any) => {
    if (currentUser) {
      const res = currentUser.uid > u.uid ? currentUser.uid + u.uid : u.uid + currentUser.uid;
      dispatch(changeUser({ u, res }));
    }
  };
  return (
    <Card
    onClick={() => handleSelectChat(info.userInfo)}
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
      <Avatar alt={info.userInfo.displayName}  src={info.userInfo.photoURL}/>
      <Box>
        <Typography variant="body1">{info.userInfo.displayName}</Typography>
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
          {info.lastMessage ? info.lastMessage.text : ""}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserChat;
