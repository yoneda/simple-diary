import React, { Fragment, useEffect } from "react";
import { StoreProvider, useStoreState, useStoreActions } from "easy-peasy";
import { Router } from "@reach/router";
import { Reset } from "styled-reset";
import styled from "styled-components";
import store from "../store";
import Login from "./Login";
import Signup from "./Signup";
import V0 from "./V0";

const Box = styled.div`
  height: 100%;
`;

function Authed() {
  return (
    <Fragment>
      <Router>
        <Login path="/login" />
        <Signup path="/signup" />
        <V0 path="/" />
      </Router>
    </Fragment>
  );
}

function NotAuthed() {
  return (
    <Router>
      <Login path="/login" />
      <Signup path="/signup" />
    </Router>
  );
}

function Render() {
  const revisit = useStoreActions((actions) => actions.app.revisit);
  const isLoggedIn = useStoreState((state) => state.app.isLoggedIn);
  useEffect(() => {
    revisit();
  }, []);
  return <Authed />;
}

function App() {
  return (
    <Box>
      <Reset />
      <StoreProvider store={store}>
        <Render />
      </StoreProvider>
    </Box>
  );
}

export default App;
