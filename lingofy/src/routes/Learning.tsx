import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reducerhooks";
import {
  ArtistType,
  fetchRecentlyPlayedTracks,
} from "../reducers/trackSearchSlice";
import { fetchLyrics } from "../reducers/lyricsSlice";
import Tracks from "../components/TrackList/TrackListContainer";
import Question from "../components/LyricGame/Question";
function Learning() {
  const { isError, isLoading, data } = useAppSelector((state) => state.tracks);
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("get Recently played");
    dispatch(
      fetchRecentlyPlayedTracks({
        limit: 20,
        accessToken,
      })
    );
  }, []);

  const handleCardOnClick = (track: string, artists: ArtistType[]): void => {
    dispatch(
      fetchLyrics({
        track: track,
        artist: artists[0].name,
        isLearnMode: true,
      })
    );
  };

  return (
    <div>
      <h1>{"Lyrics"}</h1>
      {
        <Tracks
          isLoading={isLoading}
          isError={isError}
          data={data}
          isTiled
          cardOnClickHandler={handleCardOnClick}
        />
      }
      <Question />
    </div>
  );
}

export default Learning;
