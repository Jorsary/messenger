import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useState,memo } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { SettingsLinks } from "../../models";
import stringToColor from "../../utlis/stringToColor";

interface UserProps {
  settings: SettingsLinks[];
}

const User = ({ settings }: UserProps) => {
  const { displayName, photoURL } = useAppSelector((state) => state.user);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const push = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFollowToLink = (s: string) => {
    push(s);
    setAnchorElUser(null);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: auth.currentUser ? "block" : "none" },
        }}
      >
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 1 }}>
          <Avatar
            src={`${photoURL}`}
            sx={{ bgcolor: stringToColor(`${displayName}`)}}
          />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.title}
              onClick={() => handleFollowToLink(setting.path)}
              
            >
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                textAlign="center"
              >
                {setting.icon}
                {setting.title}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{ display: { xs: auth.currentUser ? "flex" : "none", md: "none" } }}
      >
        {settings.map((setting) => (
          <MenuItem
            sx={{
              borderRadius:'15px'
            }}
            key={setting.title}
            onClick={() => handleFollowToLink(setting.path)}
          >
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              textAlign="center"
            >
              {setting.icon}
            </Typography>
          </MenuItem>
        ))}
      </Box>
    </>
  );
};

export default memo(User);
