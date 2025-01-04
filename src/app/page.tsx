"use client";

import { Container } from "@mui/material";
import GameCardContainer from "@/components/GameCardContainer/GameCardContainer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "30px 15px",
      }}
    >
      <Header />

      <GameCardContainer />
    </Container>
  );
}
