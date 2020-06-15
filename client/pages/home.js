import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const Button = styled.button`
  background; ${(props) => (props.primary ? "black" : "white")};
  color: ${(props) => (props.primary ? "white" : "black")};
`;

function Home() {
  return (
    <div style={{ height: "100%" }}>
      <Sidebar />
    </div>
  );
}

export default Home;
