import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from 'src/models';

interface InitialStateType {
  [key: string]: Group;
}

const initialState: InitialStateType = {};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addMultipleGroups: (state, action: PayloadAction<Group[]>) => {
      const groups = action.payload;

      groups.forEach((group) => {
        state[group.id] = group;
      });
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      const group = action.payload;

      state[group.id] = group;
    },
  },
});

export const GroupsSliceActions = groupsSlice.actions;

export default groupsSlice.reducer;
