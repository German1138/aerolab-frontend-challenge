import { paragraphStyle, subTitle } from "./GameInfo.styles";

import { IGameProps } from "@/app/interfaces";
import React from "react";
import { Typography } from "@mui/material";
import handleArrayOfObjects from "@/utils/handleArrayOfObjects";

function GameInfo({ game }: IGameProps) {
  return (
    <>
      <Typography component="h2" sx={subTitle}>
        Summary
      </Typography>
      <Typography sx={paragraphStyle}>{game.summary}</Typography>

      <Typography component="h2" sx={subTitle}>
        Platforms
      </Typography>
      <Typography sx={paragraphStyle}>
        {handleArrayOfObjects(game.platforms)}
      </Typography>
    </>
  );
}

export default GameInfo;
