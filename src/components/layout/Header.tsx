import {
  AppBar,
  Typography,
  Box,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import { setTheme } from "../../store/themeSlice";
import Navigation from "./Navigation";
import User from "./User";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { useParams } from "react-router-dom";
import Logo from "./Logo";

const links: NavLinks[] = [
  {
    icon: <ForumRoundedIcon />,
    title: "Мессенджер",
    auth: true,
    path: "/messenger",
  },
];
const settings = [
  {
    icon: <PersonRoundedIcon />,
    title: "Профиль",
    path: "/",
  },
  {
    icon: <ManageAccountsRoundedIcon />,
    title: "Настройки",
    path: "/settings",
  },
  {
    icon: <LogoutRoundedIcon />,
    title: "Выйти",
    path: "/logout",
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  return (
    <AppBar
      sx={{
        position: { xs: "fixed", md: "static" },
        top: "auto",
        bottom: 0,
        display: { xs: !id ? "block" : "none", md: "block" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              margin: "0 auto",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Navigation links={links} />
            <User settings={settings} />
            <IconButton onClick={() => dispatch(setTheme())}>
              <Brightness4RoundedIcon></Brightness4RoundedIcon>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
