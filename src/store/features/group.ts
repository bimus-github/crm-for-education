import { Group, ROLE } from "src/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Days } from "src/models";

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
  paid: 0,
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
