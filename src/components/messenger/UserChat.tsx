import { Avatar, Box, Card, Typography } from "@mui/material";
import { DocumentReference, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { changeUser } from "../../store/chatSlice";
import stringToColor from "../../utlis/stringToColor";

interface UserInfo {
  info: {
    date: { seconds: number; nanoseconds: number };
    lastMessage: {
      text: string;
    };
    userInfo: {
      uid: string;
      userRef: DocumentReference;
    };
  };
}

const UserChat = ({ info }: UserInfo) => {
  const dispatch = useAppDispatch();
  const push = useNavigate();
  const handleSelectChat = (u: any) => {
    if (auth.currentUser) {
      const res =
        auth.currentUser.uid > u.uid
          ? auth.currentUser.uid + u.uid
          : u.uid + auth.currentUser.uid;
      dispatch(changeUser({ u, res }));
      push(`/messenger/${res}`);
    }
  };

  const [userInfo, setUserInfo] = useState<any>({});
  const getUserInfo = async () => {
    const res: any = await getDoc(info.userInfo.userRef);
    setUserInfo(res.data());
  };
  useEffect(() => {
    getUserInfo();
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
          bgcolor: stringToColor(`${userInfo.displayName}`),
        }}
        src={`${userInfo.photoURL}`}
        alt={userInfo.displayName}
      />
      <Box>
        <Typography variant="body1">{userInfo.displayName}</Typography>
        <Typography
          color="text.disabled"
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "130px",
            fontFamily: "sans-serif, Noto Color Emoji",
          }}
        >
          {info.lastMessage ? info.lastMessage.text : ""}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserChat;
