import { Grid2, Typography, useMediaQuery } from "@mui/material";

import GameCard from "../GameCardContainer/GameCard";
import { IGameProps } from "@/app/interfaces";
import React from "react";
import { subTitle } from "./SimilarGames.styles";

function SimilarGames({ game }: IGameProps) {
  const isNotMobile = useMediaQuery("(min-width:768px)");
  return (
    <>
      <Typography variant="h3" sx={subTitle}>
        Similar games
      </Typography>
      <Grid2 container spacing={2}>
        {game.similar_games.slice(0, isNotMobile ? 4 : 6).map((element) => {
          return (
            <GameCard
              key={element.id}
              game={element}
              disableIconButton={true}
            />
          );
        })}
      </Grid2>
    </>
  );
}

export default SimilarGames;
