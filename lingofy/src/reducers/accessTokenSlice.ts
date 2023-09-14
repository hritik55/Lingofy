import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TokenState {
  value: string;
}

const initialState = {
  value: "",
} as TokenState;

export const tokenSlice = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    addAccessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { addAccessToken } = tokenSlice.actions;

export const selectAccessToken = (state: RootState) => state.accessToken.value;

export default tokenSlice.reducer;
