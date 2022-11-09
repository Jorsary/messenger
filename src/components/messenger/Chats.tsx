import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Search from "./Search";
import UserChat from "./UserChat";
import { Avatar, Box, Card, Typography } from "@mui/material";

const Chats = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [chats, setChats] = useState<DocumentData>({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentUser) {
      const getChats = () => {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            setChats(doc.data() || {});
          }
        );

        return () => {
          unsub();
        };
      };

      currentUser.uid && getChats();
    }
  }, [currentUser]);



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
      {Object.entries(chats)
        ?.sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <UserChat key={chat[0]} info={chat[1]} />
        ))}
    </Box>
  );
};

export default Chats;

// {Object.entries(chats)
//   ?.sort((a: any, b: any) => b[1].date - a[1].date)
//   .map((chat: any) => (
//     <Card
//       sx={{
//         boxSizing: "border-box",
//         minHeight: 64,
//         px: 2,
//         py: 1,
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         cursor: "pointer",
//         boxShadow: 0,
//         transition: "all .2s ease-in-out",
//         "&:hover": {
//           transform: "translateY(-1px)",
//           boxShadow: 6,
//         },
//       }}
//     >
//       <Avatar
//         alt={`${chat[1].userInfo.displayName}`}
//         src={`${chat[1].userInfo.photoURL}`}
//       />
//       <Box>
//         <Typography variant="body1">
//           {chat[1].userInfo.displayName}
//         </Typography>
//         <Typography
//           color="text.disabled"
//           variant="body1"
//           sx={{
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             maxWidth: "130px",
//           }}
//         >
//         </Typography>
//       </Box>
//     </Card>
//   ))}
