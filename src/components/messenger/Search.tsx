import { Avatar, Box, Card, TextField, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs, query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";

const Search = () => {
  const [userAName, setUserAName] = useState("");
  const [userAnother, setUserAnother] = useState<any>();
  const [err, setErr] = useState(false);
  const { currentUser } = useAppSelector((state) => state.user);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userAName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        setUserAnother(userdata);
      });
    } catch (err) {
      setErr(true);
    }
    console.log(userAnother)
  };

  const handleSelect = async () => {
    if (currentUser) {
      const combinedId =
        userAnother.uid > currentUser.uid
          ? userAnother.uid + currentUser.uid
          : currentUser.uid + userAnother.uid;

      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", userAnother.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              userRef: doc(db,'users',currentUser.uid)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: userAnother.uid,
              userRef: doc(db,'users',userAnother.uid)
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
      setUserAnother(null);
      setUserAName("");
    }
  };
  return (
    <Box component="form" onSubmit={(e) => {
      e.preventDefault()
      handleSearch()}}>
      <TextField
        required
        fullWidth
        id="Search"
        label="Поиск..."
        name="search"
        onChange={(e: any) => {
          setUserAName(e.target.value);
        }}
        autoFocus
      />
      {userAnother && (
        <Card onClick={handleSelect} sx={{
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
        }}>
          <Avatar src={userAnother.photoURL} alt="" />
          <Typography>{userAnother.displayName}</Typography>
        </Card>
      )}
    </Box>
  );
};

export default Search;
