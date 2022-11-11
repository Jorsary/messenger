import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  loadingUser: boolean;
  error: Error | undefined;
  displayName: string;
  photoURL: string | null;
  uid: string;
}

const initialState: UserState = {
  loadingUser: false,
  error: undefined,
  displayName: "",
  photoURL: null,
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.loadingUser = action.payload.loading;
      state.error = action.payload.error;
    },
    removeUser(state) {
      state.loadingUser = false;
      state.error = undefined;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
  },
});

export const { setUser, removeUser, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
