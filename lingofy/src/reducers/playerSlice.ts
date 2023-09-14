import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrack } from "./trackSearchSlice";

type PlayerStateType = {
  currentSongs: ITrack[];
  currentIndex: number;
  isPlaying: boolean;
  activeSong: ITrack | null;
};
const initialState: PlayerStateType = {
  currentSongs: [],
  currentIndex: 0,
  isPlaying: false,
  activeSong: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action: PayloadAction<ITrack>) => {
      const songs = [...state.currentSongs, action.payload];
      state.currentSongs = songs;
      state.isPlaying = true;
      state.activeSong = action.payload;
      state.currentIndex = songs.length - 1;
    },
  },
});

export const { playSong } = playerSlice.actions;

export default playerSlice.reducer;
