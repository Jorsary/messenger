import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, Button, IconButton, Popover, TextField } from "@mui/material";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytesResumable,
} from "firebase/storage";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import uuid from "react-uuid";
import { auth, db, storage } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { handleOpenImagePopup } from "../../store/popupsSlice";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<string>("");
  const [onRecord, setOnRecord] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [storageRefImg, setStorageRefImg] = useState<StorageReference>();

  const stopButtonRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useAppDispatch();

  const { chatId, enemyUser } = useAppSelector((state) => state.chat);
  const { darkMode } = useAppSelector((state) => state.theme);

  const onSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (auth.currentUser && e.target.files) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, e.target.files[0]);
      const downloadURL = await getDownloadURL(storageRef);
      setImg(downloadURL);
      setStorageRefImg(storageRef);
      if (imgRef.current) {
        imgRef.current.value = "";
      }
    }
  };

  const onDeleteFile = () => {
    if (storageRefImg) {
      deleteObject(storageRefImg);
      setImg("");
    }
  };

  const handleSend = async (voices?: string) => {
    if (auth.currentUser && enemyUser) {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: auth.currentUser.uid,
          date: Timestamp.now(),
          img: img,
          voices: voices ? voices: '' ,
        }),
      });

      await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
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
      setImg("");
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(function (stream) {
        const options = { mimeType: "audio/webm" };
        const recordedChunks: any = [];
        const mediaRecorder = new MediaRecorder(stream, options);
        setOnRecord(true);

        mediaRecorder.addEventListener("dataavailable", function (e: any) {
          console.log(e.target);
          if (e.data.size > 0) recordedChunks.push(e.data);
        });

        mediaRecorder.addEventListener("stop", async function () {
          const storageRef = ref(storage, uuid());
          await uploadBytesResumable(storageRef, new Blob(recordedChunks));
          const downloadURL = await getDownloadURL(storageRef);
          handleSend(downloadURL);
        });

        if (stopButtonRef && stopButtonRef.current)
          stopButtonRef?.current?.addEventListener(
            "click",
            async function onStopClick() {
              mediaRecorder.stop();
              this.removeEventListener("click", onStopClick);
              setOnRecord(false);
            }
          );

        mediaRecorder.start();
      });
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker
          searchDisabled
          skinTonesDisabled
          theme={darkMode ? Theme.DARK : Theme.LIGHT}
          emojiStyle={EmojiStyle.GOOGLE}
          onEmojiClick={(e) => {
            setText(text + e.emoji);
          }}
        />
      </Popover>

      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          width: "100%",
          padding: 2,
          bgcolor: "secondary.main",
        }}
      >
        <Box
          sx={{
            display: img ? "flex" : "none",
            padding: "2px",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <img
              onClick={() => {
                dispatch(handleOpenImagePopup({ imageLink: img }));
              }}
              style={{ width: "10vh" }}
              src={img}
            ></img>
            <CloseIcon
              onClick={() => onDeleteFile()}
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: 0,
                top: 0,
                transition: "all .2s ease-in-out",
                "&:hover": {
                  opacity: 0.6,
                },
              }}
            />
          </Box>
        </Box>
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
            size="small"
            inputProps={{
              style: { fontFamily: "Noto Color Emoji, sans-serif" },
            }}
          />

          <IconButton
            color="primary"
            onClick={(e) => {
              handleClick(e);
            }}
            size="small"
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <input
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            ref={imgRef}
            onChange={onSelectImage}
          />
          <label htmlFor="raised-button-file">
            <IconButton color="primary" size="small" component="span">
              <AttachFileIcon />
            </IconButton>
          </label>
          <IconButton
            color="primary"
            size="small"
            disabled={!text && !img}
            type="submit"
            sx={{ display: text ? "block" : "none" }}
          >
            <SendRoundedIcon></SendRoundedIcon>
          </IconButton>
          {!text && (
            <>
              <IconButton
                color="primary"
                size="small"
                sx={{ display: !onRecord ? "block" : "none" }}
                onClick={startRecording}
              >
                <KeyboardVoiceRoundedIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                ref={stopButtonRef}
                sx={{ display: onRecord ? "block" : "none" }}
              >
                стоп
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default InputMessage;
