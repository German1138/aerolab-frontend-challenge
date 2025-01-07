"use client";

import { Container } from "@mui/material";
import GameCardContainer from "@/components/GameCardContainer/GameCardContainer";
import Header from "@/components/Header/Header";
import { container } from "./page.styles";

export default function Home() {
  return (
    <>
      <Header />

      <Container sx={container}>
        <GameCardContainer />
      </Container>
    </>
  );
}
