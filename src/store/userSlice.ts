import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { UserInfo } from "../model";


interface UserState {
  currentUser: User | null | undefined ;
  loadingUser: boolean;
  error: Error | undefined;
}

const initialState: UserState = {
  currentUser: null,
  loadingUser: false,
  error:undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.currentUser = action.payload.user;
      state.loadingUser = action.payload.loading;
      state.error = action.payload.error;
    },
    removeUser(state) {
      state.currentUser = null;
      state.loadingUser = false;
      state.error = undefined;
    },

  },
});

export const { setUser,removeUser } = userSlice.actions;

export default userSlice.reducer;
