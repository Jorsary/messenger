import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
interface ChatState {
  chatId: string;
  enemyUser: UserInfo | null;
  userPresence: any
}
const initialState: ChatState = {
  chatId: "null",
  enemyUser: null,
  userPresence : {}
};

interface ISelectedChat {
  u: UserInfo | null;
  res: string;
  userPresence?: any;
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<ISelectedChat>) {
      state.enemyUser = action.payload.u;
      state.chatId = action.payload.res;
      state.userPresence = action.payload.userPresence

    },

  },
});

export const { changeUser } = chatSlice.actions;
export default chatSlice.reducer;
