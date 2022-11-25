import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
interface ChatState {
  chatId: string;
  enemyUser: UserInfo | null;
  userPresence: {
    state:boolean;
    time?: number
  }
}
const initialState: ChatState = {
  chatId: "null",
  enemyUser: null,
  userPresence : {
    state:false,
    time: 0
  }
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
