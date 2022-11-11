import {
  Action, combineReducers, configureStore, ThunkAction
} from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
