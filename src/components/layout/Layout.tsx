import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
