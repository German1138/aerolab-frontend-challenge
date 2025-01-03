"use client";

import { Container, Typography } from "@mui/material";
import Searchbar from "@/components/Searchbar/Searchbar";
import GameCardContainer from "@/components/GameCardContainer/GameCardContainer";

import { useState } from "react";

import Filters from "@/components/Filters/Filters";

export default function Home() {
  const [filter, setFilter] = useState<string>("last-added");

  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Gaming Haven Z
      </Typography>

      <Searchbar />

      <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Saved Games
      </Typography>

      <Filters filter={filter} setFilter={setFilter} />

      <GameCardContainer filter={filter} />
    </Container>
  );
}
