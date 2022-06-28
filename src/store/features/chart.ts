import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartLine } from "src/models";

const initialState: ChartLine = {
  id: "",
  date: Number(),
  numberOfStudents: "",
  school: "",
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChart: (state, action: PayloadAction<ChartLine>) => {
      return action.payload;
    },
  },
});

export const ChartAction = chartSlice.actions;

export default chartSlice.reducer;
