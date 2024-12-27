"use client";

import { IGame } from "@/app/interfaces";
import Searchbar from "@/components/Searchbar/Searchbar";
import customImageUrl from "@/utils/customImageUrl";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<IGame | null>(null);

  const loadInitialData = async () => {
    try {
      const { data } = await axios.get(`/api/game?id=${id}`);
      console.log(data);

      setGame(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadInitialData();
  }, []);

  if (game === null) return <Box>Loading</Box>;

  return (
    <Box>
      <Container>
        <Typography>{id}</Typography>
        <Searchbar />
        <Image
          src={customImageUrl("cover_big", game.cover.image_id)}
          width={115}
          height={155}
          alt={`${game.name} cover`}
        />
      </Container>
    </Box>
  );
}

export default GameDetail;
