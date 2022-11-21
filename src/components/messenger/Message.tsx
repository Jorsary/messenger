import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { UserInfo } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { handleOpenImagePopup } from "../../store/popupsSlice";
import stringToColor from "../../utlis/stringToColor";
import Loader from "../Loader";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";

import LinearProgress from "@mui/material/LinearProgress";
interface InfoMessage {
  message: IMessage;
  enemyUser: UserInfo | null;
}

export interface IMessage {
  date: { seconds: number; nanoseconds: number };
  id: string;
  senderId: string;
  text: string;
  img?: string;
  voices?: string;
}

const Message = ({ message, enemyUser }: InfoMessage) => {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');

  const senderUser = message.senderId === enemyUser?.uid;
  const chatRef = useRef<HTMLDivElement | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
    }
  }, [message]);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.addEventListener(
        "playing",
        () => {
          setIsPlaying(true);
        },
        false
      );
      audioRef.current.addEventListener(
        "ended",
        () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime('00:00');
        },
        false
      );
      audioRef.current.addEventListener(
        "pause",
        () => {
          setIsPlaying(false);
        },
        false
      );
      audioRef.current.addEventListener("timeupdate", () => {
        const duration = (audioRef.current && audioRef.current.duration) || 0;
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime / duration);
          var hours = Math.floor(audioRef.current.currentTime / 60 / 60);
          var minutes = Math.floor(audioRef.current.currentTime / 60) - hours * 60;
          var seconds = audioRef.current.currentTime % 60;
          setCurrentTime(`${Math.trunc(minutes)<10?0:''}${minutes}:${Math.trunc(seconds)<10?0:''}${Math.trunc(seconds)}`);
        }
      });
    }
  }, []);
  return (
    <Box
      ref={chatRef}
      sx={{
        display: auth.currentUser && enemyUser ? "flex" : "none",
        px: 2,
        justifyContent: "flex-start",
        ...(message.senderId === auth.currentUser?.uid && {
          flexDirection: "row-reverse",
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "gray",
          fontWeight: 300,
          padding: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          src={
            senderUser
              ? `${enemyUser.photoURL}`
              : `${auth.currentUser?.photoURL}`
          }
          alt={
            senderUser
              ? `${enemyUser.displayName}`
              : `${auth.currentUser?.displayName}`
          }
          sx={{
            bgcolor: stringToColor(
              senderUser
                ? `${enemyUser.displayName}`
                : `${auth.currentUser?.displayName}`
            ),
          }}
        />
        <Typography variant="caption">
          {new Date(message.date.seconds * 1000).toTimeString().split(" ")[0]}
        </Typography>
      </Box>
      <Card
        sx={{
          maxWidth: { xs: 170, sm: 300, md: 450 },
          display: "flex",
          flexDirection: "column",
          padding: { xs: 1, md: "11px" },
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            ...(message.senderId === auth.currentUser?.uid && {
              justifyContent: "end",
            }),
          }}
        >
          <Typography
            variant="body1"
            color={"primary.main"}
            sx={{
              lineHeight: "15px",
              fontStyle: "normal",
              textAlign: "justify",
            }}
          >
            {senderUser
              ? `${enemyUser.displayName}`
              : `${auth.currentUser?.displayName}`}
          </Typography>
        </Box>

        {message.text && (
          <Typography
            sx={{
              maxWidth: 400,
              wordWrap: "break-word",
              fontFamily: "Noto Color Emoji, sans-serif",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            {message.text}
          </Typography>
        )}
        {message.img && (
          <>
            <img
              onClick={() => {
                {
                  message.img &&
                    dispatch(handleOpenImagePopup({ imageLink: message.img }));
                }
              }}
              style={{ display: loaded ? "block" : "none" }}
              src={message.img}
              onLoad={() => {
                setLoaded(true);
              }}
            />
            <Loader height="600px" width="400px" loaded={loaded} />
          </>
        )}

        {message.voices && (
          <>
            <audio
              ref={audioRef}
              style={{ display: "none" }}
              src={message.voices}
              preload='auto'
            ></audio>
            <Box
              sx={{ display: "flex", alignItems: "center",width:'250px' }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseCircleFilledRoundedIcon />
              ) : (
                <PlayCircleFilledRoundedIcon />
              )}
              <LinearProgress
                sx={{width:'100%'}}
                variant="determinate"
                value={progress*100}
              />
              <Typography variant="caption">{currentTime}</Typography>
            </Box>
          </>
        )}
      </Card>
    </Box>
  );
};

export default Message;
