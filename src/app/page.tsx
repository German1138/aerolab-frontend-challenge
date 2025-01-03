"use client";

import { Container, Typography } from "@mui/material";
import Searchbar from "@/components/Searchbar/Searchbar";
import GameCardContainer from "@/components/GameCardContainer/GameCardContainer";

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
      <Typography
        variant="h1"
        sx={{ fontSize: "20px", fontWeight: "600", color: "#6727A6" }}
      >
        Gaming Haven Z
      </Typography>

      <Searchbar />

      <GameCardContainer />
    </Container>
  );
}
