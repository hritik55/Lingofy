import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reducerhooks";
import { fetchLyrics } from "../reducers/lyricsSlice";
function Lyrics() {
  const player = useAppSelector((state) => state.player);
  const { isError, isLoading, allLyrics } = useAppSelector(
    (state) => state.lyrics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchLyrics({
        track: player.activeSong?.name,
        artist: player.activeSong?.artists[0].name,
      })
    );
  }, [player.activeSong]);
  return <div></div>;
}

export default Lyrics;
