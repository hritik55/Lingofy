import SpotifyWebApi from "spotify-web-api-node";

class TracksApi {
  spotifyWebApi = new SpotifyWebApi({
    clientId: "409dbeb467904e7db94440c972c4a91a",
  });

  searchTracks(searchText: string, accessToken: string) {
    this.spotifyWebApi.setAccessToken(accessToken);
    return this.spotifyWebApi.searchTracks(searchText);
  }
}

const tracksApi = new TracksApi();

export default tracksApi;
