import express, { Request, Response } from "express";
import SpotifyWebApi from "spotify-web-api-node";
import cors from "cors";
const Genius = require("genius-lyrics");
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const geniusClient = new Genius.Client();

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "409dbeb467904e7db94440c972c4a91a",
    clientSecret: "96264288101e47e28d70377688185a8c",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400);
    });
});

app.post("/login", (req: Request, res: Response) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "409dbeb467904e7db94440c972c4a91a",
    clientSecret: "96264288101e47e28d70377688185a8c",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

app.get("/lyrics", async (req: Request, res: Response) => {
  // if (req.query.track.toString()) res.status(400);
  // const song = await geniusClient.songs.search(req.query.track.toString());
  // let lyrics = await song[0].lyrics();
  // if (Boolean(lyrics)) {
  //   res.json({ lyrics });
  // } else {
  //   res.json({});
  // }
  res.json({ "Lyrics not found": "lyrics found not" });
  res.status(200);
});
export default app;
