import {
  Box, Button, TextField,Typography
} from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import uuid from "react-uuid";
import { useAppSelector } from "../../hooks/redux-hooks";
import { db, storage } from "../../firebase/firebase";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<any>(null);

  const { currentUser } = useAppSelector(state=>state.user)
  const { chatId,enemyUser } = useAppSelector(state=>state.chat)

  const handleSend = async () => {
    if(currentUser && enemyUser){if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", enemyUser.uid), {
      [chatId + ".lastMessage"]: {
        text,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);}
  };
  return (
    <Box
      position="absolute"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        boxShadow: 3,
        borderRadius: 1,
        width: "100%",
        padding:1
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
        component='form'
        onSubmit={(e)=>{
          e.preventDefault()
          handleSend()}}
      >
        <TextField
          required
          fullWidth
          id="message"
          label="Введите сообщение"
          name="message"
          onChange={(e) => setText(e.target.value)}
          autoFocus
          value={text}
        />
        <Button type="submit"><SendRoundedIcon></SendRoundedIcon></Button>
      </Box>
    </Box>
  );
};

export default InputMessage;
