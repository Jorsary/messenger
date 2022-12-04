import { Avatar, Box, TextField, Typography,Card } from "@mui/material";
import { UserInfo } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase/firebase";

const Search = () => {
  const [userAName, setUserAName] = useState("");
  const [userAnother, setUserAnother] = useState<UserInfo[]>([]);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    setUserAnother([]);
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", userAName),
      where("displayName", "<=", userAName + "~"),
      limit(3)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        setUserAnother((prev: any) => [...prev, userdata]);
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleSelect = async (user: UserInfo) => {
    if (auth.currentUser) {
      const combinedId =
        user.uid > auth.currentUser.uid
          ? user.uid + auth.currentUser.uid
          : auth.currentUser.uid + user.uid;

      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: auth.currentUser.uid,
              userRef: doc(db, "users", auth.currentUser.uid),
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              userRef: doc(db, "users", user.uid),
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
      setUserAnother([]);
      setUserAName("");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <TextField
        fullWidth
        id="Search"
        label="Поиск..."
        name="search"
        onChange={(e: any) => {
          setUserAName(e.target.value);
        }}
      />
      {userAnother.map((user: UserInfo) => (
        <Card
          onClick={()=>handleSelect(user)}
          sx={{
            boxSizing: "border-box",
            minHeight: 64,
            px: 2,
            py: 1,
            display: user || err ? "flex" : "none",
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
          <Avatar src={user.photoURL || ''} alt="" />
          <Typography>{user?.displayName}</Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Search;
