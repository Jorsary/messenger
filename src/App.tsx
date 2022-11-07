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
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import Logout from "./pages/Logout";
import { doc, getDoc } from "firebase/firestore";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const ligthTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#edeef0",
    },
  },
});

function App() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ user, loading, error }));
  }, [user, loading, error]);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PrivateOutlet isAuth={user} />}>
            <Route path="/" element={<Profile />}></Route>
            <Route path="/messenger" element={<Messenger />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
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
