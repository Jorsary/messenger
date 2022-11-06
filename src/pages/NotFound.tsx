import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: '75vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Такой страницы не существует
      </Typography>
    </Box>
  );
};

export default NotFound;
