import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lyricsApi from "../api/lyricsApi";

type LyricSearchPayload = {
  track?: string;
  artist?: string;
};

type Lyrics = {
  trackId: string;
  artist: string;
  trackName: string;
  lyrics: string;
};

const initialState: {
  allLyrics: Lyrics[];
  isLoading: boolean;
  isError: boolean;
} = {
  allLyrics: [],
  isLoading: false,
  isError: false,
};
export const fetchLyrics = createAsyncThunk(
  "tracks/fetchLyricsStatus",
  async (payload: LyricSearchPayload) => {
    const response = await lyricsApi.getLyrics(payload.track, payload.artist);
    return response;
  }
);

export const lyricsSlice = createSlice({
  name: "searchLyrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLyrics.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLyrics.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchLyrics.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export default lyricsSlice.reducer;
