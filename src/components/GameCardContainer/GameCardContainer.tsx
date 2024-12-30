"use client";

import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import axios from "axios";

import { IGame } from "@/app/interfaces";
import GameCard from "./GameCard";

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

function GameCardContainer({ filter = "last-added" }: { filter?: string }) {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    loadInitialData(setGames, filter);
  }, [filter]);

  if (!games || games.length === 0) {
    return null;
  }

  return (
    <Grid2 container spacing={1}>
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
  );
}

export default GameCardContainer;
