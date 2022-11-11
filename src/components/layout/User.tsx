import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
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
      {auth.currentUser && (
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 1 }}>
            <Avatar
              alt={`${displayName}`}
              src={`${photoURL}`}
              sx={{ bgcolor: stringToColor(`${displayName}`) }}
            />
            <Typography
              sx={{
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
              }}
            >
              {displayName}
            </Typography>
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
                <Typography textAlign="center">{setting.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </>
  );
};

export default User;
