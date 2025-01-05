import { Box, Typography, useMediaQuery } from "@mui/material";
import { mediaContainer, subTitle } from "./MediaGallery.styles";

import { IGameProps } from "@/app/interfaces";
import Image from "next/image";
import React from "react";
import customImageUrl from "@/utils/customImageUrl";

function MediaGallery({ game }: IGameProps) {
  const isNotMobile = useMediaQuery("(min-width:1024px)");

  return (
    <>
      <Typography variant="h2" sx={subTitle}>
        Media
      </Typography>
      <Box sx={mediaContainer}>
        {game.screenshots.map((element) => {
          return (
            <Image
              onClick={() => console.log("✅✅✅")}
              key={element.id}
              src={customImageUrl("thumb", element.image_id)}
              width={isNotMobile ? 132 : 85}
              height={isNotMobile ? 132 : 85}
              alt={`${game.name} screenshot`}
              style={{ borderRadius: "8px" }}
            />
          );
        })}
      </Box>
    </>
  );
}

export default MediaGallery;
