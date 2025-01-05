import { Box, Typography, useMediaQuery } from "@mui/material";
import {
  container,
  gameCompanyStyle,
  gameTitle,
} from "./GameIntroSection.styles";

import CollectGameButton from "../CollectGameButton/CollectGameButton";
import { IGameProps } from "@/app/interfaces";
import Image from "next/image";
import React from "react";
import customImageUrl from "@/utils/customImageUrl";

function GameIntroSection({ game }: IGameProps) {
  const isNotMobile = useMediaQuery("(min-width:768px)");

  return (
    <>
      <Box sx={container}>
        <Image
          src={customImageUrl("cover_big", game.cover.image_id)}
          width={115}
          height={155}
          alt={`${game.name} cover`}
          style={{ borderRadius: "8px" }}
        />
        <Box>
          <Box marginBottom={"20px"}>
            <Typography variant="h1" component="h1" sx={gameTitle}>
              {game.name}
            </Typography>
            <Typography sx={gameCompanyStyle}>
              {game.involved_companies[0].company.name}
            </Typography>
          </Box>
          {isNotMobile && <CollectGameButton game={game} />}
        </Box>
      </Box>

      {!isNotMobile && <CollectGameButton game={game} />}
    </>
  );
}

export default GameIntroSection;
