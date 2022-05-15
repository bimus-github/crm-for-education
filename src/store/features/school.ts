import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { School } from 'src/models';

const initialState: School = {
  id: '',
  logo: '',
  name: '',
  teachers: [],
  admins: [],
};

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSchool: (state, action: PayloadAction<School>) => {
      const school = action.payload;

      return school;
    },
    resetSchool: () => initialState,
  },
});

export const SchoolSliceActions = schoolSlice.actions;

export default schoolSlice.reducer;
