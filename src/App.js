import React from "react";
import { Container } from "react-bootstrap";
import Todos from "./Containers/Todos";

import "./App.css";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        paddingTop: "5vh",
        paddingLeft: "25vw",
        paddingRight: "25vw"
      }}
    >
      <Container>
        <Todos />
      </Container>
    </div>
  );
}

export default App;
