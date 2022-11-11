import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { SettingsLinks } from "../../models";
import stringToColor from "../../utlis/stringToColor";

interface UserProps {
  settings: SettingsLinks[];
}

const User = ({ settings }: UserProps) => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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

  if (currentUser && currentUser.displayName) {
    return (
      <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={`${currentUser?.displayName}`}
              src={`${currentUser?.photoURL}`}
              sx={{bgcolor:stringToColor(`${currentUser?.displayName}`)}}
            />
          </IconButton>
          {auth.currentUser?.displayName}
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
    );
  } else {
    return <></>;
  }
};

export default User;
 