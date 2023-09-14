import { configureStore } from "@reduxjs/toolkit";
import accessTokenReducer from "./reducers/accessTokenSlice";
import userReducer from "./reducers/userSlice";
import tracksReducer from "./reducers/trackSearchSlice";
import playerReducer from "./reducers/playerSlice";
import lyricsReducer from "./reducers/lyricsSlice";

const store = configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    user: userReducer,
    tracks: tracksReducer,
    player: playerReducer,
    lyrics: lyricsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
