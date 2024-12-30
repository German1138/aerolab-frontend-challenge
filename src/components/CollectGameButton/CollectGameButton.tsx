import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { useParams } from "next/navigation";
import { btnStyleFalse, btnStyleTrue } from "./CollectGameButton.styles";
import handleLS from "@/utils/handleLS";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { IGameDetail } from "@/app/interfaces";

interface ICollectGameButtonProps {
  game: IGameDetail;
}

function CollectGameButton({ game }: ICollectGameButtonProps) {
  const params = useParams();
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const updateButtonStyle = (gameSlug: { id: string }) => {
    if (typeof window === "undefined") return;

    try {
      const savedArray: string[] = JSON.parse(
        localStorage.getItem("myArray") || "[]"
      );
      setClicked(savedArray.includes(gameSlug.id));
    } catch (error) {
      console.error("Error reading or parsing localStorage:", error);
      setClicked(false);
    }
  };

  const handleClick = () => {
    setOpen(handleLS(game));
    updateButtonStyle(params);
  };

  useEffect(() => {
    updateButtonStyle(params);
  }, [params]);

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={clicked ? btnStyleFalse : btnStyleTrue}
      >
        {clicked ? "Game collected" : "Collect game"}
      </Button>
      <CustomSnackbar
        game={game}
        clicked={clicked}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}

export default CollectGameButton;
