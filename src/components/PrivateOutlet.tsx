import { User } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateOutlet({ isAuth }: { isAuth: User | null | undefined}) {
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}