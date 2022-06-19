import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "src/models";

interface InitialStateType {
  [key: string]: Message;
}

const initialState: InitialStateType = {};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addMultipleNotes: (state, action: PayloadAction<Message[]>) => {
      const notes = action.payload;

      notes.forEach((note) => {
        state[note.id] = note;
      });
    },
    addNote: (state, action: PayloadAction<Message>) => {
      const note = action.payload;

      state[note.id] = note;
    },
    deleteNote: (state, action: PayloadAction<Message>) => {
      const note = action.payload;

      delete state[note.id];
    },
  },
});

export const NotesSliceActions = notesSlice.actions;

export default notesSlice.reducer;
