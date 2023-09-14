import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/reducerhooks";
import { addAccessToken } from "../reducers/accessTokenSlice";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=409dbeb467904e7db94440c972c4a91a&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function Login() {
  const accessToken = useAuth();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      dispatch(addAccessToken(accessToken));
      navigate("/user/dashboard");
    }
  }, [accessToken]);
  return (
    <StyledLogin>
      <span className="link-button">
        <a href={AUTH_URL}>Login with Spotify</a>
      </span>
    </StyledLogin>
  );
}

export default Login;

const StyledLogin = styled.div`
  display: flex;
  height: 100vh;
  background-color: #191414;
  align-items: center;
  justify-content: center;

  .link-button {
    display: block;
    background-color: #1db954;
    padding: 1rem 2rem;
    font-family: Helvetica, sans-serif;
    font-weight: 500;
    border-radius: 100px;

    a {
      color: #ffffff;
      text-decoration: none;
    }

    &:hover {
      background-color: transparent;
      border: 2px solid #1db954;

      a {
        color: #1db954;
      }
    }
  }
`;
