import axios from "axios";

class LyricsApi {
  getLyrics(track?: string, artist?: string) {
    return axios.get("http://localhost:3001/lyrics", {
      params: {
        track,
        artist,
      },
    });
  }
}

const lyricsApi = new LyricsApi();

export default lyricsApi;
