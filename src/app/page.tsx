"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Searchbar from "@/components/Searchbar/Searchbar";
import GameCard from "@/components/GameCard";

import { useState } from "react";
import {
  container,
  btnStylesMobile,
} from "../components/Filters/Filters.styles";

export default function Home() {
  const [filter, setFilter] = useState<string>("last-added");

  const buttonData = [
    { name: "last-added", label: "Last Added", id: 1 },
    { name: "newest", label: "Newest", id: 2 },
    {
      name: "oldest",
      label: "Oldest",
      id: 3,
    },
  ];
  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Gaming Haven Z
      </Typography>

      <Searchbar />

      <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Saved Games
      </Typography>

      <Box sx={container}>
        {buttonData.map(({ name, label, id }) => (
          <Button
            key={id}
            variant={filter === name ? "contained" : "text"}
            onClick={() => setFilter(name)}
            sx={{
              ...btnStylesMobile,
              ...(filter === name && {
                backgroundColor: "#3C1661",
                color: "#FFFFFF",
              }),
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <GameCard filter={filter} />
    </Container>
  );
}
