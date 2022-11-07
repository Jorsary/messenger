import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";


interface UserState {
  user: boolean;
  // user: User | null | undefined ;
  loading: boolean;
  error: Error | undefined;
  userInfo: any
}

const initialState: UserState = {
  user: true,
  loading: false,
  error:undefined,
  userInfo: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser(state, action: PayloadAction<any>) {
      state.user = action.payload.user;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    removeUser(state) {
      state.user = false;
      state.loading = false;
      state.error = undefined;
    },

  },
});

export const { getUser,removeUser } = userSlice.actions;

export default userSlice.reducer;
