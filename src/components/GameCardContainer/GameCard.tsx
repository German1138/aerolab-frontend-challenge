"use client";

import React, { useState, useCallback } from "react";
import customImageUrl from "@/utils/customImageUrl";
import handleLS from "@/utils/handleLS";
import { Box, Grid2, Card, CardMedia, IconButton } from "@mui/material";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadInitialData } from "./GameCardContainer";
import { cardStyle, iconButtonStyles, subContainer } from "./GameCard.style";
import { IGame } from "@/app/interfaces";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

interface IGameCard {
  game: IGame;
  filter?: string;
  setGames?: React.Dispatch<React.SetStateAction<IGame[]>>;
  disableIconButton?: boolean;
}

function GameCard({
  game,
  filter = "last-added",
  setGames,
  disableIconButton = false,
}: IGameCard) {
  const [clicked, setClicked] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setClicked((prev) => !prev);
    setOpen(handleLS(game));
    if (setGames) {
      loadInitialData(setGames, filter);
    }
  }, [game, filter, setGames]);

  const gameImageUrl = useCallback(
    () => customImageUrl("cover_big", game.cover?.image_id),
    [game.cover?.image_id]
  );

  return (
    <Grid2 size={4} key={game.id}>
      <Box sx={subContainer}>
        <Link href={`/detail/${game.slug}`} passHref>
          <Card sx={cardStyle}>
            <CardMedia
              component="img"
              image={gameImageUrl()}
              alt={`${game.name} cover`}
            />
          </Card>
        </Link>

        {!disableIconButton && (
          <IconButton onClick={handleClick} sx={iconButtonStyles}>
            <DeleteIcon />
          </IconButton>
        )}

        <CustomSnackbar
          game={game}
          clicked={clicked}
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </Grid2>
  );
}

export default GameCard;
