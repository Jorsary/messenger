import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Typography } from "@mui/material";


const Logo = ({bool}:{bool:boolean}) => {
  return (
    <Typography
      variant="h6"
      sx={{
        display: bool ? "flex" : 'none',
        alignItems: "center",
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <SendRoundedIcon sx={{ mr: 1 }} />
      messenger
    </Typography>
  );
};

export default Logo;
