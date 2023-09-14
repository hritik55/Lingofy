import { useState, useEffect } from "react";
import styled from "styled-components";
import { playSong } from "../../reducers/playerSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { ITrack } from "../../reducers/trackSearchSlice";
import SpotifyPlayer from "react-spotify-web-playback";

function Player({ accessToken }: { accessToken: string }) {
  const [currentSong, setCurrentSong] = useState<ITrack | null>(null);
  const [play, setPlay] = useState(false);
  const player = useAppSelector((state) => state.player);

  useEffect(() => {
    setCurrentSong(player.activeSong);
  }, [player.activeSong]);
  return (
    <StyledPlayer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={() => {
          if (!player.isPlaying) setPlay(false);
        }}
        play={true}
        uris={currentSong?.uri ? [currentSong.uri] : []}
      />
    </StyledPlayer>
  );
}

export default Player;

const StyledPlayer = styled.div`
  display: flex;
  align-items: center;
`;
