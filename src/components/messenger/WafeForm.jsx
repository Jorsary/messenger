import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Box, IconButton, Typography } from "@mui/material";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";

export default function Player(props) {
  console.log(props.props);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [dlina, setDlina] = useState("");

  const el = useRef();

  const secondInClocks = (time) => {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) - hours * 60;
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const glina = secondInClocks(duration);
    setDlina(
      `${Math.trunc(glina.minutes) < 10 ? 0 : ""}${glina.minutes}:${
        Math.trunc(glina.seconds) < 10 ? 0 : ""
      }${Math.trunc(glina.seconds)}`
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
      backend: "WebAudio",
      height: 20,
      progressColor: "#71aaeb",
      responsive: true,
      waveColor: "#4a6687",
      cursorColor: "transparent",
      hideScrollbar: true,
    });
    _wavesurfer.load(props.voice);

    setWavesurfer(_wavesurfer);

    _wavesurfer.on("ready", function () {
      setDuration(_wavesurfer?.getDuration());
    });

    _wavesurfer.on("audioprocess", function () {
      setDuration(_wavesurfer?.getDuration() - _wavesurfer?.getCurrentTime());
    });

    _wavesurfer.on("finish", function () {
      _wavesurfer?.stop();
      setPlaying(false);
      setDuration(_wavesurfer?.getDuration());
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

  return (
    <Box gap="10px" display="flex" alignItems="center">
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
      <div style={{ flexGrow: 1 }} ref={el} />
      <Typography color="text.disabled" variant="caption">
        {dlina}
      </Typography>
    </Box>
  );
}
