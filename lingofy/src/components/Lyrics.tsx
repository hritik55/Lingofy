import { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../hooks/reducerhooks";
import { fetchLyrics } from "../reducers/lyricsSlice";
function Lyrics() {
  const player = useAppSelector((state) => state.player);
  const { isError, isLoading, songLyrics } = useAppSelector(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.activeSong]);
  return (
    <StyledLyricsViewer>
      {songLyrics ? (
        <div dangerouslySetInnerHTML={{ __html: songLyrics }}></div>
      ) : (
        <p>{"Lyrics not available for this song."}</p>
      )}
    </StyledLyricsViewer>
  );
}

export default Lyrics;

const StyledLyricsViewer = styled.section/*css*/ `
  .word:hover {
    text-decoration: underline;
  }
`;
