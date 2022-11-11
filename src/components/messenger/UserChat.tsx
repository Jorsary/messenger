import { async } from "@firebase/util";
import { Avatar, Box, Card, Typography } from "@mui/material";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { changeUser } from "../../store/chatSlice";
import stringToColor from "../../utlis/stringToColor";

const UserChat = ({ info }: any) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSelectChat = (u: any) => {
    if (currentUser) {
      const res =
        currentUser.uid > u.uid
          ? currentUser.uid + u.uid
          : u.uid + currentUser.uid;
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
        bgcolor:stringToColor(`${userInfo.displayName}`)
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
          }}
        >
          {info.lastMessage ? info.lastMessage.text : ""}
        </Typography>
      </Box>
    </Card>
  );
};

export default UserChat;
