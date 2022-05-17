import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";
import teachersSlice from "./features/teachers";
import usersSlice from "./features/users";
import schoolSlice from "./features/school";
import groupSlice from "./features/group";

export const store = configureStore({
  reducer: {
    userSlice,
    teachersSlice,
    schoolSlice,
    usersSlice,
    groupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
