import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
interface ChatState {
  chatId: string;
  enemyUser: UserInfo | null ;
}
const initialState: ChatState = {
  chatId: "null",
  enemyUser: null
};

interface ISelectedChat {
  u: UserInfo | null;
  res: string;
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<ISelectedChat>) {
      state.enemyUser = action.payload.u;
      state.chatId = action.payload.res;
    },
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;
