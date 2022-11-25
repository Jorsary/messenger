import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Box, IconButton, Popover, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import { ref as realRef, set } from "firebase/database";
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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { auth, db, realdb, storage } from "../../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { handleOpenImagePopup } from "../../store/popupsSlice";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<string>("");
  const [onRecord, setOnRecord] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [storageRefImg, setStorageRefImg] = useState<StorageReference>();
  const [progress, setProgress] = useState<number>(0);

  const stopVoiceRef = useRef<HTMLButtonElement>(null);
  const sendVoiseRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useAppDispatch();

  const { uid } = useAppSelector((state) => state.user);
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

  const handleSend = async (voices?: string, duration?: number) => {
    const textMessage = text;
    setText("");
    setImg("");
    if (auth.currentUser && enemyUser) {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: textMessage,
          time: Timestamp.now().seconds,
          senderId: auth.currentUser.uid,
          img: img,
          voices: voices ? voices : "",
          duration: duration ? duration : 0,
        }),
      });
      
      await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
        [chatId + ".lastMessage"]: {
          text: voices
            ? "Голосовое сообщение"
            : textMessage
            ? textMessage
            : "Изображение",
        },
        [chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", enemyUser.uid), {
        [chatId + ".lastMessage"]: {
          text: voices
            ? "Голосовое сообщение"
            : textMessage
            ? textMessage
            : "Изображение",
        },
        [chatId + ".date"]: serverTimestamp(),
      });
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
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const recordedChunks: any = [];
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
          audioBitsPerSecond: 128000,
        });
        setOnRecord(true);
        mediaRecorder.addEventListener("start", function (e: any) {});
        mediaRecorder.addEventListener(
          "dataavailable",
          function (e: BlobEvent) {
            if (e.data.size > 0) recordedChunks.push(e.data);
          }
        );
        mediaRecorder.addEventListener("stop", async function () {
          console.log(recordedChunks[0]);
          const duration = recordedChunks[0].size / 16000;
          const storageRef = ref(storage, `${uuid()}.webm`);
          await uploadBytesResumable(
            storageRef,
            new File(recordedChunks, "", { type: "audio/webm" })
          );
          const downloadURL = await getDownloadURL(storageRef);
          console.log(downloadURL);
          handleSend(downloadURL, duration);
        });

        if (sendVoiseRef && sendVoiseRef.current)
          sendVoiseRef?.current?.addEventListener(
            "click",
            async function onSendClick() {
              console.log(mediaRecorder);
              mediaRecorder.stop();
              this.removeEventListener("click", onSendClick);
              setOnRecord(false);
            }
          );

        if (stopVoiceRef && stopVoiceRef.current)
          stopVoiceRef?.current?.addEventListener(
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

  const handleWriting = (writeState: boolean) => {
    set(realRef(realdb, chatId + uid), {
      writing: writeState,
    });
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <EmojiPicker
          lazyLoadEmojis
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
          borderBottomRightRadius: 0,
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
        >
          <Box
            sx={{
              display: onRecord ? "none" : "flex",
              gap: 1,
              alignItems: "center",
              width: "100%",
            }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
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
            <TextField
              variant="standard"
              fullWidth
              id="message"
              placeholder="Введите сообщение"
              name="message"
              onChange={(e) => {
                setText(e.target.value);
                handleWriting(true);
              }}
              value={text}
              size="small"
              onBlur={() => {
                handleWriting(false);
              }}
              InputProps={{
                style: { fontFamily: "sans-serif, Noto Color Emoji" },
                disableUnderline: true,
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
            <IconButton
              color="primary"
              size="small"
              disabled={!text && !img}
              type="submit"
              sx={{ display: text || img ? "block" : "none" }}
            >
              <SendRoundedIcon></SendRoundedIcon>
            </IconButton>
          </Box>
          {!text && !img && (
            <>
              <IconButton
                color="primary"
                size="small"
                ref={stopVoiceRef}
                sx={{ display: onRecord ? "block" : "none" }}
              >
                <StopCircleIcon />
              </IconButton>
              <LinearProgress
                sx={{
                  flexGrow: 2,
                  width: "16vw",
                  display: onRecord ? "block" : "none",
                }}
                variant="indeterminate"
                value={progress}
              />
              <IconButton
                color="primary"
                size="small"
                ref={sendVoiseRef}
                sx={{ display: onRecord ? "block" : "none" }}
              >
                <SendRoundedIcon />
              </IconButton>

              <IconButton
                color="primary"
                size="small"
                sx={{ display: !onRecord ? "block" : "none" }}
                onClick={startRecording}
              >
                <KeyboardVoiceRoundedIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default InputMessage;
