"use client";

import { IGameDetail } from "@/app/interfaces";
import Searchbar from "@/components/Searchbar/Searchbar";
import customImageUrl from "@/utils/customImageUrl";
import { Box, Button, Chip, Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExtensionIcon from "@mui/icons-material/Extension";
import handleUnixDate from "@/utils/handleUnixDate";
import handleArrayOfObjects from "@/utils/handleArrayOfObjects";

import CollectGameButton from "@/components/CollectGameButton/CollectGameButton";
import GameCard from "@/components/GameCardContainer/GameCard";

function GameDetail() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<IGameDetail | null>(null);

  const loadInitialGameDetailData = async () => {
    try {
      const { data } = await axios.get(`/api/game?id=${id}`);
      setGame(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInitialGameDetailData();
  }, []);

  if (game === null) return <Box>Loading</Box>;
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "15px",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            color: "#6727A6",
            fontWeight: "600",
            fontSize: "16px",
            textTransform: "capitalize",
          }}
        >
          Back
        </Button>
        <Searchbar />
        <Box></Box>
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Image
          src={customImageUrl("cover_big", game.cover.image_id)}
          width={115}
          height={155}
          alt={`${game.name} cover`}
          style={{ borderRadius: "8px" }}
        />
        <Box>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              color: "#3C1661",
              fontWeight: "600",
              margin: "0 0 10px 0",
            }}
          >
            {game.name}
          </Typography>
          <Typography
            sx={{ fontSize: "14px", fontWeight: "600", color: "#775C90" }}
          >
            {/* {handleArrayOfObjects(game.involved_companies, [
                "company",
                "name",
              ])} */}
            {`${game.involved_companies[0].company.name}, 
              ${game.involved_companies[1]?.company.name}`}
          </Typography>
        </Box>
      </Box>

      <CollectGameButton game={game} />

      <Box>
        <Chip
          icon={<StarBorderIcon style={{ color: "#6727A6" }} />}
          label={`Rating: ${Math.round(game.total_rating)}`}
          variant="outlined"
          sx={{ color: "#6727A6" }}
        />
        <Chip
          icon={<CalendarTodayIcon style={{ color: "#6727A6" }} />}
          label={`Release: ${handleUnixDate(game.first_release_date)}`}
          variant="outlined"
        />
        <Chip
          icon={<ExtensionIcon style={{ color: "#6727A6" }} />}
          label={`Genres: ${game.genres[0].name}`}
          variant="outlined"
        />
      </Box>
      <Typography variant="h2" sx={{ fontSize: "16px", fontWeight: "600" }}>
        Summary
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "14px", md: "16px" }, textAlign: "justify" }}
      >
        {game.summary}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "16px", fontWeight: "600" }}>
        Platforms
      </Typography>
      <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
        {handleArrayOfObjects(game.platforms)}
      </Typography>
      <Typography variant="h2" sx={{ fontSize: "16px", fontWeight: "600" }}>
        Media
      </Typography>
      <Box
        sx={{
          overflow: "scroll",
          display: "flex",
          flexWrap: "nowrap",
          gap: "10px",
        }}
      >
        {game.screenshots.map((element) => {
          return (
            <Image
              key={element.id}
              src={customImageUrl("thumb", element.image_id)}
              width={85}
              height={85}
              alt={`${game.name} screenshot`}
              style={{ borderRadius: "8px" }}
            />
          );
        })}
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          fontWeight: "600",
          color: "#3C1661",
        }}
      >
        Similar games
      </Typography>
      <Grid2 container spacing={2}>
        {game.similar_games.slice(0, 6).map((element) => {
          return (
            <GameCard
              key={element.id}
              game={element}
              disableIconButton={true}
            />
          );
        })}
      </Grid2>
    </Container>
  );
}

export default GameDetail;
