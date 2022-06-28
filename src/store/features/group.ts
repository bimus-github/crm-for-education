import { Group, ROLE } from "src/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Group = {
  id: "",
  name: "",
  school: "",
  language: "",
  schedule: {
    days: [],
    time: {
      start: "",
      end: "",
    },
  },
  teacher: {
    user: "",
    monthlyBillPercentage: "",
  },
  startedTime: "",
  price: 0,
  room: "",
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<Group>) => {
      return action.payload;
    },
  },
});

export const GroupActions = groupSlice.actions;

export default groupSlice.reducer;
