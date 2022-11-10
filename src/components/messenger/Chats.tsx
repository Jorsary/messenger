import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Search from "./Search";
import UserChat from "./UserChat";
import { Avatar, Box, Card, Typography,SxProps} from "@mui/material";
import { Theme } from "@mui/system";
import { AnyNaptrRecord } from "dns";

const Chats = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { chatOpened } = useAppSelector((state) => state.chat);
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

  const open = chatOpened ? 'flex' : 'none'
  return (

      <Box
        sx={{
          display: { xs: open , md: "flex" },
          // display: 'flex',
          flexDirection: "column",
          gap: 1,
          overflowY: "auto",
          padding: 1,
          flex:'1 0 0'
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
