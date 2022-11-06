import MenuIcon from "@mui/icons-material/Menu";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton, Link } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { NavLinks } from "../../models";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  links: NavLinks[];
}

const Navigation = ({ links }: NavigationProps) => {
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
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
          {links.map((page) => (
            <MenuItem key={page.title} onClick={() => handleFollowToLink(page.path)}>
              <Typography textAlign="center">{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <SendRoundedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr:'-32px',
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        messenger
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {links.map((page) => (
          <Button
            onClick={() => handleFollowToLink(page.path)}
            sx={{ my: 2, color: "white", display: "block" }}
            href={page.path}
          >
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Navigation;
