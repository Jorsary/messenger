import { Avatar, Box, TextField, Typography, Card, IconButton } from "@mui/material";
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
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import stringToColor from "../../utlis/stringToColor";
import CloseIcon from "@mui/icons-material/Close";

const Search = () => {
  const [userAName, setUserAName] = useState("");
  const [foundedUsers, setFoundedUsers] = useState<UserInfo[]>([]);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    setFoundedUsers([]);
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", userAName),
      where("displayName", "<=", userAName + "~"),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        setFoundedUsers((prev: any) => [...prev, userdata]);
      });
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userAName !== '') {
        handleSearch();
      }
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userAName]);

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
      } catch (err) { }
      setFoundedUsers([]);
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
      onReset={() => { setFoundedUsers([]) }}
    >
      <TextField
        fullWidth
        id="Search"
        label="Поиск..."
        name="search"
        onChange={(e: any) => {
          setUserAName(e.target.value);
        }}
        InputProps={{ endAdornment: <IconButton sx={{ padding: 0 }} type='reset'><CloseIcon fontSize="small" /></IconButton> }}
      ></TextField>
      <Box>
        <Typography display={foundedUsers.length ? 'block' : 'none'} sx={{ fontSize: '10px' }}>{`Найдено ${foundedUsers.length} пользователя`}</Typography>
        <Typography display={(foundedUsers.length < 1 && userAName) ? 'block' : 'none'} sx={{ fontSize: '10px' }}>{`Ничего не найдено`}</Typography>
        {foundedUsers.map((user: UserInfo) => (
          <Card
            onClick={() => handleSelect(user)}
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
            <Avatar sx={{
              bgcolor: stringToColor(`${user.displayName || ''}`),
            }}
              src={user.photoURL || ''} />
            <Typography>{user?.displayName}</Typography>
            <Typography sx={{justifySelf:'self-end'}}variant="caption">Добавить чат</Typography>
          </Card>
        ))}
      </Box>

    </Box>
  );
};

export default Search;
