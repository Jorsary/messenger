import {
  Backdrop,
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import {
  onDisconnect,
  onValue,
  ref as realRef,
  serverTimestamp,
  set,push
} from "firebase/database";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ImagePopup from "./components/messenger/ImagePopup";
import PrivateOutlet from "./components/PrivateOutlet";
import { auth, db, realdb } from "./firebase/firebase";
import { useAppSelector } from "./hooks/redux-hooks";
import Logout from "./pages/Logout";
import Messenger from "./pages/Messenger";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UserSettings from "./pages/ProfileSettings";
import SignIn from "./pages/SignIn";
import { setLoading, setUserInfo } from "./store/userSlice";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#272727",
    },
  },
});

export const ligthTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#edeef0",
    },
    secondary: {
      main: "#edeef0",
    },
  },
});

function App() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const [user, loading, error] = useAuthState(auth);
  const { loadingUser, uid } = useAppSelector((state) => state.user);

  const statusRef = realRef(realdb, `state/${uid}`)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading({ loading, error }));
    dispatch(setUserInfo({ ...user }));
  }, [user, loading, error]);


  useEffect(() => {
    const unsub = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (uid && !data.state) {
        set(statusRef, {
          state: true,
        });
      }
    });
   
    return () => {
      unsub();
    };
    
  }, [uid]);

  if (uid) {
    onDisconnect(statusRef).set({
      state: false,
      time: serverTimestamp(),
    });
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <CssBaseline />
      <ImagePopup />
      {loadingUser ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateOutlet isAuth={user} />}>
              <Route path="/" element={<Profile />}></Route>
              <Route path="/:id" element={<Profile />}></Route>
              <Route path="/messenger/" element={<Messenger />}></Route>
              <Route path="/messenger/:chatid" element={<Messenger />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/settings" element={<UserSettings />}></Route>
            </Route>
            <Route path="signin" element={<SignIn />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      )}
    </ThemeProvider>
  );
}

export default App;
