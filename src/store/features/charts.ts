import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChartLine } from "src/models";

interface InitialStateType {
  [key: string]: ChartLine;
}

const initialState: InitialStateType = {};

export const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    addMultipleCharts: (state, action: PayloadAction<ChartLine[]>) => {
      const charts = action.payload;

      charts.forEach((chart) => {
        state[chart.id] = chart;
      });
    },
    addChart: (state, action: PayloadAction<ChartLine>) => {
      const chart = action.payload;

      state[chart.id] = chart;
    },
    deleteChart: (state, action: PayloadAction<ChartLine>) => {
      const chart = action.payload;

      delete state[chart.id];
    },
  },
});

export const ChartsSliceActions = chartsSlice.actions;

export default chartsSlice.reducer;
