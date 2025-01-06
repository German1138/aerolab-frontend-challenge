"use client";

import { Box, Grid2, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  container,
  gridContainer,
  noGamesContainer,
  subTitle,
} from "./GameCardContainer.styles";

import Filters from "../Filters/Filters";
import GameCard from "./GameCard";
import { IGame } from "@/app/interfaces";
import Image from "next/image";
import axios from "axios";

export const loadInitialData = async (
  setGames: React.Dispatch<React.SetStateAction<IGame[]>>,
  filter: string
) => {
  try {
    const savedArray = localStorage.getItem("myArray");
    if (savedArray) {
      const slugsArray = JSON.parse(savedArray);
      const { data } = await axios.get(
        `/api/games?slugs=${slugsArray}&filter=${filter}`
      );
      setGames(data);
    } else {
      setGames([]);
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
    setGames([]);
  }
};

function GameCardContainer() {
  const [filter, setFilter] = useState<string>("last-added");

  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    loadInitialData(setGames, filter);
  }, [filter]);

  if (!games || games.length === 0) {
    return (
      <Box sx={noGamesContainer}>
        <Typography variant="h3" sx={subTitle}>
          Saved Games
        </Typography>
        <Box textAlign="center">
          <Image
            src="no-games.svg"
            alt="No games collected yet"
            width={300}
            height={168}
            layout="responsive"
            style={{ maxWidth: "358px" }}
          />

          <Box marginTop="15px">
            <Typography component="h5" fontWeight={600}>
              Nothing collected yet
            </Typography>
            <Typography fontSize={14}>
              Here you will see your collected games
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={container}>
      <Typography variant="h3" sx={subTitle}>
        Saved games
      </Typography>

      <Filters filter={filter} setFilter={setFilter} />

      <Box sx={gridContainer}>
        <Grid2 container spacing={1} width={{ xs: "100%", md: "730px" }}>
          {games.map((game: IGame) => (
            <GameCard
              key={game.id}
              game={game}
              filter={filter}
              setGames={setGames}
              disableIconButton={false}
            />
          ))}
        </Grid2>
      </Box>
    </Box>
  );
}

export default GameCardContainer;
