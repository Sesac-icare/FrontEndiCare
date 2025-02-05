import React from "react";
import styled from "styled-components/native";
import { Header } from "./src/components/Header";
import { Contents } from "./src/components/Contents";
import { Footer } from "./src/components/Footer";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const App = () => {
  return (
    <Container>
      <Header />
      <Contents />
      <Footer />
    </Container>
  );
};

export default App;
