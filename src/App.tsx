import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateOutlet from "./components/PrivateOutlet";
import { useAppSelector } from "./hooks/redux-hooks";
import Messenger from "./pages/Messenger";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useState } from "react";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const ligthTheme = createTheme({
  palette: {
    mode: "light",
    background:{
      default: '#edeef0'
    }
  },
});

function App() {
  const { user } = useAppSelector((state) => state.user);
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateOutlet isAuth={user} />}>
            <Route path="/" element={<Profile />}></Route>
            <Route path="/messenger" element={<Messenger />}></Route>
          </Route>
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
