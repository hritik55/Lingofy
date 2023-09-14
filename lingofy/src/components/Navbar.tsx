import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Avatar, Flex } from "@radix-ui/themes";
import { HomeIcon, TargetIcon } from "@radix-ui/react-icons";
import { useAppSelector, useAppDispatch } from "../hooks/reducerhooks";
import Utility from "../utils/utilityfunctions";
import { Link } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { getUserInfo } from "../reducers/userSlice";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "409dbeb467904e7db94440c972c4a91a",
});
function Navbar() {
  const userInfo = useAppSelector((state) => state.user);
  const accessToken = useAppSelector((state) => state.accessToken.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
    spotifyWebApi.setAccessToken(accessToken);
    spotifyWebApi
      .getMe()
      .then((res) => {
        const user = res.body;
        dispatch(
          getUserInfo({
            id: user.id,
            name: user.display_name,
            email: user.email,
            imageUri: user.images[1]?.url,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  return (
    <StyledNav>
      <Box className="avatar-container">
        <Avatar
          size="3"
          src={userInfo.imageUri}
          fallback={Utility.getUserInitials(userInfo.name)}
        />
      </Box>
      <Link to="dashboard" className="link">
        <HomeIcon width={25} />
      </Link>
      <Link to="practice" className="link">
        <TargetIcon width={25} />
      </Link>
    </StyledNav>
  );
}

export default Navbar;

const StyledNav = styled.nav`
    background: background: rgb(25,20,20);
    background: linear-gradient(360deg, rgba(25,20,20,1) 0%, rgba(81,75,88,0.5) 12%); 
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 2rem 0.5rem 2rem; 
    

    .avatar-container {
        display: none;
        img {
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    .link {
        color: white;
        border-top: 2px solid white;
        padding-top: 0.5rem;
        min-width: 2rem;
        text-align: center;
        svg {
            width: 25px;
            height: 25px;
        }
    }
    
`;
