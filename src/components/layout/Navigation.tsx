import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import Logo from "./Logo";
import { memo } from "react";

interface NavigationProps {
  links: NavLinks[];
}

const Navigation = ({ links }: NavigationProps) => {
  const { displayName } = useAppSelector((state) => state.user);

  return (
    <>
      <Logo bool={!auth.currentUser} />
      <Box
        sx={{ display: { xs: auth.currentUser ? "flex" : "none", md: "none" } }}
      >
        {links
          .filter((page) => !page.auth || displayName)
          .map((page) => (
            <MenuItem
              sx={{
                borderRadius: "15px",
              }}
              key={page.title}
            >
              <NavLink
                color="#fffff"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "white",
                }}
                to={page.path}
              >
                {page.icon}
              </NavLink>
            </MenuItem>
          ))}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: auth.currentUser ? "flex" : "none" },
        }}
      >
        <Logo bool={true} />
        {links
          .filter((page) => !page.auth || displayName)
          .map((page) => (
            <MenuItem
              sx={{
                borderRadius: "15px",
              }}
              key={page.title}
            >
              <NavLink
                color="#fffff"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "white",
                }}
                to={page.path}
              >
                {page.icon}
                {page.title}
              </NavLink>
            </MenuItem>
          ))}
      </Box>
    </>
  );
};

export default memo(Navigation);
