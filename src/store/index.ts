import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";
import teachersSlice from "./features/teachers";
import usersSlice from "./features/users";
import schoolSlice from "./features/school";
import groupSlice from "./features/group";
import groupsSlice from "./features/groups";
import noteSlice from "./features/message";
import notesSlice from "./features/messages";
import chartSlice from "./features/chart";
import chartsSlice from "./features/charts";

export const store = configureStore({
  reducer: {
    userSlice,
    teachersSlice,
    schoolSlice,
    usersSlice,
    groupSlice,
    groupsSlice,
    noteSlice,
    notesSlice,
    chartSlice,
    chartsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
