import MenuIcon from "@mui/icons-material/Menu";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import Logo from "./Logo";

interface NavigationProps {
  links: NavLinks[];
}

const Navigation = ({ links }: NavigationProps) => {
  const { displayName } = useAppSelector((state) => state.user);

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
      {auth.currentUser && (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          
          {links
            .filter((page) => !page.auth || displayName)
            .map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => handleFollowToLink(page.path)}
              >
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  textAlign="center"
                >
                  {page.icon}
                </Typography>
              </MenuItem>
            ))}
        </Box>
      )}
       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
       <Logo/>
        {links
          .filter((page) => !page.auth || displayName)
          .map((page) => (
            <MenuItem
              key={page.title}
              onClick={() => handleFollowToLink(page.path)}
            >
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                textAlign="center"
              >
                {page.icon}
                {page.title}
              </Typography>
            </MenuItem>
          ))}
      </Box> 
    </>
  );
};

export default Navigation;
