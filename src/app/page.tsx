"use client";

import styles from "./page.module.css";
import { Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Searchbar from "@/components/Searchbar/Searchbar";
import Filters from "@/components/Filters/Filters";
import customImageUrl from "@/utils/customImageUrl";
import Link from "next/link";
import { IGame } from "./interfaces";

export default function Home() {
  const [games, setGames] = useState<IGame[]>([]);

  const loadInitialData = async () => {
    try {
      const { data } = await axios.get("/api/games");
      setGames(data);
    } catch (error) {
      console.error(error);
      setGames([]);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Gaming Haven Z
      </Typography>

      <Searchbar />

      <Typography variant="h3" sx={{ fontSize: "20px", fontWeight: "600" }}>
        Saved Games
      </Typography>

      <Filters />

      <Grid2
        container
        spacing={2}
        sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
      >
        {games?.map((game: IGame) => {
          return (
            <Grid2
              size={4}
              key={game.id}
              sx={{ margin: "40px 0", borderRadius: "8px" }}
            >
              <Link href={`/detail/${game.slug}`}>
                <Image
                  src={customImageUrl("cover_big", game.cover?.image_id)}
                  width={115}
                  height={155}
                  alt={`${game.name} cover`}
                />
              </Link>
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
}
