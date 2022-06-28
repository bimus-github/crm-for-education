import { Message, ROLE } from "src/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Message = {
  id: "",
  message: "",
  name: "",
  school: "",
  date: 0,
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<Message>) => {
      return action.payload;
    },
  },
});

export const NoteActions = noteSlice.actions;

export default noteSlice.reducer;
