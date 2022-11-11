import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import { setTheme } from "../../store/themeSlice";
import Navigation from "./Navigation";
import User from "./User";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

const links: NavLinks[] = [
  {
    icon: <ForumRoundedIcon/>,
    title: "Мессенджер",
    auth: true,
    path: "/messenger",
  },
];
const settings = [
  {
    icon: <PersonRoundedIcon/>,
    title: "Профиль",
    path: "/",
  },
  {
    icon: <ManageAccountsRoundedIcon/>,
    title: "Настройки",
    path: "/settings",
  },
  {
    icon: <LogoutRoundedIcon/>,
    title: "Выйти",
    path: "/logout",
  },
];

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Navigation links={links} />
          <Box sx={{ ml: "auto", display: "flex", gap: "2%" }}>
            <IconButton onClick={() => dispatch(setTheme())}>
              <Brightness4RoundedIcon></Brightness4RoundedIcon>
            </IconButton>
            <User settings={settings} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
