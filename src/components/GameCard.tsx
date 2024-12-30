"use client";

import React from "react";
import { Box, Card, CardMedia, Grid2, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import customImageUrl from "@/utils/customImageUrl";
import Link from "next/link";
import { IGame } from "@/app/interfaces";
import handleLS from "@/utils/handleLS";

function GameCard({ filter = "last-added" }) {
  const [games, setGames] = useState<IGame[]>([]);

  const loadInitialData = async () => {
    try {
      const savedArray = localStorage.getItem("myArray");
      if (savedArray) {
        const slugsArray = JSON.parse(savedArray);
        const { data } = await axios.get(
          `/api/games?slugs=${slugsArray}&filter=${filter}`
        );
        setGames(data);
      }
    } catch (error) {
      console.error(error);
      setGames([]);
    }
  };

  const handleClick = (game) => {
    handleLS(game);
    loadInitialData();
  };

  useEffect(() => {
    loadInitialData();
  }, [filter]);

  if (games === null) return null;

  return (
    <Grid2
      container
      spacing={1}
      sx={{
        alignContent: "center",
      }}
    >
      {games?.map((game: IGame) => {
        return (
          <Grid2 size={4} key={game.id}>
            <Box sx={{ position: "relative", width: "fit-content" }}>
              <Link
                href={`/detail/${game.slug}`}
                style={{ width: "fit-content" }}
                passHref
              >
                <Card
                  sx={{
                    maxWidth: "170px",
                    width: "fit-content",

                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ borderRadius: "8px" }}
                    image={customImageUrl("cover_big", game.cover?.image_id)}
                    alt={`${game.name} cover`}
                  />
                </Card>
              </Link>
              <IconButton
                onClick={() => handleClick(game)}
                variant="contained"
                sx={{
                  backgroundColor: "#FFFFFF",
                  position: "absolute",
                  height: "40px",
                  bottom: 12,
                  right: 15,
                  ":hover": {
                    background: "#FFFFFF",
                    filter: "brightness(130%)",
                    boxShadow: "1px 1px 6px",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid2>
        );
      })}
    </Grid2>
  );
}

export default GameCard;
