import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {

  return (
    <>
      <Header />
      <Box component="main">
        <Toolbar/>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;