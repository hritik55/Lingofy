import { useState, useEffect, KeyboardEvent } from "react";
import styled from "styled-components";
import { fetchTracks } from "../reducers/trackSearchSlice";
import { useAppSelector, useAppDispatch } from "../hooks/reducerhooks";
import { TextField, Section, Flex } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import TrackList from "../components/TrackList/TrackListContainer";
import Player from "../components/Player/Player";
import Lyrics from "../components/Lyrics";

function Jukebox() {
  const [searchText, setSearchText] = useState("");
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const { isError, isLoading, data } = useAppSelector((state) => state.tracks);
  const userInfo = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(fetchTracks({ searchText, accessToken }));
  };
  return (
    <StyledJukebox>
      <header>
        <h1>Good Evening!</h1>
        <section className="filter-search">
          <TextField.Root className="search-box">
            <TextField.Input
              value={searchText}
              size="1"
              onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search artists, songs, albums, podcasts..."
            />
            <TextField.Slot>
              <MagnifyingGlassIcon
                height={30}
                width={30}
                className="search-icon"
              />
            </TextField.Slot>
          </TextField.Root>
        </section>
      </header>
      <section className="content">
        <TrackList isLoading={isLoading} isError={isError} data={data} />
      </section>
      <Section className="songs-section">
        <Player accessToken={accessToken} />
      </Section>
      <Section>
        <Lyrics />
      </Section>
    </StyledJukebox>
  );
}

export default Jukebox;

const StyledJukebox = styled.div/*css*/ `
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100vh;
  
  header {
    h1 {
      font-size: 2rem;
    }
  }

  .content {
    flex-grow: 
  }
  

  .search-box {
    display: flex;
    gap: 1px;
    border-right: none;

    .search-icon {
      padding: 0 2px;
      border: 0.5px solid #ddeef1;
      border-left: none;
    }

    .songs-section {
      display: block;
    }

    svg {
      height 20px;
      width: 24px;
    }

    input {
      height: 1.5rem;
      width: 20rem;
    }
  }
`;
