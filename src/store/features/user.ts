import { CASE, ROLE, User } from "src/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  role: ROLE.TEACHER,
  about: "",
  img: "",
  school: "",
  startedTime: "",
  paid: 0,
  case: CASE.existent,
  deletedTime: "",
  group: "",
  teacher: "",
  sale: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
  },
});

export const UserActions = userSlice.actions;

export default userSlice.reducer;
