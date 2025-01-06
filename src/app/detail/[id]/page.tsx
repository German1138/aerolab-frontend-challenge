"use client";

import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";
import GameInfo from "@/components/GameInfo/GameInfo";
import GameIntroSection from "@/components/GameIntroSection/GameIntroSection";
import GameMetadata from "@/components/GameMetadata/GameMetadata";
import Header from "@/components/Header/Header";
import { IGameDetail } from "@/app/interfaces";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import MediaGallery from "@/components/MediaGallery/MediaGallery";
import SimilarGames from "@/components/SimilarGames/SimilarGames";
import axios from "axios";
import { container } from "./page.styles";
import { useParams } from "next/navigation";

function GameDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<IGameDetail | null>(null);

  useEffect(() => {
    const loadInitialGameDetailData = async () => {
      try {
        const { data } = await axios.get(`/api/game?id=${id}`);
        setGame(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadInitialGameDetailData();
  }, [id]);

  if (game === null) return <LoadingSpinner />;
  return (
    <>
      <Header goBackButton={true} />
      <Container sx={container}>
        <GameIntroSection game={game} />

        <GameMetadata game={game} />

        <GameInfo game={game} />

        <MediaGallery game={game} />

        <SimilarGames game={game} />
      </Container>
    </>
  );
}

export default GameDetail;
