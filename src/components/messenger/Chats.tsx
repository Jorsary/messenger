import { Box } from "@mui/material";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Search from "./Search";
import UserChat from "./UserChat";

const Chats = ({id}:any) => {
  const [chats, setChats] = useState<DocumentData>({});
  const { uid } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uid) {
      const getChats = () => {
        const unsub = onSnapshot(doc(db, "userChats", uid), (doc) => {
          setChats(doc.data() || {});
        });

        return () => {
          unsub();
        };
      };

      uid && getChats();
    }
  }, [uid]);

  return (
    <Box
      sx={{
        display: { xs:  !id ? "flex" : "none", md: "flex" },
        flexDirection: "column",
        gap: 1,
        overflowY: "auto",
        padding: 1,
        flex: "1 0 0",
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
