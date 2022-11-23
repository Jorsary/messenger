import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Box, IconButton, Button, Typography } from "@mui/material";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
interface PlayerProps {
  voice: string;
  length: number;
}
export default function Player({ voice, length }: PlayerProps) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState("");
  const [speedRate, setSpeedRate] = useState(1);
  const el = useRef<any>();
  const secondInClocks = (time: number) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) - hours * 60;
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const clocks = secondInClocks(playing ? duration :length );
    setTimer(
      `${Math.trunc(clocks.minutes) < 10 ? 0 : ""}${clocks.minutes}:${
        Math.trunc(clocks.seconds) < 10 ? 0 : ""
      }${Math.trunc(clocks.seconds)}`
    );
  }, [duration]);
  

  useEffect(() => {
    let _wavesurfer = WaveSurfer.create({
      container: el.current,
      barWidth: 2,
      barRadius: 3,
      barGap: 1,
      barMinHeight: 2,
      cursorWidth: 1,
      backend: "MediaElement",
      height: 20,
      progressColor: "#8774e1",
      responsive: true,
      waveColor: "#35354c",
      cursorColor: "transparent",
      hideScrollbar: true,
    });
    _wavesurfer.load(voice);
    setWavesurfer(_wavesurfer);
    _wavesurfer.on("ready", function () {
      setDuration(_wavesurfer.getDuration());
    });
    _wavesurfer.on("audioprocess", function () {
      setDuration(_wavesurfer.getDuration() - _wavesurfer?.getCurrentTime());
    });

    _wavesurfer.on("finish", function () {
      _wavesurfer?.stop();
      setPlaying(false);
      setDuration(_wavesurfer.getDuration());
    });

    return () => {
      _wavesurfer.unAll();
      _wavesurfer.destroy();
    };
  }, []);

  const handlePlay = () => {
    setPlaying(!playing);
    wavesurfer?.playPause();
  };
  const toggleChangeSpeed = () => {
    if (speedRate >= 2) {
      setSpeedRate(1);
    } else {
      setSpeedRate(speedRate + 0.5);
    }
  };
  useEffect(() => {
    wavesurfer && wavesurfer.setPlaybackRate(speedRate);
  }, [speedRate]);

  return (
    <Box
      sx={{ width: {xs:"55vw" , md: '25vw'}, display: "flex" }}
      gap="5px"
      display="flex"
      alignItems="center"
    >
      <IconButton
        color="primary"
        size="small"
        onClick={handlePlay}
        sx={{ padding: 0 }}
      >
        {playing ? (
          <PauseCircleFilledRoundedIcon />
        ) : (
          <PlayCircleFilledRoundedIcon />
        )}
      </IconButton>
      <Box sx={{ flex: 2 }} ref={el} />
      <Typography color="text.disabled" variant="caption">
        {timer}
      </Typography>
      <Button
        onClick={toggleChangeSpeed}
        sx={{ fontSize: 12, padding: 0, borderRadius: "15px",minWidth:'10px' }}
      >
        {speedRate}X
      </Button>
    </Box>
  );
}
