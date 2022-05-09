import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user';
import teachersSlice from './features/teachers';

export const store = configureStore({
  reducer: {
    userSlice,
    teachersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
