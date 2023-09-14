import styled from "styled-components";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

//const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <StyledAppContainer className="user-page-wrapper">
      <div className="nav-bar">
        <Navbar />
      </div>
      <section className="content-wrapper">
        <Outlet />
      </section>
    </StyledAppContainer>
  );
}

export default App;

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100vw;
  height: 100vh;

  .nav-bar {
    display: ;
  }

  .content-wrapper {
    flex: 1;
  }
`;
