import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { changeUser } from "../store/chatSlice";
import { removeUser } from "../store/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  signOut(auth);
  dispatch(removeUser);
  dispatch(changeUser({u:null,res:''}))
  return (<></>)
};

export default Logout;
