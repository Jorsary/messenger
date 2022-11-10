import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, Button, Input, TextField, Card } from "@mui/material";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useState, useRef } from "react";
import uuid from "react-uuid";
import { db, storage } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>();
  const imgRef = useRef<HTMLInputElement>(null);

  const { currentUser } = useAppSelector((state) => state.user);
  const { chatId, enemyUser } = useAppSelector((state) => state.chat);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImg(null);
      return;
    }
    setImg(e.target.files[0]);
  };

  const handleSend = async () => {
      if (currentUser && enemyUser) {
        if (img) {
          const storageRef = ref(storage, uuid());
          await uploadBytesResumable(storageRef, img);
          const downloadURL = await getDownloadURL(storageRef);
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
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
        setImg(null);
        if (imgRef.current) {
          imgRef.current.value = "";
          console.log(imgRef.current.files);
        }
      
    }
  };

  return (
    <Card
      sx={{
        position: "absolute",
        bottom: 0,
        boxShadow: 3,
        borderRadius: 1,
        padding: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          id="message"
          label="Введите сообщение"
          name="message"
          onChange={(e) => setText(e.target.value)}
          value={text}
          autoFocus
        />
        <input
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          ref={imgRef}
          onChange={onSelectFile}
        />
        <label htmlFor="raised-button-file">
          <Button component="span">
            <AttachFileIcon />
          </Button>
        </label>
        <Button disabled={!text && !img} type="submit">
          <SendRoundedIcon></SendRoundedIcon>
        </Button>
      </Box>
    </Card>
  );
};

export default InputMessage;
