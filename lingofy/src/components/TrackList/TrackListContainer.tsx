import TrackItem from "./TrackItem";
import styled from "styled-components";
import { isEmpty } from "lodash";
import { ITrack } from "../../reducers/trackSearchSlice";
import { useAppSelector } from "../../hooks/reducerhooks";

type TrackListProps = {
  data: ITrack[];
  isLoading: boolean;
  isError: boolean;
};
function TrackListContainer({ data, isLoading, isError }: TrackListProps) {
  const player = useAppSelector((state) => state.player);

  if (isError) return <p>{"Error"}</p>;
  return (
    <StyledTracklist>
      {isLoading ? (
        <p>{"Loading..."}</p>
      ) : !isEmpty(data) ? (
        data.map((track) => {
          return (
            <TrackItem
              key={`${track.name}-${track.id}`}
              track={track}
              isPlaying={player.activeSong?.id === track.id}
            />
          );
        })
      ) : (
        <></>
      )}
    </StyledTracklist>
  );
}

export default TrackListContainer;

const StyledTracklist = styled.section`
  display: flex;
  min-height: 90%;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
`;
