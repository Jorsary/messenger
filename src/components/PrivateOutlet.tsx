import { Outlet, Navigate } from "react-router-dom";

export default function PrivateOutlet({ isAuth }: { isAuth: boolean }) {
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}