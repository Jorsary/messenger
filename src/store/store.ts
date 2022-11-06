import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';



const rootReducer = combineReducers({
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
