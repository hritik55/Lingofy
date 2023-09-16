import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import tracksApi from "../api/tracksApi";

type AlbumType = {
  album_type: string;
  album_art: string;
  name: string;
  release_date: string;
  uri: string;
  id: string;
};

export type ArtistType = {
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  width: number;
  url: string;
};

export interface ITrack {
  id: string;
  album: AlbumType;
  artists: ArtistType[];
  name: string;
  image: Image;
  uri: string;
}

type TrackInitialStateType = {
  isLoading: boolean;
  isError: boolean;
  data: ITrack[];
};
const initialState = {
  isLoading: false,
  isError: false,
  data: [],
} as TrackInitialStateType;

type SearchPayload = {
  searchText: string;
  accessToken: string;
};
type SearchRecentPlayedPayload = {
  limit: number;
  offset?: number;
  accessToken: string;
};

export const fetchTracks = createAsyncThunk(
  "tracks/fetchTracksStatus",
  async (payload: SearchPayload) => {
    const response = await tracksApi.searchTracks(
      payload.searchText,
      payload.accessToken
    );
    return response.body.tracks?.items;
  }
);

export const fetchRecentlyPlayedTracks = createAsyncThunk(
  "tracks/fetchRecentlyPlayedStatus",
  async (payload: SearchRecentPlayedPayload) => {
    const response = await tracksApi.getRecentlyPlayed(
      payload.limit,
      payload.offset ? payload.offset : 0,
      payload.accessToken
    );
    return response.body.items;
  }
);

export const tracksSlice = createSlice({
  name: "searchTracksList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTracks.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload?.map((track) => {
        return {
          name: track.name,
          album: track.album,
          artists: track.artists,
          image: track.album.images
            ? track.album.images.reduce((smallest, image) => {
                if (image?.height < smallest?.height) return image;
                return smallest;
              }, track.album.images[0])
            : "",
          uri: track.uri,
          id: track.id,
        };
      });
    });
    builder.addCase(fetchRecentlyPlayedTracks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecentlyPlayedTracks.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchRecentlyPlayedTracks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload?.map((track) => {
        return {
          name: track.track.name,
          album: track.track.album,
          artists: track.track.artists,
          image: track.track.album.images
            ? track.track.album.images.reduce((smallest, image) => {
                if (image?.height < smallest?.height) return image;
                return smallest;
              }, track.track.album.images[0])
            : "",
          uri: track.track.uri,
          id: track.track.id,
        };
      });
    });
  },
});

export default tracksSlice.reducer;
