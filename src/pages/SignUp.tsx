import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";

const SignUp = () => {
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }
  return <div>SignUp</div>;
};

export default SignUp;
