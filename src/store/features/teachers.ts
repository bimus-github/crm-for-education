import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models';

const initialState: User[] = [];

export const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachers: (state, action: PayloadAction<User[]>) => {
      const teachers = action.payload;

      teachers.forEach((teacher) => {
        state.push(teacher);
      });
    },
    addTeacher: (state, action: PayloadAction<User>) => {
      const teacher = action.payload;

      state.push(teacher);
    },
  },
});

export const TeachersSliceActions = teachersSlice.actions;

export default teachersSlice.reducer;
