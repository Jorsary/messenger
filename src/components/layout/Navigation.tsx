import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useAppSelector } from "../../hooks/redux-hooks";
import { NavLinks } from "../../models";
import Logo from "./Logo";

interface NavigationProps {
  links: NavLinks[];
}

const Navigation = ({ links }: NavigationProps) => {
  const { displayName } = useAppSelector((state) => state.user);

  return (
    <>
      {auth.currentUser && (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          {links
            .filter((page) => !page.auth || displayName)
            .map((page) => (
              <MenuItem
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
      )}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
        {links
          .filter((page) => !page.auth || displayName)
          .map((page) => (
            <MenuItem key={page.title}>
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

export default Navigation;
