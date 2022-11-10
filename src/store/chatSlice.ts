import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
interface ChatState {
  chatId: string;
  enemyUser: UserInfo | null;
  chatOpened: boolean;
}
const initialState: ChatState = {
  chatId: "null",
  enemyUser: null,
  chatOpened: true,
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
      state.chatOpened = false;
    },
    openChat(state) {
      state.chatOpened = !state.chatOpened;
    },
  },
});

export const { changeUser, openChat } = chatSlice.actions;

export default chatSlice.reducer;
