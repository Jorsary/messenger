import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateOutlet from "./components/PrivateOutlet";
import { auth } from "./firebase/firebase";
import { useAppSelector } from "./hooks/redux-hooks";
import Logout from "./pages/Logout";
import Messenger from "./pages/Messenger";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UserSettings from "./pages/ProfileSettings";
import SignIn from "./pages/SignIn";
import { setUser, setUserInfo } from "./store/userSlice";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

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
    dispatch(setUserInfo({ ...user }));
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
            <Route path="/settings" element={<UserSettings />}></Route>
          </Route>
          <Route path="signin" element={<SignIn />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
