import { Avatar, Box, Card, Typography } from "@mui/material";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { changeUser } from "../../store/chatSlice";
import stringToColor from "../../utlis/stringToColor";

const UserChat = ({ info }: any) => {
  const { photoURL, displayName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSelectChat = (u: any) => {
    if (auth.currentUser) {
      const res =
        auth.currentUser.uid > u.uid
          ? auth.currentUser.uid + u.uid
          : u.uid + auth.currentUser.uid;
      dispatch(changeUser({ u, res }));
    }
  };

  const [userInfo, setUserInfo] = useState<any>({});
  const asfnc = async () => {
    const res: any = await getDoc(info.userInfo.userRef);
    setUserInfo(res.data());
  };
  useEffect(() => {
    asfnc();
  }, [info]);

  return (
    <Card
      onClick={() => handleSelectChat(userInfo)}
      sx={{
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
      <Avatar
        sx={{
          bgcolor: stringToColor(`${displayName}`),
        }}
        src={`${photoURL}`}
        alt={displayName}
      />
      <Box>
        <Typography variant="body1">{displayName}</Typography>
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
