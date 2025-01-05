import { IGameDetail } from "@/app/interfaces";
import handleUnixDate from "@/utils/handleUnixDate";
import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExtensionIcon from "@mui/icons-material/Extension";

import {
  chipStyles,
  container,
  infoStyles,
  labelStyles,
} from "./GameMetadata.styles";

interface IGameMetadata {
  game: IGameDetail;
}

function GameMetadata({ game }: IGameMetadata) {
  const FILTERED_DATA = [
    {
      label: "Rating: ",
      info: Math.round(game.total_rating) / 10,
      icon: <StarBorderIcon style={{ color: "#6727A6", fontSize: "13px" }} />,
    },
    {
      label: "Release: ",
      info: handleUnixDate(game.first_release_date),
      icon: (
        <CalendarTodayIcon style={{ color: "#6727A6", fontSize: "13px" }} />
      ),
    },
    {
      label: "Genre: ",
      info: game.genres[0].name,
      icon: <ExtensionIcon style={{ color: "#6727A6", fontSize: "13px" }} />,
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
