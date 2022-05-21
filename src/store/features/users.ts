import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models';

interface InitialStateType {
  [key: string]: User;
}

const initialState: InitialStateType = {};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addMultipleUsers: (state, action: PayloadAction<User[]>) => {
      const users = action.payload;

      users.forEach((user) => {
        state[user.id] = user;
      });
    },
    addUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;

      state[user.id] = user;
    },
    removeUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;

      delete state[user.id];
    },
  },
});

export const UserSliceActions = usersSlice.actions;

export default usersSlice.reducer;
