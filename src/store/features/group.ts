import { Group, ROLE } from "src/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Group = {
  id: "",
  name: "",
  school: "",
  language: "",
  monthlyBill: {},
  schedule: {
    days: {},
    time: {
      start: "",
      end: "",
    },
  },
  students: [],
  teacher: {
    user: "",
    monthlyBillPercentage: "",
  },
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
