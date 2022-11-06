import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PrivateOutlet from "./components/PrivateOutlet";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const user: boolean = false;



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route element={<PrivateOutlet isAuth={user} />}>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="signin" element={<SignIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
