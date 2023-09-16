import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import lyricsApi from "../api/lyricsApi";

type LyricSearchPayload = {
  track?: string;
  artist?: string;
  isLearnMode?: boolean | false;
};

type Lyrics = {
  trackId: string;
  artist: string;
  trackName: string;
  lyrics: string;
};

const initialState: {
  songLyrics: ``;
  testStanzas: Lyrics[];
  isLoading: boolean;
  isError: boolean;
} = {
  songLyrics: "",
  testStanzas: [],
  isLoading: false,
  isError: false,
};
export const fetchLyrics = createAsyncThunk(
  "tracks/fetchLyricsStatus",
  async (payload: LyricSearchPayload) => {
    if (!payload.track) return;
    const response = await lyricsApi.getLyrics(payload.track, payload.artist);
    return response.data.lyrics;
  }
);

export const lyricsSlice = createSlice({
  name: "searchLyrics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLyrics.pending, (state) => {
      state.songLyrics = "";
      state.isLoading = true;
    });
    builder.addCase(fetchLyrics.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchLyrics.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      const brokenStanzas = action.payload.split("\n\n");
      if (action.meta.arg.isLearnMode) {
        console.log(brokenStanzas);
        state.testStanzas = brokenStanzas;
      } else {
        const finalLyrics = brokenStanzas.map((stanza: string) => {
          const brokenLines = stanza.split("\n");
          let lyricsHtml = "";
          brokenLines.map((line: string) => {
            const words = line.split(" ").reduce((initial, word) => {
              return (initial += `<span class="word">${word}</span>${" "}`);
            }, "");
            lyricsHtml += `<p>${words}</p>`;
          });
          lyricsHtml += "<br>";
          return lyricsHtml;
        });
        state.songLyrics = finalLyrics.join("");
      }
    });
  },
});

export default lyricsSlice.reducer;
