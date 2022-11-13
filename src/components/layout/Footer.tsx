import { Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".2rem",
        fontSize: 12,
        display: {xs:'none',md:'block'}
      }}
    >
      {"© "}
      {new Date().getFullYear()}
      {". "}
      <Link color="inherit" href="https://github.com/Jorsary">
        Eduard Kluchnikov
      </Link>
    </Typography>
  );
};

export default Footer;
