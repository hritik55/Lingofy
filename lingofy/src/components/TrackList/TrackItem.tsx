import { useEffect } from "react";
import styled from "styled-components";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";
import { ITrack } from "../../reducers/trackSearchSlice";
import { playSong } from "../../reducers/playerSlice";
import { useAppDispatch } from "../../hooks/reducerhooks";

function TrackItem({
  track,
  isPlaying,
}: {
  track: ITrack;
  isPlaying: boolean;
}) {
  const { name, image, artists, album, uri, id } = track;
  const dispatch = useAppDispatch();

  const handlePlayPause = () => {
    //if (!isPlaying) {
    dispatch(playSong(track));
    //}
  };
  return (
    <StyledTrackItem>
      <img src={image.url} />
      <section className="title-artist">
        <p className="title">{name}</p>
        <p className="artist">
          {artists.reduce((artistName, artist) => {
            if (artistName === "") return artist.name;
            return `${artistName}, ${artist.name}`;
          }, "")}
        </p>
      </section>
      <button onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </StyledTrackItem>
  );
}

export default TrackItem;

const StyledTrackItem = styled.div`
  display: flex;
  border: 1px solid white;

  .title-artist {
    display: flex;
    flex-direction: column;
    line-height: 2;
    .title {
    }

    .artist {
      font-size: 0.8rem;
      color: #787878;
    }
  }
`;
