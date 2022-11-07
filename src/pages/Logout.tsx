import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { removeUser } from "../store/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  signOut(auth);
  dispatch(removeUser);
  return (<></>)
};

export default Logout;
