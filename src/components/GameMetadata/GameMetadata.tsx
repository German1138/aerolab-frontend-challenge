import { Box, Chip, Typography } from "@mui/material";
import { Calendar, Puzzle, Star } from "lucide-react";
import {
  chipStyles,
  container,
  infoStyles,
  labelStyles,
} from "./GameMetadata.styles";

import { IGameProps } from "@/app/interfaces";
import React from "react";
import handleUnixDate from "@/utils/handleUnixDate";

function GameMetadata({ game }: IGameProps) {
  const FILTERED_DATA = [
    {
      label: "Rating: ",
      info: Math.round(game.total_rating) / 10 || "-",
      icon: <Star color="#6727A6" size="16px" />,
    },
    {
      label: "Release: ",
      info: handleUnixDate(game.first_release_date) || "Unknown",
      icon: <Calendar color="#6727A6" size="16px" />,
    },
    {
      label: "Genre: ",
      info: game.genres[0].name || "Unknown",
      icon: <Puzzle color="#6727A6" size="16px" />,
    },
  ];

  return (
    <Box sx={container}>
      {FILTERED_DATA.map((el) => (
        <Chip
          key={el.label}
          icon={el.icon}
          variant="outlined"
          sx={chipStyles}
          label={
            <>
              <Typography component="span" sx={labelStyles}>
                {el.label}
              </Typography>
              <Typography component="span" sx={infoStyles}>
                {el.info}
              </Typography>
            </>
          }
        />
      ))}
    </Box>
  );
}

export default GameMetadata;
