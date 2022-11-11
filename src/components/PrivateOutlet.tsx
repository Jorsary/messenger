import { User } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet({
  isAuth,
}: {
  isAuth: User | null | undefined;
}) {
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}
