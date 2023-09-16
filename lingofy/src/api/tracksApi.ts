import SpotifyWebApi from "spotify-web-api-node";

class TracksApi {
  spotifyWebApi = new SpotifyWebApi({
    clientId: "409dbeb467904e7db94440c972c4a91a",
  });

  searchTracks(searchText: string, accessToken: string) {
    this.spotifyWebApi.setAccessToken(accessToken);
    return this.spotifyWebApi.searchTracks(searchText);
  }

  getRecentlyPlayed(limit: number, offset: number, accessToken: string) {
    this.spotifyWebApi.setAccessToken(accessToken);
    return this.spotifyWebApi.getMyRecentlyPlayedTracks({
      limit: limit,
      after: offset,
    });
  }
}

const tracksApi = new TracksApi();

export default tracksApi;
