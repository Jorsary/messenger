import { DarkMode } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import { setTheme } from "../../store/themeSlice";
import Navigation from "./Navigation";
import User from "./User";

const links: NavLinks[] = [
  {
    title: "Профиль",
    auth: true,
    path: "/",
  },
  {
    title: "Мессенджер",
    auth: true,
    path: "/messenger",
  },
];
const settings = [
  {
    title: "Профиль",
    path: "/",
  },
  {
    title: "Настройки",
    path: "/settings",
  },
  {
    title: "Выйти",
    path: "/logout",
  },
];

const Header = () => {
  const dispatch = useAppDispatch()
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Navigation links={links} />
          <Box sx={{ ml: "auto", display: "flex",gap:'2%' }}>
            <IconButton onClick={()=>dispatch(setTheme())}>
              <DarkMode></DarkMode>
            </IconButton>
            <User settings={settings} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
