import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  createTheme,
  ThemeProvider,
  IconButton
} from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <MailOutlinedIcon sx={{ display: "flex", mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          MESSENGER
        </Typography>
        <IconButton><DarkModeIcon/></IconButton>
        <Avatar alt="Remy Sharp" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
