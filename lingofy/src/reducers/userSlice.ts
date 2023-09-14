import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  id: string;
  name?: string;
  email: string;
  imageUri?: string;
}
type UserResponse = {
  id: string;
  name?: string;
  email: string;
  imageUri?: string;
};

const initialState = {
  id: "",
  name: "",
  email: "",
  imageUri: "",
} as User;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action: PayloadAction<UserResponse>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.imageUri = action.payload.imageUri;
    },
  },
});

export const { getUserInfo } = userSlice.actions;

export const selectUserInfo = (state: RootState) => state.user;

export default userSlice.reducer;
