import MenuIcon from "@mui/icons-material/Menu";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";

interface NavigationProps {
  links: NavLinks[];
}

const Navigation = ({ links }: NavigationProps) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const push = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleFollowToLink = (link: string) => {
    push(link);
    setAnchorElNav(null);
  };

  return (
    <>
      {currentUser && <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {links
            .filter((page) => !page.auth || currentUser)
            .map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => handleFollowToLink(page.path)}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </Box>}
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: "-32px",
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontSize: 15,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".2rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <SendRoundedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        messenger
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          onClick={() => push("/")}
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <SendRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          messenger
        </Typography>
        {links
          .filter((page) => !page.auth || currentUser)
          .map((page) => (
            <MenuItem
              key={page.title}
              onClick={() => handleFollowToLink(page.path)}
            >
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
      </Box>
    </>
  );
};

export default Navigation;
